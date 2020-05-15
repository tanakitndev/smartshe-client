import React, { Component } from "react";

import { Link } from "react-router-dom";

import axios from "axios";
import http from "../configs/http";
import rootPath from "../configs/rootPath";

export default class CameraIP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camera_ips: []
    };
  }

  componentDidMount() {
    this.getCameraFromApi();
  }

  getCameraFromApi = async () => {
    const res = await axios.get(`${http}/api/v1/camera_ips`);
    const data = res.data.data;
    this.setState({ camera_ips: data });
    // console.log(data);
  };

  render() {
    return (
      <div className="wrap-content">
        <div>
          <h4 className="mt-0">IP Camera List</h4>
          {this.state.camera_ips.map((el, index) => {
            let url = btoa(`${el.url}&location=${el.location_id}`);
            return (
              // <img key={index} style={this.props.styleDisplay} src={el.url} className="camera-display" alt={el.name} />
              // <Link key={index} to={`${rootPath}/ip-camera?url=${el.url.split('?')[0]}&location=${el.location_id}`} className="camera-display-container">
              //     <img style={this.props.styleDisplay} className="img-fluid" src={el.url} alt={el.name} />
              // </Link>
              <div key={index} className="align-items-center mb-3">
                {/* <Link to={`${rootPath}/ip-camera?url=${el.url.split('?')[0]}&location=${el.location_id}`}> */}
                <Link
                  to={`${rootPath}/ip-camera?url=${url}`}
                >
                  <img
                    width="100%"
                    className="border-video img-fluid"
                    src={el.url}
                    alt={el.name}
                  />
                </Link>
                <div className="pl-3">
                  <div className="video-title">Location: {el.name}</div>
                  {/* <div className="video-title">Location ID: {el.id}</div> */}
                </div>
              </div>
              // <div key={index} className="camera-display" style={this.props.styleDisplay}></div>
            );
          })}
        </div>
      </div>
    );
  }
}
