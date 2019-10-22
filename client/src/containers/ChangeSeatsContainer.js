import React, { useEffect, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import ChangeSeats from '../components/ChangeSeats';
import axios from 'axios';
import * as PAGE from '../constants/state';

const ChangeSeatsContainer = props => {
  const [arrangement, setArr] = useState(null);

  useEffect(() => {
    props.checkUser(props.location.search);
    const fetchData = async () => {
      const res = await axios.get(
        `/api/view/${props.location.search.substring(1)}`
      );
      console.log(res);
      if (res.data.cafeData) {
        setArr(res.data.cafeData.arrangemenet);
      }
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [props]);

  return (
    <>
      {props.user.checkUser ? (
        <Redirect to="/" />
      ) : (
        <ChangeSeats
          headerElement={[PAGE.ROUTE_MAIN, PAGE.ROUTE_CHANGE_MENU, PAGE.ROUTE_MY_PAGE, PAGE.ROUTE_LOG_OUT]}
          tocken={props.location.search}
          arrangeMent={arrangement}
        />
      )}
    </>
  );
};
export default withRouter(ChangeSeatsContainer);
