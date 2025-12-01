export const pathKeys = {
  root: '/',
  home() {
    return pathKeys.root;
  },
  about() {
    return pathKeys.root.concat('about/');
  },
  register() {
    return pathKeys.root.concat('register/');
  },
  forgotPassword() {
    return pathKeys.root.concat('change-password/')
  },
  login() {
    return pathKeys.root.concat('login/');
  },
  boxes() {
    return pathKeys.root.concat('boxes/')
  },
  verify: {
    root() {
      return pathKeys.root.concat('#/activate/');
    },
    byId(params: { uid: string; token: string }) {
      return pathKeys.article.root().concat(params.uid, '/', params.token, '/');
    },
  },
  feed() {
    return pathKeys.root.concat('feed/');
  },
  favorites() {
    return pathKeys.root.concat('favorites/');
  },
  rating() {
    return pathKeys.root.concat('rating/');
  },
  page404() {
    return pathKeys.root.concat('404/');
  },

  article: {
    root() {
      return pathKeys.root.concat('article/');
    },
    byId(params: { id: number }) {
      return pathKeys.article.root().concat(String(params.id), '/');
    },
    update(params: { id: number }) {
      return pathKeys.article.root().concat('edit/', String(params.id), '/');
    },
  },
  editor: {
    root() {
      return pathKeys.root.concat('sandbox/');
    },
  },
  profile: {
    root() {
      return pathKeys.root.concat('profile/');
    },
  },
};
