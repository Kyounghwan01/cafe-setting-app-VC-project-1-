import * as type from '../constants/ActionTypes';

export const toggleToBeAdmin = () => ({
  type: type.TOGGLE_TO_BE_ADMIN
});

export const updateNickName = nickname => ({
  type: type.UPDATE_NICK_NAME,
  nickname
});

export const updateEmail = email => ({
  type: type.UPDATE_EMAIL,
  email
});

export const reset = () => ({
  type: type.RESET
});

export const setHeaderElement = headerElement => ({
  type: type.SET_HEADER_ELEMTNT,
  headerElement
});

export const checkUserOuth = checkUser => ({
  type: type.CHECK_USER_OUTH,
  checkUser
});