import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { articleTypes } from '~entities/article';
import { FilterSide } from '~widgets/filter-side';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { LikeButton } from '~features/article/like-button';
import { FavoriteButton } from '~features/article/favorite-button';
import { ShareButton } from '~features/article/share-button';
import { pathKeys } from '~shared/lib/react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');

export function FeedPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const getArticle = async () => {
    setIsLoading(true);
    try {
      const query = searchParams.get('search') || '';
      const categoryIds = searchParams.getAll('categories') || [];
      const categoryParams = categoryIds
        .map((id) => `categories=${id}`)
        .join('&');
      const response = await axios.get(
        `https://api.makalabox.com/api/articles/?search=${query}&${categoryParams}`
      );
      setArticles(response.data.results);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getArticle();
  }, [searchParams]);

  return (
    <div className="flex flex-col-reverse w-full  md:w-[80%] my-5  mx-2 md:mx-auto gap-10 mb-20">
      <div className="md:min-w-[865px] min-w-full max-w-full flex flex-col items-center justify-center gap-3 ">
        {isLoading ? (
          <Card className="min-w-full max-w-full md:min-w-[655px] md:max-w-[655px] shadow-none border border-sc-100 flex justify-center items-center p-3">
            <CircularProgress />
            <p className="text-pc-400">Поиск...</p>
          </Card>
        ) : articles.length > 0 ? (
          articles.map((item) => <ArticleCard key={item.id} article={item} />)
        ) : (
          <Card className="min-w-full max-w-full md:min-w-[650px] md:max-w-[650px] shadow-none border border-sc-100 flex flex-col items-center ">
            <p className="font-bold">Ничего не найдено по вашему запросу</p>
          </Card>
        )}
      </div>
      <div className="min-w-[32 0px]">
        <FilterSide />
      </div>
    </div>
  );
}

type ArticleCardProps = { article: articleTypes.Article };

function ArticleCard(props: ArticleCardProps) {
  const navigate = useNavigate();
  const handleNavigate = (id: number) => {
    navigate(pathKeys.article.byId({ id }));
  };
  return (
    <Card className="min-w-full max-w-full md:min-w-[650px] md:max-w-[650px] shadow-none border border-sc-100">
      <div className="flex flex-col">
        <CardContent className="md:p-5 p-3">
          <div className="flex justify-between items-center pb-3">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex items-center gap-4 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Avatar
                    sizes="large"
                    className="duration-500 card-avatar border-2 border-[white] h-10 w-10"
                    alt={props.article.author.fullName}
                    src={props.article.author.photo}
                  />
                  <h5 className="flex text-base md:text-base font-bold">
                    {props.article.author.fullName}
                  </h5>
                </div>
                <div className="md:flex items-center gap-3 hidden">
                  <p className="text-md text-pc-400 text-sm">
                    {dayjs(props.article.created)
                      .format('MMMM D, YYYY')
                      .toUpperCase()}
                  </p>
                  <p className="text-md text-pc-400 flex items-center gap-1 text-sm">
                    <VisibilityIcon className="w-5" />
                    {props.article.viewCount}
                  </p>
                  <Tooltip title="Время чтения">
                    <p className="text-md text-pc-400 flex items-center gap-1 text-sm">
                      <AccessTimeFilledIcon className="w-4" />
                      {props.article.readTime} мин
                    </p>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-1 mb-2 md:hidden">
            <p className="text-md text-pc-400 text-sm">
              {dayjs(props.article.created)
                .format('MMMM D, YYYY')
                .toUpperCase()}
            </p>
            <p className="text-md text-pc-400 flex items-center gap-1 text-sm">
              <VisibilityIcon className="w-5" />
              {props.article.viewCount}
            </p>
            <Tooltip title="Время чтения">
              <p className="text-md text-pc-400 flex items-center gap-1 text-sm">
                <AccessTimeFilledIcon className="w-4" />
                {props.article.readTime} мин
              </p>
            </Tooltip>
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() => handleNavigate(props.article.id)}
          >
            <Link
              to={`article/${String(props.article.id)}`}
              className="font-bold text-lg md:text-xl title duration-300 block"
            >
              {props.article.title}
            </Link>
            <Link
              to={`article/${String(props.article.id)}`}
              className="text-[16px] md:text-md mt-2"
            >
              {props.article.subtitle}...
            </Link>
          </div>
        </CardContent>
        <CardActionArea onClick={() => handleNavigate(props.article.id)}>
          <CardMedia
            component="img"
            className="w-full  h-auto md:max-h-[550px] cursor-pointer"
            image={props.article.photo}
            alt={props.article.title}
            title={props.article.title}
          />
        </CardActionArea>
        <div className="md:px-5 py-2 md:py-3 px-1 flex items-center justify-between">
          <div className="flex gap-3">
            <LikeButton
              like={{
                id: props.article.id,
                likeCount: props.article.likeCount,
                likes: props.article.likes,
              }}
            />
            <FavoriteButton id={props.article.id} />
          </div>
          <ShareButton title={props.article.title} id={props.article.id} />
        </div>
      </div>
    </Card>
  );
}
