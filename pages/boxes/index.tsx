'use client';

import { articleQueries } from '@/entities/article';
import DefaultLayout from '@/layouts/default';
import {
  Card,
  CardBody,
  Image,
  Chip,
  Input,
  Link,
  Spinner,
  User,
  Tooltip,
} from '@heroui/react';
import { Search, FileText, Verified, PackageOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';

type Author = {
  fullName: string;
  username: string;
  photo?: string;
  official?: boolean;
};

type Box = {
  id: string;
  name: string;
  photo?: string;
  categories?: string[];
  author: Author;
  articles: { id: string }[];
};

const getUniqueCategories = (boxes: Box[]): string[] => {
  if (!boxes?.length) return [];
  const cats = boxes.flatMap((b) => b.categories || []);
  return ['Все', ...Array.from(new Set(cats))];
};

export default function Index() {
  const router = useRouter();
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

  const categories = getUniqueCategories(allBoxes);

  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="flex flex-col items-center justify-center py-10">
          <span className="loading loading-spinner loading-lg text-primary" />
          <Spinner size="lg" />
          <p className="text-center mt-2">Загрузка коробок...</p>
        </div>
      </DefaultLayout>
    );
  }
  if (isError || !boxesData)
    return (
      <div className="my-20 text-center text-danger">
        Ошибка загрузки данных.
      </div>
    );

  return (
    <DefaultLayout>
      <h2 className="mt-10 mb-5 text-center text-xl font-bold text-primary">
        Лента коробок
      </h2>
      <Card className="mb-6 p-0 shadow-none ">
        <Input
          size="lg"
          placeholder="Поиск по названию коробки…"
          value={searchTerm}
          onValueChange={setSearchTerm}
          startContent={<Search className="w-4 h-4 text-default-400" />}
          className="mb-4"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Chip
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              color={selectedCategory === cat ? 'primary' : 'default'}
              variant={selectedCategory === cat ? 'solid' : 'bordered'}
              className="cursor-pointer"
            >
              {cat}
            </Chip>
          ))}
        </div>
      </Card>
      {filteredBoxes.length === 0 && (
        <p className="text-center mt-8 text-default-500">
          Коробок по заданным критериям не найдено.
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBoxes.map((box) => (
          <Card
            isPressable
            onPress={() => router.push(`/boxes/${box.id}`)}
            className="w-full shadow-none border border-default-200"
          >
            <CardBody className="p-0 flex ">
              <div className="w-40 h-40 flex items-center justify-center mx-auto">
                <Image
                  src={box.photo || '/placeholder.png'}
                  alt={box.name}
                  className="w-full h-full object-cover pt-4 rounded-xl"
                />
              </div>
              <div className="p-3 flex flex-col gap-2">
                <h3 className="font-semibold text-xl flex items-center gap-1 line-clamp-2 my-2">
                  <PackageOpen />
                  {box.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-default-500">
                  <User
                    avatarProps={{
                      src: box.author.photo,
                      size: 'sm',
                    }}
                    description={
                      <Link href={`/${box.author.username}`} size="sm">
                        @{box.author.username}
                      </Link>
                    }
                    name={
                      <div className="flex items-center gap-1">
                        {box.author.fullName}
                        {box.author.official && (
                          <Tooltip content="Официальный аккаунт">
                            <Verified className="text-sky-500" size={16} />
                          </Tooltip>
                        )}
                      </div>
                    }
                  />
                </div>

                <div className="flex items-center gap-1 text-xs text-default-400">
                  <FileText size={12} />
                  <span>{box.articles.length} статей</span>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </DefaultLayout>
  );
}
