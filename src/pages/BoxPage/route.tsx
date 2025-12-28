import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { BoxPage } from './ui';

export const boxPageRoute: RouteObject = {
  path: 'boxes/:id/',
  element:createElement(BoxPage)
};
