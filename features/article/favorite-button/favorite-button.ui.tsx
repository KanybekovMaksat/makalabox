import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { getCookie } from 'typescript-cookie';
import { articleQueries } from '~entities/article';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';

type FavoriteButtonProps = { id: number };

export function FavoriteButton(props: FavoriteButtonProps) {
  const isAuth = getCookie('access');
  const navigate = useNavigate();

  const redirectToRegisterPage = () => {
    navigate(pathKeys.register());
  };

  const { mutate: saveFavorite, isPending } = articleQueries.useFavoriteArticle(props.id);
  const { data: favData } = articleQueries.useGetFavoriteArticles();

  const favoriteArticles = favData?.data?.favoriteArticles;

  const handleSaveFavorite = useCallback(async () => {
    await saveFavorite();
  }, [saveFavorite]);

  if (!favData || !favData.data || !isAuth) {
    return (
      <Tooltip title={'Нужна авторизация'}>
        <span>
          <IconButton onClick={redirectToRegisterPage} aria-label="В Избранное">
            <BookmarkAddIcon />
          </IconButton>
        </span>
      </Tooltip>
    );
  }

  const isFavoritedPosts = favoriteArticles?.some(
    (post) => post.id === props.id
  );
  if(isPending){
    return <div className='p-1'>
      <CircularProgress size={25}/>
    </div>
  }

  return (
    <Tooltip
      title={
        isFavoritedPosts ? 'Удалить из избранных' : 'Сохранить в избранные'
      }
    >
      
      <IconButton onClick={handleSaveFavorite} aria-label="В Избранное">
        {isFavoritedPosts ? (
          <BookmarkAddedIcon className="text-second-100" />
        ) : (
          <BookmarkAddIcon className="hover:text-second-100" />
        )}
      </IconButton>
    </Tooltip>
  );
}
