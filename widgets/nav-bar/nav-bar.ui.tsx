'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname , useSearchParams} from 'next/navigation';
import {
  Button,
  ScrollShadow,
  Tooltip,Avatar, Spinner
} from '@heroui/react';
import {
  Flame,
  BookOpen,
  BarChart3,
  Package,
  Info,
} from 'lucide-react';
import { CategorySection } from './nav-bar.category';
import { categoryQueries } from '@/entities/category';
import { useScrollBar } from '@/shared/utils/useScrollbar';

const mainNav = [
  { label: 'Популярное', href: '/',        icon: Flame },
  { label: 'Обзор',      href: '/feed',   icon: BookOpen },
  { label: 'Рейтинг',    href: '/rating', icon: BarChart3 },
  { label: 'Коробки',    href: '/boxes',  icon: Package },
  { label: 'О проекте',  href: '/about',  icon: Info },
];

export function SideBar() {
  const { theme } = useTheme();
  const pathname  = usePathname();
  const searchParams = useSearchParams();
const { scrollRef, show } = useScrollBar();
  /* единое состояние для всех пунктов */
  const [selected, setSelected] = useState(() => {
    const fromMain = mainNav.find((i) => i.href === pathname)?.label;
    const fromCat  = searchParams.get('categories');
    return fromCat ? `cat-${fromCat}` : (fromMain ?? 'Популярное');
  });

  const isDark = theme === 'dark';

  /* категории */
  const { data, isLoading } = categoryQueries.useGetCategoryQuery();
  const categories = data?.data;

  const handlePress = (key: string, href: string) => {
    setSelected(key);
    // если это категория – href уже содержит ?categories=N
  };


  return (
    <aside
      className="hidden md:flex flex-col w-64 h-screen fixed top-[10%] shrink-0
                 bg-background  border-divider"
    >
      <div   ref={scrollRef} className="flex-1 px-4 pb-6 overflow-auto scrollbar-thin">
        <nav className="flex flex-col gap-2">
{mainNav.map((item) => {
            const Icon = item.icon;
            const key = item.label;
            return (
              <Button
                key={key}
                as={Link}
                href={item.href}
                variant={selected === key ? 'solid' : 'light'}
                color={selected === key ? 'default' : 'default'}
                className="justify-start"
                startContent={<Icon className="w-5 h-5" />}
                onPress={() => handlePress(key, item.href)}
              >
                {item.label}
              </Button>
            );
          })}
        </nav>
       {categories && categories.length > 0 && (
          <>
            <p className="text-tiny text-default-500 my-2">Категории</p>
            <div className="flex flex-col gap-2 pb-5">
              {isLoading ? (
                <div className="flex justify-center py-2">
                  <Spinner size="sm" />
                </div>
              ) : (
                categories.map((cat) => {
                  const key = `cat-${cat.id}`;
                  return (
                    <Button
                      key={key}
                      as={Link}
                      href={`/feed?categories=${cat.id}`}
                      variant={selected === key ? 'solid' : 'light'}
                      color={selected === key ? 'default' : 'default'}
                      className="justify-start"
                      startContent={
                        <Avatar
                          src={cat.photo}
                          alt={cat.name}
                          size="sm"
                          classNames={{ base: 'w-6 h-6' }}
                        />
                      }
                      onPress={() => handlePress(key, `/feed?categories=${cat.id}`)}
                    >
                      {cat.name}
                    </Button>
                  );
                })
              )}
            </div>
          </>
        )}

        <p className="text-tiny text-default-400 mt-6">
          &copy; Makalabox 2024
        </p>
      </div>
    </aside>
  );
}