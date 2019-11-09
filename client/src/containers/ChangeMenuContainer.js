import React, { useEffect, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import ChangeMenu from '../components/ChangeMenu';
import * as PAGE from '../constants/state';
import axios from 'axios';

const ChangeMenuContainer = props => {
  const [arrangement, setArr] = useState(null);
  const [listData, setlistData] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    props.checkUser(props.location.search);
    const fetchData = async () => {
      const res = await axios.get(
        `http://itsmyseatvcserver-env.drc3wmhbci.ap-northeast-2.elasticbeanstalk.com/api/view${props.location.search.substring(1)}`
      );

      if (res.data.cafeData) {
        setArr(res.data.cafeData.arrangemenet);
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
                label: name,
                price,
                id : _id,
                desc : desc
              }
            ];
          } else {
            copyMenu[res.data.cafeData.menu[i].category].push({
              label: name,
              price,
              id : _id,
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
            label: res.data.categoryData[findId].name,
            children: copyMenu[Object.keys(copyMenu)[i]]
          });
        }

        let listData = {
          label: 'MENU',
          state: 'open',
          children: copyData
        };
        setlistData(listData);
        setCategory(res.data.categoryData);
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
          headerElement={[PAGE.ROUTE_MAIN, PAGE.ROUTE_CHANGE_SEATS, PAGE.ROUTE_MY_PAGE, PAGE.ROUTE_LOG_OUT]}
          tocken={props.location.search}
          arrangeMent={arrangement}
          listData={listData}
          category={category}
        />
      )}
    </>
  );
};
export default withRouter(ChangeMenuContainer);
