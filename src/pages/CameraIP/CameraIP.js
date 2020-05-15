import React, { useState, useEffect } from "react";
import CameraIPListComponent from "../../components/CameraIPList";

import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function CameraIP() {
  const [fullUrl, setFullUrl] = useState("");
  let query = useQuery();

  useEffect(() => {
    const displayMamera = () => {
      let url = query.get("url");
      var res = encodeURI(url);
      let encodedFullUrl = atob(res);

      // console.log(encodedFullUrl);
      setFullUrl(encodedFullUrl);
    };
    displayMamera();
  }, [query]);

  const renderFullCamera = () => {
    if (query.get("url")) {
      return (
        <img
          style={{
            borderWidth: 1,
            borderColor: "white"
          }}
          src={`${fullUrl}`}
          className="camera-display-full"
          alt="test"
        />
      );
    }
    return <h1>No Camera Selected</h1>;
  };

  return (
    <div>
      <h4>IP CAMERA</h4>
      <div className="row">
        <div className="col-md-9">
          <div className="mb-5">{renderFullCamera()}</div>
        </div>
        <div className="col-md-3">
          <CameraIPListComponent />
        </div>
      </div>
    </div>
  );
}

export default CameraIP;
