import { combineReducers } from 'redux';
import * as type from '../constants/ActionTypes';

export const initialState = {
  isAdmin: false,
  nickname: '',
  email: '',
  headerElement : ['SIGN-IN', 'SIGN-UP', 'ABOUT'],
  checkUser : null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.RESET: {
      return initialState;
    }
    case type.TOGGLE_TO_BE_ADMIN: {
      return { ...state, isAdmin: !state.isAdmin };
    }
    case type.UPDATE_NICK_NAME: {
      return { ...state, nickname: action.nickname };
    }
    case type.UPDATE_EMAIL: {
      return { ...state, email: action.email };
    }


    case type.SET_HEADER_ELEMTNT: {
      return {headerElement:action.headerElement}
    }
    case type.CHECK_USER_OUTH:{
      return {checkUser:action.checkUser}
    }
    default: {
      return state;
    }
  }
};


const reducers = combineReducers({
  userData: userReducer
});

export default reducers;
