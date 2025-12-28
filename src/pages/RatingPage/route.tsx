import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { pathKeys } from '~shared/lib/react-router';
import { RatingPage } from './ui';
  
export const ratingPageRoute: RouteObject = {
  path: pathKeys.rating(),
  element: createElement(RatingPage),
};
