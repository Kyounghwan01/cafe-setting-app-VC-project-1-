import React, { useReducer } from 'react';
import { userReducer, initialState } from '../reducers';
import * as dispatchFunction from '../actions';
import './Main.scss';
import logo from '../img/logo.png';

const Main = props => {
  console.log(props);
  const [user, dispatchUser] = useReducer(userReducer, initialState);

  let label = 'user';
  if (user.isAdmin) {
    label = 'admin';
  }

  const reset = () => dispatchUser(dispatchFunction.reset());
  const toggleToBeAdmin = () => dispatchUser(dispatchFunction.toggleToBeAdmin());
  const updateNickname = event =>
    dispatchUser(dispatchFunction.updateNickName(event.target.value));
  const updateEmail = event =>
    dispatchUser(dispatchFunction.updateEmail(event.target.value));
{/* <div>
      <label>{label}</label>
      <h1>{user.nickname}</h1>
      <h3>{user.email}</h3>
      <button onClick={reset}>RESET</button>
      <button onClick={toggleToBeAdmin}>toggle admin mode</button>
      <input type="text" onChange={updateNickname} />
      <input type="text" onChange={updateEmail} />
    </div> */}
  return (
    <div className='main-container'>
      <div className='header'>
        <div className='header-logo'>
          <img src={logo}/>
        </div>
        <div className='header-list'>
          <span>Sign in</span>
          <span>Sign up</span>
        </div>
      </div>
    </div>
  );
};

export default Main;
