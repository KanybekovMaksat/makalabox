import { Outlet } from 'react-router-dom';

export function IntroLayout() {
  return (
    <div className="h-screen  flex items-center justify-center">
      <Outlet />
    </div>
  );
}
