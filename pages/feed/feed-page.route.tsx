import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import { FeedPage } from './feed-page.ui';

export const feedPageRoute: RouteObject = {
  path: pathKeys.feed(),
  element: createElement(FeedPage),
};
