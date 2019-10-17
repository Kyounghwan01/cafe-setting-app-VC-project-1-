import React, { useEffect, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import ChangeMenu from '../components/ChangeMenu';
import axios from 'axios';

const ChangeMenuContainer = props => {
  const [arrangement, setArr] = useState(null);
  const [listData, setlistData] = useState(null);

  useEffect(() => {
    props.checkUser(props.location.search);
    const fetchData = async () => {
      const res = await axios.get(
        `/api/view/${props.location.search.substring(1)}`
      );

      if (res.data.cafeData) {
        setArr(res.data.cafeData.arrangemenet);
        let copyMenu = {};
        for (let i = 0; i < res.data.cafeData.menu.length; i++) {
          const { name, price } = res.data.cafeData.menu[i];
          if (
            Object.keys(copyMenu).indexOf(
              res.data.cafeData.menu[i].category
            ) === -1
          ) {
            copyMenu[res.data.cafeData.menu[i].category] = [
              {
                label: name,
                price
              }
            ];
          } else {
            copyMenu[res.data.cafeData.menu[i].category].push({
              label: name,
              price
            });
          }
        }

        let copyData = [];
        for (let i = 0; i < Object.keys(copyMenu).length; i++) {
          if (res.data.categoryData[i]._id === Object.keys(copyMenu)[i]) {
            copyData.push({
              label: res.data.categoryData[i].name,
              children: copyMenu[Object.keys(copyMenu)[i]]
            });
          }
        }
        let listData = {
          label: 'menu-list',
          state: 'open',
          children: copyData
        };
        setlistData(listData);
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
        <ChangeMenu
          headerElement={['MAIN', 'CHANGE-SEATS', 'ORDER/SEATS', 'LOG-OUT']}
          tocken={props.location.search}
          arrangeMent={arrangement}
          listData={listData}
        />
      )}
    </>
  );
};
export default withRouter(ChangeMenuContainer);
