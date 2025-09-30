import { getFirestore, doc, getDoc, updateDoc, deleteDoc, Firestore } from "firebase/firestore";
import { PostMeta } from "../contexts/siteWorkspace/siteWorkspaceTypes";

export class PostDetailService {
  static getDocRef(firestore: Firestore, slug: string) {
    return doc(firestore, "postDetails", slug);
  }

  static async fetchDetail(firestore: Firestore, slug: string): Promise<PostMeta | null> {
    const docRef = this.getDocRef(firestore, slug);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as PostMeta;
  }

  static async updateDetail(firestore: Firestore, slug: string, data: Partial<PostMeta>) {
    const docRef = this.getDocRef(firestore, slug);
    await updateDoc(docRef, data);
  }

  static async deleteDetail(firestore: Firestore, slug: string) {
    const docRef = this.getDocRef(firestore, slug);
    await deleteDoc(docRef);
  }
}
