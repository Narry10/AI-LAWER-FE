import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFirestore } from "firebase/firestore";
import SiteService from "../server/siteService";
import { PostDetailService } from "../server/postDetailService";
import { PostMeta } from "../contexts/siteWorkspace/siteWorkspaceTypes";

export function usePostDetail(siteId?: string, slug?: string) {
  const queryClient = useQueryClient();

  const fetchDetail = useCallback(async () => {
    if (!siteId || !slug) return null;
    const config = await SiteService.getSiteConfig(siteId);
    if (!config) throw new Error("Site config not found");
    const app = SiteService.getOrInitFirebaseApp(config, siteId);
    const firestore = getFirestore(app);
    return await PostDetailService.fetchDetail(firestore, slug);
  }, [siteId, slug]);

  const {
    data: post,
    isLoading: loading,
    error,
    refetch: refetchDetail,
  } = useQuery({
    queryKey: ["postDetail", siteId, slug],
    queryFn: fetchDetail,
    enabled: !!siteId && !!slug,
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<PostMeta>) => {
      if (!siteId || !post) return;
      const config = await SiteService.getSiteConfig(siteId);
      if (!config) throw new Error("Site config not found");
      const app = SiteService.getOrInitFirebaseApp(config, siteId);
      const firestore = getFirestore(app);
      await PostDetailService.updateDetail(firestore, post.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postDetail", siteId, slug] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!siteId || !post) return;
      const config = await SiteService.getSiteConfig(siteId);
      if (!config) throw new Error("Site config not found");
      const app = SiteService.getOrInitFirebaseApp(config, siteId);
      const firestore = getFirestore(app);
      await PostDetailService.deleteDetail(firestore, post.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postDetail", siteId, slug] });
    },
  });

  return {
    post,
    loading,
    error,
    refetchDetail,
    updateDetail: updateMutation.mutateAsync,
    deleteDetail: deleteMutation.mutateAsync,
  };
}
