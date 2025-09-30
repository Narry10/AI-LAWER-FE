import { useCallback } from "react";
import { getFirestore, Timestamp, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { PostService } from "../server/postService";
import SiteService from "../server/siteService";
import { PostMeta } from "contexts/siteWorkspace/siteWorkspaceTypes";

export function usePostCRUD(siteId?: string) {
  // Fetch posts by date range (default: last 7 days)
  const fetchPosts = useCallback(async (from?: Date, to?: Date): Promise<PostMeta[]> => {
    if (!siteId) return [];
    const config = await SiteService.getSiteConfig(siteId);
    if (!config) throw new Error("Site config not found");
    const app = SiteService.getOrInitFirebaseApp(config, siteId);
    const firestore = getFirestore(app);
    let q;
    if (from && to) {
      q = query(
        PostService.getCollection(firestore),
        where("createdAt", ">=", Timestamp.fromDate(from)),
        where("createdAt", "<=", Timestamp.fromDate(to)),
        orderBy("createdAt", "desc")
      );
    } else {
      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      q = query(
        PostService.getCollection(firestore),
        where("createdAt", ">=", Timestamp.fromDate(sevenDaysAgo)),
        orderBy("createdAt", "desc"),
        limit(50)
      );
    }
    const snap = await getDocs(q);
  return snap.docs.map(doc => PostService.parsePost(Object.assign({}, doc.data(), { id: doc.id })));
  }, [siteId]);

  const addPost = useCallback(async (data: Omit<PostMeta, "id">) => {
    if (!siteId) return;
    const config = await SiteService.getSiteConfig(siteId);
    if (!config) throw new Error("Site config not found");
    const app = SiteService.getOrInitFirebaseApp(config, siteId);
    const firestore = getFirestore(app);
    return await PostService.addPost(firestore, data);
  }, [siteId]);

  const updatePost = useCallback(async (postId: string, data: Partial<PostMeta>) => {
    if (!siteId) return;
    const config = await SiteService.getSiteConfig(siteId);
    if (!config) throw new Error("Site config not found");
    const app = SiteService.getOrInitFirebaseApp(config, siteId);
    const firestore = getFirestore(app);
    await PostService.updatePost(firestore, postId, data);
  }, [siteId]);

  const deletePost = useCallback(async (postId: string) => {
    if (!siteId) return;
    const config = await SiteService.getSiteConfig(siteId);
    if (!config) throw new Error("Site config not found");
    const app = SiteService.getOrInitFirebaseApp(config, siteId);
    const firestore = getFirestore(app);
    await PostService.deletePost(firestore, postId);
  }, [siteId]);

  return { fetchPosts, addPost, updatePost, deletePost };
}
