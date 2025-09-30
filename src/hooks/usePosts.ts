import { useEffect, useState, useCallback } from "react";
import { getFirestore } from "firebase/firestore";
import { PostService } from "../server/postService";
import SiteService from "../server/siteService";
import { PostMeta } from "contexts/siteWorkspace/siteWorkspaceTypes";

export function usePosts(siteId?: string) {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    if (!siteId) return;
    setLoading(true);
    setError(null);
    try {
      const config = await SiteService.getSiteConfig(siteId);
      if (!config) throw new Error("Site config not found");
      const app = SiteService.getOrInitFirebaseApp(config, siteId);
      const firestore = getFirestore(app);
      const data = await PostService.fetchPosts(firestore);
      setPosts(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, [siteId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, fetchPosts };
}
