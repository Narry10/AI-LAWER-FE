// hooks/usePostDetail.ts
import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PostDetailService, type PostDetail } from "../server/postDetailService";

export function usePostDetail(siteId?: string, slug?: string) {
  const qc = useQueryClient();

  const fetchDetail = useCallback(async () => {
    if (!siteId || !slug) return null;
    return PostDetailService.fetchDetailForSite(siteId, slug);
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
    mutationFn: async (data: Partial<PostDetail>) => {
      if (!siteId || !slug) throw new Error("Missing siteId/slug");
      await PostDetailService.updateDetailForSite(siteId, slug, data);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["postDetail", siteId, slug] });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: PostDetail) => {
      if (!siteId || !slug) throw new Error("Missing siteId/slug");
      await PostDetailService.createDetailForSite(siteId, slug, data);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["postDetail", siteId, slug] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!siteId || !slug) throw new Error("Missing siteId/slug");
      await PostDetailService.deleteDetailForSite(siteId, slug);
    },
    onSuccess: () => {
      // Cập nhật lại cả detail và list để màn danh sách mới nhất
      qc.invalidateQueries({ queryKey: ["postDetail", siteId, slug] });
      qc.invalidateQueries({ queryKey: ["posts", siteId] });
    },
  });

  return {
    post,
    loading,
    error,
    refetchDetail,
    updateDetail: updateMutation.mutateAsync,
    createDetail: createMutation.mutateAsync,
    deleteDetail: deleteMutation.mutateAsync,
  };
}
