import { createElement } from 'react';
import { RouteObject, redirect } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import { FavoritesPage } from './favorites-page.ui';
import { getCookie } from 'typescript-cookie';

export const favoritesPageRoute: RouteObject = {
  path: pathKeys.favorites(),
  element: createElement(FavoritesPage),
  loader: async (args) => {
    if (!getCookie('access')) {
      return redirect(pathKeys.login());
    }
    return args;
  },
};
