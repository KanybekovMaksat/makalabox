'use client';

import { categoryQueries } from '@/entities/category';
import { Button, ScrollShadow, Avatar, Spinner } from '@heroui/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export function CategorySection() {
  const searchParams = useSearchParams();
  const [selectedCat, setSelectedCat] = useState<string>('');

  useEffect(() => {
    setSelectedCat(searchParams.get('categories') ?? '');
  }, [searchParams]);

  const { data, isLoading, isError } = categoryQueries.useGetCategoryQuery();
  const list = data?.data;

  if (isLoading)
    return (
      <div className="flex justify-center py-4">
        <Spinner size="sm" />
      </div>
    );
  if (isError || !list) return null;

  return (
    <div className="">
      <p className="text-tiny text-default-500 mb-2">Категории</p>

        <div className="flex flex-col gap-2">
          {list.map((cat) => {
            const active = selectedCat === String(cat.id);
            return (
              <Button
                key={cat.id}
                as={Link}
                href={`/feed?categories=${cat.id}`}
                variant={active ? 'solid' : 'light'}
                color={active ? 'primary' : 'default'}
                className="justify-start"
                startContent={
                  <Avatar
                    src={cat.photo}
                    alt={cat.name}
                    size="sm"
                    classNames={{ base: 'w-6 h-6' }}
                  />
                }
                onPress={() => setSelectedCat(String(cat.id))}
              >
                {cat.name}
              </Button>
            );
          })}
        </div>

    </div>
  );
}