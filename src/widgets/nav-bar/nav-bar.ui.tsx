import { useState } from 'react';
import { Sidebar, Menu } from 'react-pro-sidebar';
import { Box } from '@mui/material';
import { NavbarItem } from './nav-bar.item';
import { CategoryNavbar } from './nav-bar.category';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import WidgetsIcon from '@mui/icons-material/Widgets';  


export function NavBar() {
  const [selected, setSelected] = useState('');

  return (
    <Box
      className="min-h-screen fixed  bg-[none]"
      sx={{
        '& .pro-sidebar': {
          maxWidth: '220px !important',
          minWidth: '200px !important',
        },
        '& .ps-sidebar-container': {
          backgroundColor: 'transparent !important',
        },
        '& .ps-sidebar-root': {
          borderColor: 'transparent',
        },
        '& .ps-menu-button:hover': {
          backgroundColor: 'white !important',
          borderRadius: '5px',
        },
        '& .ps-menuitem-root.ps-active': {
          background: 'white',
          borderRadius: '5px',
        },
      }}
    >
      <Sidebar className="h-[calc(1oovh - 64px)] sticky top-[60px] block">
        <Menu>
          <Box className="overflow-y-hidden duration-300 hover:overflow-y-auto max-h-screen pt-5 pb-40">
            <NavbarItem
              title="Главная"
              to="/"
              icon={<WidgetsIcon className="text-pc-500" />}
              selected={selected}
              setSelected={setSelected}
            />
            <NavbarItem
              title="Обзор"
              to="/feed"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#676767" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-book-search-icon lucide-book-search"><path d="M11 22H5.5a1 1 0 0 1 0-5h4.501"/><path d="m21 22-1.879-1.878"/><path d="M3 19.5v-15A2.5 2.5 0 0 1 5.5 2H18a1 1 0 0 1 1 1v8"/><circle cx="17" cy="18" r="3"/></svg>}
              selected={selected}
              setSelected={setSelected}
            />
            <NavbarItem
              title="Рейтинг"
              to="/rating/"
              icon={<BarChartRoundedIcon className="text-pc-500" />}
              selected={selected}
              setSelected={setSelected}
            />
            <NavbarItem
              title="Коробки"
              to="/boxes"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#676767" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-package-icon lucide-package"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/></svg>}
              selected={selected}
              setSelected={setSelected}
            />
              <NavbarItem
              title="О Проекте"
              to="/about"
              icon={<InfoRoundedIcon className="text-pc-500" />}
              selected={selected}
              setSelected={setSelected}
            />
            <h5 className="text-meduim text-sm mt-4 text-pc-500">Категории</h5>
            <CategoryNavbar />

            <p className="text-meduim text-sm mt-4 text-pc-500">
              &reg; Makalabox 2024
            </p>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
}
