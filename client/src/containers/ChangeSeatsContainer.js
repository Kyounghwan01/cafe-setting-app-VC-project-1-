import React, { useEffect, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import ChangeSeats from '../components/ChangeSeats';
import axios from 'axios';

const ChangeSeatsContainer = props => {
  const [arrangement, setArr] = useState(null);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    props.checkUser(props.location.search);
    const fetchData = async () => {
      const res = await axios.get(
        `/api/view/${props.location.search.substring(1)}`
      );
      if (res.data.cafeData) {
        setArr(res.data.cafeData.arrangemenet);
      }
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, []);

  return (
    <>
      {props.user.checkUser ? (
        <Redirect to="/" />
      ) : (
        <ChangeSeats
          headerElement={['MAIN', 'CHANGE-MENU', 'ORDER/SEATS', 'LOG-OUT']}
          tocken={props.location.search}
          arrangeMent={arrangement}
        />
      )}
    </>
  );
};
export default withRouter(ChangeSeatsContainer);
