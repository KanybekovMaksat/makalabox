import React from 'react';
import {
  CircularProgress,
  Container,
  Avatar,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Chip,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useGetDetailBox } from '~entities/article/article.queries';

export const BoxPage = () => {
  const { id } = useParams();

  const { data: BoxData, isLoading, isError } = useGetDetailBox(Number(id));

  if (isLoading) {
    return <p className="text-center mt-2">Загрузка данных...</p>;
  }

  if (isError || !BoxData || !BoxData.data) {
    return (
      <Container maxWidth="md" className="mx-auto my-20 text-center">
        <Typography variant="h6" color="error">
          Ошибка при получении данных. Пожалуйста, попробуйте снова.
        </Typography>
      </Container>
    );
  }

  const { data } = BoxData;
  const { author, photo, name, organization, categories, articles } = data;

  return (
    <Container maxWidth="md">
      <Card className="my-5 max-w-[345px] mx-auto md:max-w-[650px] shadow-none border border-sc-100 p-6">
        <div className="flex items-center gap-4">
          <Avatar
            src={author?.photo || '/avatar-placeholder.png'}
            alt={author?.username || 'Unknown'}
            className="w-16 h-16"
          />
          <div>
            <Typography variant="h5" className="font-medium text-[20px]">
              {author?.fullName || 'Неизвестный автор'}
            </Typography>
            <Typography variant="body2" className="text-gray flex gap-1">
              @{author?.username || 'unknown'}
              {author?.official && (
                <Tooltip
                  title="Официальный аккаунт"
                  className="hover:cursor-pointer"
                >
                  <img
                    src="/official.svg"
                    alt="Official Account"
                    className="h-[20px]"
                  />
                </Tooltip>
              )}
            </Typography>
          </div>
        </div>
      </Card>
      <Card className="mb-10 shadow-none border max-w-[345px] md:max-w-[650px] mx-auto border-sc-100">
        <div className="flex flex-col md:flex-row   gap-6 items-center p-6">
          <CardMedia
            component="img"
            image={photo || '/placeholder.png'}
            alt={name || 'Без названия'}
            className="w-32 h-32 object-cover rounded-md border border-[gray]"
          />
          <div>
            <Typography variant="h4" className="font-semibold md:text-left text-center text-[24px] mb-2">
              {name || 'Название отсутствует'}
            </Typography>
            <Typography variant="body1" className="text-[gray]">
              Организация:
              <Chip
                className="h-[18px] text-[12px] font-bold"
                label={organization?.name || 'Без организации'}
              />
            </Typography>
            <Typography variant="body2" className="text-gray-500 mt-1">
              {categories?.length > 0
                ? categories.join(', ')
                : 'Категории отсутствуют'}
            </Typography>
          </div>
        </div>
      </Card>
      <div>
        <Typography variant="h5" className="font-semibold mb-6 text-center">
          Коробка статей:
        </Typography>
        <div className="flex md:flex-wrap flex-col md:flex-row items-center mb-20 gap-3 justify-center">
          {articles?.length > 0 ? (
            articles.map((article) => (
              <Link key={article.id} to={`/article/${article.id}/`}>
                <Card className="shadow-none h-[300px] w-[345px] md:w-[270px] border border-sc-100 overflow-hidden flex flex-col">
                  <CardMedia
                    component="img"
                    image={article?.photo || '/placeholder.png'}
                    alt={article?.title || 'Без названия'}
                    className="w-full h-40 object-cover p-2"
                  />
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <Typography
                      variant="h6"
                      className="font-bold text-[18px] leading-[25px] "
                      title={article.title || 'Без названия'}
                    >
                   {article.title.slice(0, 70)}...
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <Typography variant="body1" className="text-center col-span-full">
              Статей пока нет
            </Typography>
          )}
        </div>
      </div>
    </Container>
  );
};
