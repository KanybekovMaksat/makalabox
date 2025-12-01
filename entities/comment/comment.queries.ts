import {
  useMutation,
  useQuery,
  useQueryClient,
  queryOptions as tsqQueryOptions,
} from '@tanstack/react-query';
import { createComment, deleteComment, getComments } from './comment.api';
import { toast } from 'react-toastify';
import { queryClient } from '~shared/lib/react-query/react-query.lib';

const keys = {
  root: () => ['comment'],
  getComments: (id: number) => [...keys.root(), 'byId', id],
  createComment: (id: number) => [...keys.root(), 'create', id] as const,
  updateComment: (id: number) => [...keys.root(), 'update', id] as const,
  deleteComment: (id: number) => [...keys.root(), 'delete', id] as const,
};

export const commentService = {
  queryKey: (id: number) => keys.getComments(id),

  getCache: (id: number) =>
    queryClient.getQueryData<Comment[]>(commentService.queryKey(id)),

  setCache: (id: number, comments: Comment[]) =>
    queryClient.setQueryData(commentService.queryKey(id), comments),

  queryOptions: (id: number) => {
    const commentKey = commentService.queryKey(id);
    return tsqQueryOptions({
      queryKey: commentKey,
      queryFn: async () => getComments(id),
      initialDataUpdatedAt: () =>
        queryClient.getQueryState(commentKey)?.dataUpdatedAt,
    });
  },

  prefetchQuery: async (id: number) =>
    queryClient.prefetchQuery(commentService.queryOptions(id)),

  ensureQueryData: async (id: number) =>
    queryClient.ensureQueryData(commentService.queryOptions(id)),
};

export function useGetCommentsQuery(id: number) {
  return useQuery({
    queryKey: keys.getComments(id),
    queryFn: () => getComments(id),
  });
}

export function useCreateCommentMutation(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: keys.createComment(id),
    mutationFn: createComment,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: keys.createComment(id),
      });
      await queryClient.cancelQueries({ queryKey: keys.root() });
    },
    onSuccess: async () => {
      toast.success('Комментарий успешно создан');
    },
    onError: async () => {
      toast.error('При отправке произошла ошибка!');
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: keys.getComments(id),
      });
    },
  });
}

export function useDeleteComment(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: keys.deleteComment(id),
    mutationFn: deleteComment,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: keys.deleteComment(id),
      });
      await queryClient.cancelQueries({ queryKey: keys.root() });
    },
    onSuccess: async () => {
      toast.success('Комментарий успешно удален');
    },
    onError: async () => {
      toast.error('При удалении произошла ошибка!');
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: keys.root(),
      });
    },
  });
}
