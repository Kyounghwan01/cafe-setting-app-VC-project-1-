import { combineReducers } from 'redux';
import * as type from '../constants/ActionTypes';

export const initialState = {
  headerElement : ['SIGN-IN', 'SIGN-UP'],
  checkUser : false,
  seatsArr:null,
  test : null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_HEADER_ELEMTNT: {
      return {headerElement:action.headerElement}
    }
    case type.CHECK_USER_OUTH:{
      return {checkUser:action.checkUser}
    }
    case type.SEATS:{
      console.log(action.seatsArr)
      return {seatsArr:action.seatsArr}
    }
    case type.TEST_FUNC:{
      console.log(action);
      return (state.test = action.test)
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
