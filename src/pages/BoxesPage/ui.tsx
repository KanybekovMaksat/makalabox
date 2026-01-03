import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Tooltip,
  Typography,
  TextField,
  Chip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { articleQueries } from '~entities/article';
import { useState, useMemo } from 'react';

const getUniqueCategories = (boxes) => {
  if (!boxes) return [];
  const categories = boxes.flatMap((box) => box.categories || []);
  return ['Все', ...new Set(categories)];
};

export const BoxesPage = () => {
  const {
    data: boxesData,
    isLoading,
    isError,
  } = articleQueries.useGetAllBoxes();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const allBoxes = boxesData?.data?.results || [];

  const filteredBoxes = useMemo(() => {
    return allBoxes.filter((box) => {
      const matchesSearch = box.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'Все' ||
        (box.categories && box.categories.includes(selectedCategory));

      return matchesSearch && matchesCategory;
    });
  }, [allBoxes, searchTerm, selectedCategory]);

  const categories = useMemo(() => getUniqueCategories(allBoxes), [allBoxes]);

  if (isLoading) {
    return (
      <Container maxWidth="md" className="mx-auto my-[65px] text-center">
        <CircularProgress />
        <p>Загрузка коробок...</p>
      </Container>
    );
  }

  if (isError) {
    return <div className="my-20 text-center">Ошибка загрузки данных.</div>;
  }
  return (
    <Container maxWidth="md" className="mx-auto mb-[65px]">
      <Box className=" flex justify-center">
        <Box className="w-full max-w-[650px] ">
          <h2 className="mt-10 mb-5 text-center text-xl font-bold text-pc-500">
            Лента коробок
          </h2>
          <Box className="mb-6 p-4 border bg-[white] border-sc-100 rounded-lg bg-gray-50">
            <TextField
              fullWidth
              label="Поиск по названию коробки..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            <Typography
              variant="body2"
              className="mb-2 font-semibold text-gray-700"
            >
              Фильтр по категориям:
            </Typography>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  size="small"
                  onClick={() => setSelectedCategory(category)}
                  variant={
                    selectedCategory === category ? 'filled' : 'outlined'
                  }
                  color={selectedCategory === category ? 'primary' : 'default'}
                  className={`cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-pc-500 text-white'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                />
              ))}
            </div>
          </Box>
          <div className="flex flex-col gap-3 items-center">
            {filteredBoxes.length === 0 && (
              <Typography
                variant="body1"
                className="text-center mt-8 text-gray-500"
              >
                Коробок по заданным критериям не найдено.
              </Typography>
            )}

            {filteredBoxes.map((box) => (
              <Link
                to={`/boxes/${box.id}`}
                key={box.id}
                className="w-full max-w-[650px]"
              >
                <Card className="flex items-start shadow-sm p-2 md:p-3 gap-3 w-full border border-sc-100 hover:bg-gray-50 transition duration-150">
                  <CardMedia
                    component="img"
                    image={box.photo || '/placeholder.png'}
                    alt={box.name}
                    className="w-[80px] h-[80px] object-cover rounded-md flex-shrink-0"
                  />
                  <CardContent className="flex-1 flex flex-col gap-0 p-0 pt-1">
                    <Typography
                      variant="subtitle1"
                      className="font-bold text-gray-900 leading-tight mb-1"
                    >
                      {box.name}
                    </Typography>

                    {/* Информация об авторе */}
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar
                        src={box.author.photo || '/placeholder.png'}
                        alt={box.author.fullName}
                        className="w-5 h-5"
                      />
                      <Typography
                        variant="body2"
                        className="text-gray-600 flex items-center gap-1 text-[13px]"
                      >
                        {box.author.fullName}
                        {box.author.official && (
                          <Tooltip title="Официальный аккаунт">
                            <img
                              src="/official.svg"
                              alt="official"
                              className="h-3 w-3"
                            />
                          </Tooltip>
                        )}
                      </Typography>
                      <Link
                        to={`/${box.author.username}`}
                        className="text-[12px] text-blue-500 hover:underline"
                      >
                        @{box.author.username}
                      </Link>
                    </div>

                    {/* Количество статей */}
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 0H4v10h12V5zM6 8h8v2H6V8z" />
                      </svg>
                      <Typography variant="caption" className="text-gray-500">
                        {box.articles.length === 0
                          ? '0 статей'
                          : `${box.articles.length} статей`}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Box>
      </Box>
    </Container>
  );
};
