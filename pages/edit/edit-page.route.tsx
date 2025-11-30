import { createElement } from 'react';
import { RouteObject, redirect } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import { getCookie } from 'typescript-cookie';
import { EditPage } from './edit-page.ui';


export const editPageRoute: RouteObject = {
  path: '/article/edit/:id',
  element: createElement(EditPage),
  loader: async (args) => {
    if (!getCookie('access')) {
      return redirect(pathKeys.login());
    }
    return args;
  },
};
