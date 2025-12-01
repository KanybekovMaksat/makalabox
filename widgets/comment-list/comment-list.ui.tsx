import { Avatar, CircularProgress, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import { commentQueries, commentTypes } from '~entities/comment';
import relativeTime from 'dayjs/plugin/relativeTime';
import { userQueries } from '~entities/user';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCookie } from 'typescript-cookie';
import { Link } from 'react-router-dom';

dayjs.extend(relativeTime);

type CommentListProps = {
  id: number;
};

export function CommentList({ id }: CommentListProps) {
  const {
    data: commentData,
    isLoading,
    isSuccess,
    isError,
  } = commentQueries.useGetCommentsQuery(id);

  if (isLoading) {
    return (
      <div>
        <CircularProgress className="w-[50px] mx-auto flex justify-center" />
        <p className="text-center mt-2">Загрузка комментариев...</p>
      </div>
    );
  }

  if (isError) {
    return <p>Ошибка при загрузке комментариев!</p>;
  }

  if (commentData.data.length == 0) {
    return (
      <div className="font-medium text-pc-400">
        Ваш комментарий будет первым😀
      </div>
    );
  }

  return (
    isSuccess && (
      <div className="flex flex-col gap-6">
        {commentData?.data.map((comment) => (
          <CommentItem articleId={id} comment={comment} key={comment.id} />
        ))}
      </div>
    )
  );
}

function CommentItem({
  comment,
  articleId,
}: {
  comment: commentTypes.Comment;
  articleId: number;
}) {
  const { data: userData } = userQueries.useLoginUserQuery();

  const { mutate: deleteComment, isPending } = commentQueries.useDeleteComment(
    comment.id
  );

  const handleDeleteComment = async () => {
    await deleteComment({ articleId: articleId, commentId: comment.id });
  };
  const isAuth = getCookie('access');
  return (
    <div>
      <div className="flex items-center gap-2">
        <Avatar
          alt={comment.author.username}
          src={comment.author.photo}
          className="w-[24px] h-[24px] rounded-full"
        />
        <Link
         to={`/${comment.author.username}`}
          className="font-medium text-sm md:text-base"
        >
          {comment.author.username}
        </Link>
        <div className="w-[1px] h-[15px] bg-pc-400"></div>
        <p className="text-[14px] text-pc-400">
          {dayjs().to(dayjs(comment.created))}
        </p>
        <div>
          {isAuth ? (
            userData.data.id === comment.author.id ? (
              <IconButton
                aria-label="delete"
                size="small"
                onClick={handleDeleteComment}
              >
                {!isPending ? (
                  <DeleteIcon
                    fontSize="inherit"
                    className="hover:text-second-100"
                  />
                ) : (
                  <CircularProgress size={19} />
                )}
              </IconButton>
            ) : null
          ) : null}
        </div>
      </div>
      <p className="mt-2">{comment.content}</p>
      <div className="w-full h-[1px]"></div>
    </div>
  );
}
