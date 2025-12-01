import { useState } from 'react';
import { Sidebar, Menu } from 'react-pro-sidebar';
import {
  HomeIcon,
  CompassIcon,
  BarChart3Icon,
  PackageIcon,
  InfoIcon,
  FlameIcon,
  Book,
} from 'lucide-react';
import { useTheme } from 'next-themes'; // Импортируем хук для темы

import { NavbarItem } from './nav-bar.item';
import { CategoryNavbar } from './nav-bar.category';

export function SideBar() {
  const [selected, setSelected] = useState('');
  const { theme } = useTheme(); // Получаем текущую тему

  // Определяем стили в зависимости от темы
  const sidebarStyles = {
    backgroundColor: theme === 'dark' ? 'black' : 'white',
    color: theme === 'dark' ? '#e4e4e7' : '#000000',
  };

  const iconColor = theme === 'dark' ? '#a1a1aa' : '#6b7280';

  return (
    <div
      style={{
        '& .sidebar': {
          border: 'none',
        },
        '& .menu-icon': {
          backgroundColor: 'transparent !important',
        },
        '& .menu-item': {
          backgroundColor: 'transparent !important',
        },
        '& .menu-anchor': {
          color: 'inherit !important',
          backgroundColor: 'transparent !important',
        },
        '& .menu-item:hover': {
          color: theme === 'dark' ? '#ffffff !important' : '#000000 !important',
          backgroundColor: theme === 'dark' ? '#2a2a2a !important' : '#f5f5f5 !important',
        },
        '& .menu-item.active': {
          color: theme === 'dark' ? '#ffffff !important' : '#000000 !important',
          backgroundColor: theme === 'dark' ? '#2a2a2a !important' : '#f5f5f5 !important',
        },
      }}
      className={`min-h-screen fixed border-none z-10000 flex ${
        theme === 'dark' ? 'dark' : ''
      }`}
    >
      <Sidebar
        backgroundColor={sidebarStyles.backgroundColor}
        className="h-[calc(100vh - 64px)] block border-none!"
        rootStyles={{
          color: sidebarStyles.color,
        }}
      >
        <Menu>
          <div className="overflow-y-hidden duration-300 hover:overflow-y-auto max-h-screen pb-40">
            <NavbarItem
              title="Популярное"
              to="/"
              icon={<FlameIcon className="w-6 h-6" style={{ color: iconColor }} />}
              selected={selected}
              setSelected={setSelected}
            />
            <NavbarItem
              title="Обзор"
              to="/feed"
              icon={<Book className="w-6 h-6" style={{ color: iconColor }} />}
              selected={selected}
              setSelected={setSelected}
            />
            <NavbarItem
              title="Рейтинг"
              to="/rating/"
              icon={<BarChart3Icon className="w-6 h-6" style={{ color: iconColor }} />}
              selected={selected}
              setSelected={setSelected}
            />
            <NavbarItem
              title="Коробки"
              to="/boxes"
              icon={<PackageIcon className="w-6 h-6" style={{ color: iconColor }} />}
              selected={selected}
              setSelected={setSelected}
            />
            <NavbarItem
              title="О Проекте"
              to="/about"
              icon={<InfoIcon className="w-6 h-6" style={{ color: iconColor }} />}
              selected={selected}
              setSelected={setSelected}
            />

            <p className="text-meduim text-sm mt-4" style={{ 
              color: theme === 'dark' ? '#a1a1aa' : '#6b7280' 
            }}>
              &reg; Makalabox 2024
            </p>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
}