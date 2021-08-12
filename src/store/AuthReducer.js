import {LOGOUT, LOGIN} from './ActionCreators';

const defaultState = {
  user: {},
  token: false,
};

const AuthReducer = (state = defaultState, action) => {
  console.log('ActionType', action.type);
  switch (action.type) {
    case LOGIN:
      console.log(
        'Logging In : Reducer',
        JSON.stringify(action.payload, null, 2),
      );
      //console.log('User', );
      return {...state, user: action.payload.user, token: action.payload.token};

    case LOGOUT:
      // console.log("Logging out reducer");
      return {...state, user: action.payload, token: null};
    default:
      console.log('Default Again');
      return {
        ...state,
        token: null,
      };
  }
};
export default AuthReducer;
