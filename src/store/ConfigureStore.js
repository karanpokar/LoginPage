import {createStore} from 'redux';
import AuthReducer from './AuthReducer';

const appStore = createStore(AuthReducer);

export default appStore;
