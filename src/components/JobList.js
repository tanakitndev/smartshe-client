import React, { Component } from "react";

import axios from "axios";
import http from "../configs/http";

import { Table } from "react-bootstrap";

import socketIOClient from "socket.io-client";

export default class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList: [],
      endpoint: ""
    };
  }

  componentWillMount() {
    this.setState({ endpoint: http });
  }

  componentDidMount() {
    this.fetchWorkPermitActive();
    this.responseData();
  }

  responseData = () => {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("job-list", data => {
      if (data.length > 0) {
        this.setState({
          jobList: data
        });
      }
    });
  };

  fetchWorkPermitActive = async () => {
    const response = await axios.get(`${http}/api/v1/joblist`);
    const { data } = response.data;
    this.setState({
      jobList: data
    });
    // console.log('fetchWorkPermitActive', data);
    console.log("jobList", data);
  };

  renderPermitType(permit_enable) {
    let permit_trpe = JSON.parse(permit_enable);
    let str = "";
    let index = 0;
    for (let [key, value] of Object.entries(permit_trpe)) {
      if (value === true) {
        if (index === 0) {
          str = key;
        } else {
          str += `, ${key}`;
        }
        index = index + 1;
      }

      // console.log(`${key}: ${value}`);
    }
    return str;
  }
  render() {
    return (
      <div className="wrap-content">
        <div className="table-responsive">
          <Table hover size="sm" className="table-env">
            <thead>
              <tr>
                <th>ID</th>
                <th>วันที่ / เวลา</th>
                <th>สถานที่</th>
                <th>ประเภทงาน</th>
                <th>ผู้ปฏิบัติงาน</th>
              </tr>
            </thead>
            <tbody>
              {this.state.jobList.map((el, index) => {
                let date = new Date(el.created_at).getDate();
                let month = new Date(el.created_at).getMonth() + 1;
                let year = new Date(el.created_at).getFullYear();
                let hours = new Date(el.created_at).getHours();
                let minute = new Date(el.created_at).getMinutes() < 10 ? `0${new Date(el.created_at).getMinutes()}`: new Date(el.created_at).getMinutes();
                let showDatetime = `${date}/${month}/${year} ${hours}:${minute}`;
                return (
                  <tr key={index}>
                    <td>{el.id}</td>
                    <td>{showDatetime}</td>
                    <td>{el.location_name}</td>
                    <td>{this.renderPermitType(el.permit_enable)}</td>
                    <td>{el.username}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {this.state.jobList.length === 0 && (
            <div className="d-flex justify-content-center">
              ไม่พบข้อมูลการทำงาน
            </div>
          )}
        </div>
      </div>
    );
  }
}
