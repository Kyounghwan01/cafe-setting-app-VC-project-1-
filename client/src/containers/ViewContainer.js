import React, { useEffect, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
// import { userReducer, initialState } from '../reducers';
// import * as dispatchFunction from '../actions';
import View from '../components/View';
import axios from 'axios';

const ViewContainer = props => {
  const [arrangement, setArr] = useState(null);
  const [menu, setMenu] = useState(null);
  // console.log(props);

  useEffect(() => {
    props.checkUser(props.location.search);
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(
      `/api/view/${props.location.search.substring(1)}`
    );
    if (res.data.cafeData) {
      setMenu(res.data.cafeData[0].menu);
      setArr(res.data.cafeData[0].arrangemenet);
    }
  };

  return (
    <>
      {props.user.checkUser ? (
        <Redirect to="/" />
      ) : (
        <View
          headerElement={['MAIN', 'LOG-OUT', 'ABOUT']}
          tocken={props.location.search}
          menuList={menu}
          arrangeMent={arrangement}
        />
      )}
    </>
  );
};
export default withRouter(ViewContainer);
