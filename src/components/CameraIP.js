import React, { useState, useEffect } from "react";
import {  Link } from "react-router-dom";

import axios from "axios";
import http from "../configs/http";
import rootPath from "../configs/rootPath";

// import Cryptr from "cryptr";
// const cryptr = new Cryptr("Nick5459");
const CameraIP = props => {
  const [camera_ips, setCamera_ips] = useState([]);
//   let history = useHistory();

  useEffect(() => {
    getCameraFromApi();
  }, []);

  const getCameraFromApi = async () => {
    const res = await axios.get(`${http}/api/v1/camera_ips`);
    const data = res.data.data;
    setCamera_ips(data);
    // this.setState({ camera_ips: data });
    // console.log(data);
  };
  return (
    <div className="wrap-content">
      <div className={camera_ips.length > 9 ? "w-100 box-container" : "w-100"}>
        <div className="row">
          {camera_ips.map((el, index) => {
            // const url = (index === 1) ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSv4Rvq8J-lg0G8HJg84GvgnnGIp1WZqg1gN9MHWTsPtkFZRpNV' : el.url;
            // this.checkVideoContent(url, el);
            //   const encryptedString = cryptr.encrypt(el.url);
            //   console.log("encryptedString", encryptedString);
            //   const decryptedString = cryptr.decrypt(encryptedString);
            //   console.log("decryptedString", decryptedString);
            // alert(el.url)
            let url = btoa(
              `${el.url}&location=${el.location_id}`
            );
            // console.log(url);
            // history.push(`${rootPath}/ip-camera/${url}`);
            return (
              <Link
                key={index}
                to={`${rootPath}/ip-camera?url=${url}`}
                // to={`${rootPath}/ip-camera?url=${el.url}&location=${el.location_id}`}
                className="col-lg-4 mx-0 px-0"
              >
                <img
                  style={props.styleDisplay}
                  src={el.url}
                  className="img-fluid camera-box"
                  alt={el.name}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CameraIP;
