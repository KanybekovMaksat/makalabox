import { createElement } from 'react';
import { RouteObject, redirect } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import { SandboxPage } from './sandbox-page.ui';
import { getCookie } from 'typescript-cookie';

export const sandboxPageRoute: RouteObject = {
  path: pathKeys.editor.root(),
  element: createElement(SandboxPage),
  loader: async (args) => {
    if (!getCookie('access')) {
      return redirect(pathKeys.login());
    }
    return args;
  },
};
