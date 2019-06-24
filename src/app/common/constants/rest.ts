const BASE_URL: string = '/api';

const USER_URL: string = `${BASE_URL}/user`;
const BLATZ_URL: string = `${BASE_URL}/blatz`;
const TRENDING_URL: string = `${BASE_URL}/trending`;
const FOLLOWING_URL: string = `${BASE_URL}/following`;

export const RestConstants = Object.freeze({
  USER_URL: `${USER_URL}`,
  REGISTER_URL: `${USER_URL}/register`,
  LOGIN_URL: `${USER_URL}/login`,
  LOGOUT_URL: `${USER_URL}/logout`,
  CHANGE_PASSWORD_URL: `${USER_URL}/changepassword`,
  BLATZ_URL: `${BLATZ_URL}`,
  TRENDING_URL: `${TRENDING_URL}`,
  FOLLOWING_URL: `${FOLLOWING_URL}`
});
