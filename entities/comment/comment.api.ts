import $api from '~shared/api';
import { CreateComment } from './comment.types';

export function getComments(id: number) {
  return $api.get(`articles/${id}/comment/`);
}

export function createComment(params: { comment: CreateComment }) {
  return $api.post(
    `articles/${params.comment.article}/comment/`,
    params.comment
  );
}

export function updateComment(
  articleId: number,
  commentId: number,
  comment: any = {}
) {
  return $api.patch(`aricles/${articleId}/comment/${commentId}/`, comment);
}

export function deleteComment(params: {
  articleId: number;
  commentId: number;
}) {
  return $api.delete(
    `articles/${params.articleId}/comment/${params.commentId}/`
  );
}
