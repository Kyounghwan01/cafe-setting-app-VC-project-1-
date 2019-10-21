import { initialState, userReducer } from './index';

import * as types from '../actions';

describe('reducer func test', () => {
  it('init state test', () => {
    expect(initialState).toHaveProperty('headerElement');
    expect(initialState.headerElement).toEqual(['SIGN-IN', 'SIGN-UP']);
  });

  describe('action data test', () => {
    it('userReducer action test', () => {
      expect(userReducer(initialState.headerElement, types.setHeaderElement('[set,header,element,test]')))
      .toEqual({"headerElement": "[set,header,element,test]"});

      expect(userReducer(initialState.checkUser, types.checkUserOuth(true)))
      .toEqual({'checkUser' : true})
    });
  });
});
