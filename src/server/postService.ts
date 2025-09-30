// server/postService.ts
import {
  Firestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDoc,
  DocumentSnapshot,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import SiteService from "./siteService";
import { PostMeta } from "contexts/siteWorkspace/siteWorkspaceTypes";

// Helpers
const toTs = (d: any) =>
  d
    ? d instanceof Date
      ? Timestamp.fromDate(d)
      : Timestamp.fromDate(new Date(d))
    : null;

const fromTs = (t: any): string | null =>
  t && typeof t?.toDate === "function" ? t.toDate().toISOString() : t ?? null;

const stripUndefined = <T extends Record<string, any>>(obj: T): Partial<T> =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as Partial<T>;

// Dữ liệu đầu vào
export type PostCreate = Omit<PostMeta, "id" | "createdAt" | "updatedAt"> & {
  createdAt?: string | Date;
  updatedAt?: string | Date;
};
export type PostUpdate = Partial<Omit<PostMeta, "id">>;

export class PostService {
  static PATH = "posts";

  static col(fs: Firestore) {
    return collection(fs, this.PATH);
  }

  // ✅ Sửa parse: không lặp key, không ghi đè rỗng
  static parse(docData: any): PostMeta {
    return {
      id: docData.id,
      slug: docData.slug,
      title: docData.title,
      subtitle: docData.subtitle,
      featuredImageUrl: docData.featuredImageUrl,
      category: docData.category,
      status: docData.status, // "draft" | "published" | "archived"
      isFeatured: docData.isFeatured,
      publishAt: fromTs(docData.publishAt)!, // PostMeta định nghĩa string | undefined => bạn có thể bỏ "!"
      unpublishAt: fromTs(docData.unpublishAt)!,
      lastVersionId: docData.lastVersionId,
      createdBy: docData.createdBy,
      updatedBy: docData.updatedBy,
      createdAt: fromTs(docData.createdAt)!, // bắt buộc có theo interface
      updatedAt: fromTs(docData.updatedAt)!,
    };
  }

  // Basic reads
  static async getById(fs: Firestore, id: string): Promise<PostMeta | null> {
    const ref = doc(fs, `${this.PATH}/${id}`);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return this.parse({ ...snap.data(), id: snap.id });
  }

  static async getBySlug(
    fs: Firestore,
    slug: string
  ): Promise<PostMeta | null> {
    const qref = query(this.col(fs), where("slug", "==", slug), limit(1));
    const snap = await getDocs(qref);
    if (snap.empty) return null;
    const d = snap.docs[0];
    return this.parse({ ...d.data(), id: d.id });
  }

  // Lists
  static async list(fs: Firestore, take = 50): Promise<PostMeta[]> {
    const qref = query(this.col(fs), orderBy("createdAt", "desc"), limit(take));
    const snap = await getDocs(qref);
    return snap.docs.map((d) => this.parse({ ...d.data(), id: d.id }));
  }

  static async listByDate(
    fs: Firestore,
    from?: Date,
    to?: Date,
    take = 50
  ): Promise<PostMeta[]> {
    let qref;
    if (from && to) {
      qref = query(
        this.col(fs),
        where("createdAt", ">=", toTs(from)),
        where("createdAt", "<=", toTs(to)),
        orderBy("createdAt", "desc"),
        limit(take)
      );
    } else {
      qref = query(this.col(fs), orderBy("createdAt", "desc"), limit(take));
    }
    const snap = await getDocs(qref);
    return snap.docs.map((d) => this.parse({ ...d.data() || {}, id: d.id }));
  }

  static async listPaged(
    fs: Firestore,
    take = 20,
    cursor?: DocumentSnapshot
  ): Promise<{ items: PostMeta[]; last?: DocumentSnapshot }> {
    const base = query(this.col(fs), orderBy("createdAt", "desc"), limit(take));
    const qref = cursor ? query(base, startAfter(cursor)) : base;
    const snap = await getDocs(qref);
    const items = snap.docs.map((d) => this.parse({ ...d.data(), id: d.id }));
    const last = snap.docs[snap.docs.length - 1];
    return { items, last };
  }

  // Mutations
  static async add(fs: Firestore, data: PostCreate): Promise<string> {
    const payload = stripUndefined({
      ...data,
      createdAt: data.createdAt ? toTs(data.createdAt) : serverTimestamp(),
      updatedAt: data.updatedAt ? toTs(data.updatedAt) : serverTimestamp(),
      publishAt: toTs(data.publishAt),
      unpublishAt: toTs(data.unpublishAt),
    });
    const ref = await addDoc(this.col(fs), payload);
    return ref.id;
  }

  static async update(
    fs: Firestore,
    postId: string,
    data: PostUpdate
  ): Promise<void> {
    const ref = doc(fs, `${this.PATH}/${postId}`);
    const payload = stripUndefined({
      ...data,
      updatedAt: serverTimestamp(),
      ...(data.publishAt !== undefined
        ? { publishAt: toTs(data.publishAt) }
        : {}),
      ...(data.unpublishAt !== undefined
        ? { unpublishAt: toTs(data.unpublishAt) }
        : {}),
      ...(data.createdAt !== undefined
        ? { createdAt: toTs(data.createdAt) }
        : {}),
    });
    await updateDoc(ref, payload as any);
  }

  static async delete(fs: Firestore, postId: string): Promise<void> {
    const ref = doc(fs, `${this.PATH}/${postId}`);
    await deleteDoc(ref);
  }

  // Overloads theo siteId (đỡ lặp ở hook)
  static async addForSite(siteId: string, data: PostCreate): Promise<string> {
    const fs = await SiteService.ensureFirestore(siteId);
    return this.add(fs, data);
  }
  static async updateForSite(siteId: string, postId: string, data: PostUpdate) {
    const fs = await SiteService.ensureFirestore(siteId);
    return this.update(fs, postId, data);
  }
  static async deleteForSite(siteId: string, postId: string) {
    const fs = await SiteService.ensureFirestore(siteId);
    return this.delete(fs, postId);
  }
  static async listForSite(siteId: string, take = 50) {
    const fs = await SiteService.ensureFirestore(siteId);
    return this.list(fs, take);
  }
  static async listByDateForSite(
    siteId: string,
    from?: Date,
    to?: Date,
    take = 50
  ) {
    const fs = await SiteService.ensureFirestore(siteId);
    return this.listByDate(fs, from, to, take);
  }
  static async getBySlugForSite(siteId: string, slug: string) {
    const fs = await SiteService.ensureFirestore(siteId);
    return this.getBySlug(fs, slug);
  }
  static async getByIdForSite(siteId: string, id: string) {
    const fs = await SiteService.ensureFirestore(siteId);
    return this.getById(fs, id);
  }
}
