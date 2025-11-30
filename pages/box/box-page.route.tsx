import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { BoxPage } from './box-page.ui';

export const boxPageRoute: RouteObject = {
  path: 'boxes/:id/',
  element:createElement(BoxPage)
};
