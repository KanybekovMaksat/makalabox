import ScrollTop from '~shared/lib/react-router/scroll-top';
import { Outlet } from 'react-router-dom';
import { getCookie } from 'typescript-cookie';
import { GuestBar } from '~widgets/guest-bar';
import { TopBar } from '~widgets/top-bar';
import { NavBar } from '~widgets/nav-bar';
import { Container } from '@mui/material';
import { Footer } from '~widgets/footer';

export function GenericLayout() {
  const isAuth = getCookie('access');
  return (
    <>
      <ScrollTop />
      {isAuth ? <TopBar /> : <GuestBar />}
      <Container maxWidth="lg" className="flex relative mt-14 p-0">
        <div className="w-[270px] hidden md:block">
          <NavBar />
        </div>
        <Outlet />
        <Footer />
      </Container>
    </>
  );
}

export function IntroLayout() {
  return (
    <div className="h-screen  flex items-center justify-center">
      <Outlet />
    </div>
  );
}
