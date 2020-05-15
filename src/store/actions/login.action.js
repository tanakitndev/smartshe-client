import { server } from "../constants";
// import { httpClient } from "./../utils/HttpClient";
import jwt from "jsonwebtoken";

// // Called by Login Component
// export const login = (value, history) => {
//   return async dispatch => {
//     try {
//       dispatch(setLoginStateToFetching()); // fetching
//       let result = await httpClient.post(server.LOGIN_URL, value);
//       if (result.data.result == "ok") {
//         localStorage.setItem(server.TOKEN_KEY, result.data.token);
//         localStorage.setItem(
//           server.REFRESH_TOKEN_KEY,
//           result.data.refreshToken
//         );

//         dispatch(setLoginStateToSuccess(result));
//         history.push("/stock");
//       } else {
//         dispatch(setLoginStateToFailed());
//       }
//     } catch (error) {
//       dispatch(setLoginStateToFailed());
//     }
//   };
// };

export const isLoggedIn = () => {
  let token = localStorage.getItem(server.TOKEN_KEY);
  if (token) {
    var decodedToken = jwt.decode(token, { complete: true });
    var dateNow = new Date();

    if (decodedToken.exp < dateNow.getTime()) {
      // alert(JSON.stringify(decodedToken));
      return false;
    } else {
      // alert(Date(decodedToken.exp).toString());
      // alert(JSON.stringify(decodedToken));
      return true;
    }
  } else {
    return false;
  }
};
