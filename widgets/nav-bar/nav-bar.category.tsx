import { categoryQueries } from '~entities/category';
import { NavbarItem } from './nav-bar.item';
import { Avatar, CircularProgress } from '@mui/material';
import { useState } from 'react';

export function CategoryNavbar() {
  const [selected, setSelected] = useState('');
  const {
    data: categories,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = categoryQueries.useGetCategoryQuery();

  if (isCategoryLoading) {
    return (
      <div className="flex justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      {categories?.data?.map((category) => (
        <NavbarItem
          title={category.name}
          to={`/feed?categories=${category.id}`}
          icon={
            <Avatar
              src={category.photo}
              alt={category.name}
              className="w-[34px] h-[34px]"
            />
          }
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </>
  );
}
