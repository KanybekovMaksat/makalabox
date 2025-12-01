import { useState } from 'react';
import { Sidebar, Menu } from 'react-pro-sidebar';
import { 
  HomeIcon,
  CompassIcon,
  BarChart3Icon,
  PackageIcon,
  InfoIcon,
  FlameIcon,
  Book
} from 'lucide-react';

import { NavbarItem } from './nav-bar.item';
import { CategoryNavbar } from './nav-bar.category';

export function SideBar() {
  const [selected, setSelected] = useState('');

  return (
    <div
      className="min-h-screen fixed bg-white"
      style={{
        '& .pro-sidebar': {
          maxWidth: '220px !important',
          minWidth: '200px !important',
          background:"white",
        },
        '& .ps-sidebar-container': {
          backgroundColor: 'transparent !important',
        },
        '& .ps-sidebar-root': {
          borderColor: 'transparent',
        },
        '& .ps-menu-button:hover': {
          borderRadius: '5px',
        },
        '& .ps-menuitem-root.ps-active': {
          background: 'white',
          borderRadius: '5px',
        },
      } as any}
    >
      <Sidebar className="h-[calc(100vh - 64px)]  block">
        <Menu>
          <div className="overflow-y-hidden duration-300 hover:overflow-y-auto max-h-screen  pb-40">
            <NavbarItem
              title="Популярное"
              to="/"
              icon={<FlameIcon className="w-6 h-6 text-gray-500" />}
              selected={selected}
              setSelected={setSelected}
            />
            <NavbarItem
              title="Обзор"
              to="/feed"
              icon={<Book className="w-6 h-6 text-gray-500" />}
              selected={selected}
              setSelected={setSelected}
            />
            <NavbarItem
              title="Рейтинг"
              to="/rating/"
              icon={<BarChart3Icon className="w-6 h-6 text-gray-500" />}
              selected={selected}
              setSelected={setSelected}
            />
            <NavbarItem
              title="Коробки"
              to="/boxes"
              icon={<PackageIcon className="w-6 h-6 text-gray-500" />}
              selected={selected}
              setSelected={setSelected}
            />
            <NavbarItem
              title="О Проекте"
              to="/about"
              icon={<InfoIcon className="w-6 h-6 text-gray-500" />}
              selected={selected}
              setSelected={setSelected}
            />
            
            {/* <h5 className="text-meduim text-sm mt-4 text-pc-500">Категории</h5>
            <CategoryNavbar /> */}

            <p className="text-meduim text-sm mt-4 text-pc-500">
              &reg; Makalabox 2024
            </p>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
}