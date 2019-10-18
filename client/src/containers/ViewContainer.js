import React, { useEffect, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
// import { userReducer, initialState } from '../reducers';
// import * as dispatchFunction from '../actions';
import View from '../components/View';
import axios from 'axios';

const ViewContainer = props => {
  const [listData, setlistData] = useState(null);

  useEffect(() => {
    props.checkUser(props.location.search);

    const fetchData = async () => {
      const res = await axios.get(
        `/api/view/${props.location.search.substring(1)}`
      );

      if (res.data.cafeData) {
        let copyMenu = {};
        for (let i = 0; i < res.data.cafeData.menu.length; i++) {
          const { name, price, _id, desc } = res.data.cafeData.menu[i];
          if (
            Object.keys(copyMenu).indexOf(
              res.data.cafeData.menu[i].category
            ) === -1
          ) {
            copyMenu[res.data.cafeData.menu[i].category] = [
              {
                name: name,
                price,
                id: _id,
                desc: desc
              }
            ];
          } else {
            copyMenu[res.data.cafeData.menu[i].category].push({
              name: name,
              price,
              id: _id,
              desc : desc
            });
          }
        }

        let copyData = [];
        for (let i = 0; i < Object.keys(copyMenu).length; i++) {
          let findId = res.data.categoryData.findIndex(item => {
            return item._id === Object.keys(copyMenu)[i];
          });
          copyData.push({
            category: res.data.categoryData[findId].name,
            children: copyMenu[Object.keys(copyMenu)[i]]
          });
        }
        setlistData(copyData);
      }
    };

    fetchData();

    return () => {
      fetchData();
    };
  }, [props.location.search]);

  return (
    <>
      {props.user.checkUser ? (
        <Redirect to="/" />
      ) : (
        <View
          headerElement={['MAIN', 'LOG-OUT', 'ABOUT']}
          tocken={props.location.search}
          listData={listData}
        />
      )}
    </>
  );
};
export default withRouter(ViewContainer);
