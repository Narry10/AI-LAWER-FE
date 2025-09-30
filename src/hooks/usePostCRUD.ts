// hooks/usePostCRUD.ts
import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PostService, type PostCreate, type PostUpdate } from "../server/postService";
import { PostMeta } from "contexts/siteWorkspace/siteWorkspaceTypes";

export function usePostCRUD(siteId?: string) {
  const queryClient = useQueryClient();

  // Lấy danh sách (mặc định: 7 ngày gần nhất xử lý trong service nếu bạn muốn — ở đây mình luôn gọi listByDateForSite theo from/to)
  const fetchPosts = useCallback(
    async (from?: Date, to?: Date): Promise<PostMeta[]> => {
      if (!siteId) return [];
      return PostService.listByDateForSite(siteId, from, to, 50);
    },
    [siteId]
  );

  const {
    data: posts = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts", siteId],
    queryFn: () => fetchPosts(),
    enabled: !!siteId,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["posts", siteId] });

  // Add
  const addMutation = useMutation({
    mutationFn: async (data: PostCreate) => {
      if (!siteId) throw new Error("Missing siteId");
      return PostService.addForSite(siteId, data);
    },
    onSuccess: invalidate,
  });

  // Update
  const updateMutation = useMutation({
    mutationFn: async ({ postId, data }: { postId: string; data: PostUpdate }) => {
      if (!siteId) throw new Error("Missing siteId");
      await PostService.updateForSite(siteId, postId, data);
    },
    onSuccess: invalidate,
  });

  // Delete
  const deleteMutation = useMutation({
    mutationFn: async (postId: string) => {
      if (!siteId) throw new Error("Missing siteId");
      await PostService.deleteForSite(siteId, postId);
    },
    onSuccess: invalidate,
  });

  return {
    posts,
    loading,
    error,
    refetch,
    fetchPosts, // cho phép truyền from/to bên ngoài
    addPost: addMutation.mutateAsync,
    updatePost: (postId: string, data: PostUpdate) =>
      updateMutation.mutateAsync({ postId, data }),
    deletePost: deleteMutation.mutateAsync,
  };
}
