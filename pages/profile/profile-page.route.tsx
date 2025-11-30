import { RouteObject, redirect } from 'react-router-dom';
import { createElement } from 'react';
import { pathKeys } from '~shared/lib/react-router';
import { ProfilePage } from './profile-page.ui';
import { getCookie } from 'typescript-cookie';

export const profilePageRoute: RouteObject = {
  path: pathKeys.profile.root(),
  element: createElement(ProfilePage),
  loader: async (args) => {
    if (!getCookie('access')) {
      return redirect(pathKeys.login());
    }
    return args;
  },
};
