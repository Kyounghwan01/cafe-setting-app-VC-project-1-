import React from 'react';

const ErrorPage = props => {
  console.log(props);
  return (
    <div>
      <div>{props.errorstatus}</div>
      <div>{props.location.state}</div>
      <div>에러페이지</div>
    </div>
  );
};
export default ErrorPage;
