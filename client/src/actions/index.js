import * as type from '../constants/ActionTypes';

export const setHeaderElement = headerElement => ({
  type: type.SET_HEADER_ELEMTNT,
  headerElement
});

export const checkUserOuth = checkUser => ({
  type: type.CHECK_USER_OUTH,
  checkUser
});

export const seats = seatsArr => ({
  type: type.SEATS,
  seatsArr
})