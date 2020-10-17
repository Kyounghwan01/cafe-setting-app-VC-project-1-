import axios from "axios";

const BASE_URL =
  "http://itsmyseatvcserver-env.drc3wmhbci.ap-northeast-2.elasticbeanstalk.com/api/";

export default {
  login: params => axios.post(`${BASE_URL}/login`, params)
};
