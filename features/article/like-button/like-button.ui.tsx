import { useState, useEffect } from 'react';
import {  IconButton, Tooltip } from '@mui/material';
import { articleQueries, articleTypes } from '~entities/article';
import { getCookie } from 'typescript-cookie';
import { userQueries } from '~entities/user';
import { useNavigate } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import ConfettiExplosion, { ConfettiProps } from 'react-confetti-explosion';

type LikeButtonProps = { like: articleTypes.ArticleLike };

const smallProps: ConfettiProps = {
  force: 0.3,
  duration: 1800,
  particleCount: 17,
  particleSize: 4,
  width: 400,
  colors: ['#0a85d1', '#EE4E4E', '#FFF455'],
};

export function LikeButton(props: LikeButtonProps) {
  const isAuth = getCookie('access');
  const navigate = useNavigate();
  const [isSmallExploding, setIsSmallExploding] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(props.like.likeCount);

  const { data: userData } = userQueries.useLoginUserQuery();
  const userId = userData?.data?.id;

  useEffect(() => {
    if (userId && props.like.likes.includes(userId)) {
      setIsLiked(true);
    }
  }, [userId, props.like.likes]);

  const redirectToRegisterPage = () => {
    navigate(pathKeys.login());
  };

  const { mutate: like, isPending } = articleQueries.useLikeArticle(
    props.like.id
  );

  const handleLike = async (e) => {
    if (isAuth) {
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);

      setLocalLikeCount((prevCount) =>
        newIsLiked ? prevCount + 1 : prevCount - 1
      );
      setIsSmallExploding(newIsLiked ? true : false);
      try {
        await like();
      } catch (error) {
        setIsLiked(!newIsLiked);
        setLocalLikeCount((prevCount) =>
          newIsLiked ? prevCount - 1 : prevCount + 1
        );
      }
    } else {
      redirectToRegisterPage();
    }
  };

  return (
    <div className="flex items-center">
      <Tooltip
        title={
          isAuth
            ? isLiked
              ? 'Больше не нравится'
              : 'Нравится'
            : 'Нужна авторизация'
        }
      >
        <span>
          <IconButton aria-label="нравится" onClick={handleLike}>
            {isLiked ? (
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="#0a85d1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 6.63013C21 12.1001 12.23 18.3101 10.97 18.3101C9.71 18.3101 1 12.1001 1 6.63013C1 5.47013 1.36 4.33013 2.03 3.38013C2.7 2.43013 3.65 1.71013 4.75 1.32013C5.85 0.930128 7.04 0.900127 8.16 1.21013C9.28 1.52013 10.27 2.19013 11 3.10013C11.52 2.44013 12.19 1.91013 12.95 1.55013C13.71 1.19013 14.54 1.00013 15.38 1.00013C16.12 1.00013 16.85 1.14013 17.53 1.43013C18.21 1.71013 18.83 2.13013 19.36 2.65013C19.88 3.17013 20.3 3.79013 20.58 4.48013C20.86 5.16013 21.01 5.90013 21.01 6.63013H21Z"
                  stroke="#0a85d1"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.68 4.68994C15.01 4.68994 15.33 4.73994 15.63 4.85994C15.93 4.97994 16.21 5.15994 16.44 5.38994C16.67 5.61994 16.85 5.89994 16.97 6.19994C17.09 6.49994 17.15 6.82994 17.14 7.14994"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                />
              </svg>
            ) : (
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 6.63013C21 12.1001 12.23 18.3101 10.97 18.3101C9.71 18.3101 1 12.1001 1 6.63013C1 5.47013 1.36 4.33013 2.03 3.38013C2.7 2.43013 3.65 1.71013 4.75 1.32013C5.85 0.930128 7.04 0.900127 8.16 1.21013C9.28 1.52013 10.27 2.19013 11 3.10013C11.52 2.44013 12.19 1.91013 12.95 1.55013C13.71 1.19013 14.54 1.00013 15.38 1.00013C16.12 1.00013 16.85 1.14013 17.53 1.43013C18.21 1.71013 18.83 2.13013 19.36 2.65013C19.88 3.17013 20.3 3.79013 20.58 4.48013C20.86 5.16013 21.01 5.90013 21.01 6.63013H21Z"
                  stroke="#0a85d1"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.68 4.68994C15.01 4.68994 15.33 4.73994 15.63 4.85994C15.93 4.97994 16.21 5.15994 16.44 5.38994C16.67 5.61994 16.85 5.89994 16.97 6.19994C17.09 6.49994 17.15 6.82994 17.14 7.14994"
                  stroke="#0a85d1"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                />
              </svg>
            )}
            {isSmallExploding && <ConfettiExplosion {...smallProps} />}
          </IconButton>
        </span>
      </Tooltip>
      <p className="text-sm text-pc-400">{localLikeCount}</p>
    </div>
  );
}
