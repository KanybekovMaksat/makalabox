import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from 'react-router-dom';
import { feedPageRoute } from '~pages/FeedPage';
import { homePageRoute } from '~pages/HomePage';
import { favoritesPageRoute } from '~pages/FavoritesPage';
import { articlePageRoute } from '~pages/ArticlePage';
import { registerPageRoute } from '~pages/RegisterPage';
import { loginPageRoute } from '~pages/LoginPage';
import { sandboxPageRoute } from '~pages/SandboxPage';
import { profilePageRoute } from '~pages/ProfilePage';
import { verifyPageRoute } from '~pages/VerifyPage';
import { editPageRoute } from '~pages/EditPage';
import { ratingPageRoute } from '~pages/RatingPage';
import { aboutPageRoute } from '~pages/AboutPage';
import { userPageRoute } from '~pages/UserPage';
import { changePasswordPageRoute } from '~pages/ChangePasswordPage';
import { forgotPasswordPageRoute } from '~pages/ForgotPasswordPage';
import { boxesPageRoute } from '~pages/BoxesPage';
import { boxPageRoute } from '~pages/BoxPage';
import { GenericLayout } from '~app/layouts/GenericLayout';
import { IntroLayout } from '~app/layouts/IntroLayout';

function BubbleError() {
  const error = useRouteError();
  if (error) throw error;
  return null;
}

const router = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        element: <GenericLayout />,
        children: [
          homePageRoute,
          feedPageRoute,
          favoritesPageRoute,
          articlePageRoute,
          profilePageRoute,
          sandboxPageRoute,
          editPageRoute,
          ratingPageRoute,
          aboutPageRoute,
          userPageRoute,
          boxesPageRoute,
          boxPageRoute
        ],
      },
      {
        element: <IntroLayout />,
        children: [
          registerPageRoute,
          loginPageRoute,
          verifyPageRoute,
          changePasswordPageRoute,
          forgotPasswordPageRoute,
        ],
      },
    ],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
