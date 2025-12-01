import $api from '~shared/api';

export function getOrganizationQuery() {
  return $api.get('articles/organizations/');
}
