import { SET_USER_INFO, server } from "../constants";
import axios from "axios";
import http from "../../configs/http";

export const setUserInfo = payload => ({
  type: SET_USER_INFO,
  payload
});

export const getUserInfo = () => {
  return async dispatch => {
    const token = localStorage.getItem(server.TOKEN_KEY);
    // const rp = await axios.post(`${http}/api/v1/auth/profile`, null, {
    //   headers: {
    //     "x-access-token": token
    //   }
    // });
    // const { error, data } = rp.data;
    // console.log("userActions", data);

    const res = await axios.post(`${http}/api/v1/auth/profile`, null, {
      headers: {
        "x-access-token": token
      }
    });
    const { data, error } = res.data;
    // console.log("ddd", data);
    if (!error) {
      dispatch(setUserInfo(data));
    }

    // dispatch(setUserInfo("gg"));
    // if (!error) {

    // }
  };
};

