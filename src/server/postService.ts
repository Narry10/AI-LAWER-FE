
import { PostMeta } from "contexts/siteWorkspace/siteWorkspaceTypes";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  Timestamp
} from "firebase/firestore";

export class PostService {
  static getCollection(firestore: Firestore) {
    return collection(firestore, "posts");
  }

  static parsePost(docSnap: DocumentData): PostMeta {
    // Convert Firestore Timestamp to ISO string
    const parseTime = (t: any) => t && t.toDate ? t.toDate().toISOString() : t ?? null;
    return {
      id: docSnap.id,
      slug: docSnap.slug,
      title: docSnap.title,
      subtitle: docSnap.subtitle,
      featuredImageUrl: docSnap.featuredImageUrl,
      category: docSnap.category,
      status: docSnap.status,
      isFeatured: docSnap.isFeatured,
      publishAt: parseTime(docSnap.publishAt),
      unpublishAt: parseTime(docSnap.unpublishAt),
      lastVersionId: docSnap.lastVersionId,
      createdBy: docSnap.createdBy,
      updatedBy: docSnap.updatedBy,
      createdAt: parseTime(docSnap.createdAt),
      updatedAt: parseTime(docSnap.updatedAt),
    };
  }

  static async fetchPosts(firestore: Firestore): Promise<PostMeta[]> {
    const colRef = this.getCollection(firestore);
    const snap = await getDocs(colRef);
    return snap.docs.map(doc => this.parsePost({ ...doc.data(), id: doc.id }));
  }

  static async addPost(firestore: Firestore, data: Omit<PostMeta, "id">): Promise<string> {
    const colRef = this.getCollection(firestore);
    // Convert date strings to Timestamp
    const toTimestamp = (d: any) => d ? Timestamp.fromDate(new Date(d)) : null;
    const payload = {
      ...data,
      createdAt: toTimestamp(data.createdAt),
      updatedAt: toTimestamp(data.updatedAt),
      publishAt: toTimestamp(data.publishAt),
      unpublishAt: toTimestamp(data.unpublishAt),
    };
    const docRef = await addDoc(colRef, payload);
    return docRef.id;
  }

  static async updatePost(firestore: Firestore, postId: string, data: Partial<PostMeta>) {
    const docRef = doc(firestore, `posts/${postId}`);
    const toTimestamp = (d: any) => d ? Timestamp.fromDate(new Date(d)) : null;
    const payload = {
      ...data,
      updatedAt: toTimestamp(data.updatedAt),
      publishAt: toTimestamp(data.publishAt),
      unpublishAt: toTimestamp(data.unpublishAt),
    };
    await updateDoc(docRef, payload);
  }

  static async deletePost(firestore: Firestore, postId: string) {
    const docRef = doc(firestore, `posts/${postId}`);
    await deleteDoc(docRef);
  }
}
