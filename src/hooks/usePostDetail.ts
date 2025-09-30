import { useCallback, useState } from "react";
import { getFirestore } from "firebase/firestore";
import SiteService from "../server/siteService";
import { PostDetailService } from "../server/postDetailService";
import { PostMeta } from "../contexts/siteWorkspace/siteWorkspaceTypes";

export function usePostDetail(siteId?: string, slug?: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<PostMeta | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!siteId || !slug) return null;
    setLoading(true);
    setError(null);
    try {
      const config = await SiteService.getSiteConfig(siteId);
      if (!config) throw new Error("Site config not found");
      const app = SiteService.getOrInitFirebaseApp(config, siteId);
      const firestore = getFirestore(app);
      const detail = await PostDetailService.fetchDetail(firestore, slug);
      setPost(detail || null);
      return detail || null;
    } catch (err: any) {
      setError(err.message || "Failed to fetch post detail");
      setPost(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [siteId, slug]);

  const updateDetail = useCallback(async (data: Partial<PostMeta>) => {
    if (!siteId || !post) return;
    setLoading(true);
    setError(null);
    try {
      const config = await SiteService.getSiteConfig(siteId);
      if (!config) throw new Error("Site config not found");
      const app = SiteService.getOrInitFirebaseApp(config, siteId);
      const firestore = getFirestore(app);
      await PostDetailService.updateDetail(firestore, post.id, data);
      setPost({ ...post, ...data });
    } catch (err: any) {
      setError(err.message || "Failed to update post detail");
    } finally {
      setLoading(false);
    }
  }, [siteId, post]);

  const deleteDetail = useCallback(async () => {
    if (!siteId || !post) return;
    setLoading(true);
    setError(null);
    try {
      const config = await SiteService.getSiteConfig(siteId);
      if (!config) throw new Error("Site config not found");
      const app = SiteService.getOrInitFirebaseApp(config, siteId);
      const firestore = getFirestore(app);
      await PostDetailService.deleteDetail(firestore, post.id);
      setPost(null);
    } catch (err: any) {
      setError(err.message || "Failed to delete post detail");
    } finally {
      setLoading(false);
    }
  }, [siteId, post]);

  return { post, loading, error, fetchDetail, updateDetail, deleteDetail };
}
