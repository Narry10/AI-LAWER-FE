// server/postDetailService.ts
import {
  Firestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import SiteService from "./siteService";
import { PostMeta } from "../contexts/siteWorkspace/siteWorkspaceTypes";

// Detail có thêm content
export type PostDetail = {
    id: string;
    content: string;
    slug: string;
    updatedAt?: string;
};

export class PostDetailService {
  static PATH = "postDetails";

  static getDocRef(fs: Firestore, slug: string) {
    // Bạn đang dùng slug làm docId
    return doc(fs, `${this.PATH}/${slug}`);
  }

  // --- Low-level (nhận Firestore) ---
  static async fetchDetail(fs: Firestore, slug: string): Promise<PostDetail | null> {
    const ref = this.getDocRef(fs, slug);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...(snap.data() as Omit<PostDetail, "id">) };
  }

  static async createDetail(fs: Firestore, slug: string, data: PostDetail) {
    const ref = this.getDocRef(fs, slug);
    await setDoc(ref, data as any);
  }

  static async updateDetail(fs: Firestore, slug: string, data: Partial<PostDetail>) {
    const ref = this.getDocRef(fs, slug);
    await updateDoc(ref, data as any);
  }

  static async deleteDetail(fs: Firestore, slug: string) {
    const ref = this.getDocRef(fs, slug);
    await deleteDoc(ref);
  }

  // --- High-level (nhận siteId) ---
  static async fetchDetailForSite(siteId: string, slug: string) {
    const fs = await SiteService.ensureFirestore(siteId);
    return this.fetchDetail(fs, slug);
  }
  static async createDetailForSite(siteId: string, slug: string, data: PostDetail) {
    const fs = await SiteService.ensureFirestore(siteId);
    return this.createDetail(fs, slug, data);
  }
  static async updateDetailForSite(siteId: string, slug: string, data: Partial<PostDetail>) {
    const fs = await SiteService.ensureFirestore(siteId);
    return this.updateDetail(fs, slug, data);
  }
  static async deleteDetailForSite(siteId: string, slug: string) {
    const fs = await SiteService.ensureFirestore(siteId);
    return this.deleteDetail(fs, slug);
  }
}
