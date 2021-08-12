export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const Login = (user, token) => {
  console.log('Inside Login', user);
  return {
    type: LOGIN,
    payload: {user: user, token: token},
  };
};

export const Logout = () => {
  return {
    type: LOGOUT,
    payload: [],
  };
};
