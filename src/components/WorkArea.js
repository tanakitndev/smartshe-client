import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faSearchLocation,
  faBox,
  faIdCardAlt,
  faVolumeUp,
  faSkullCrossbones,
  faTemperatureHigh
} from '@fortawesome/free-solid-svg-icons';

import { Table } from 'react-bootstrap';

// import axios from 'axios';
import http from '../configs/http';

import { connect } from 'react-redux'
import { setMarkers } from '../store/actions';

import socketIOClient from 'socket.io-client'
import axios from 'axios';

class WorkArea extends Component {


  constructor(props) {
    super(props);
    this.state = {
      showData: [],
      showDataNowFixed: [],
      isDataNowFixedExist: false,
      endpoint: "",
      envStandard: [],
      isBlink: false,
      isLoading: false
    }
  }

  componentWillMount() {
    this.setState({ endpoint: http })
  }

  async componentDidMount() {
    this.responseData();
    this.responseDataNow();

    this.fetchDataWorkArea();
    this.fetchDataWorkAreaMobile();

    this.fetchEnvStandard();
    setInterval(() => {
      this.setState({
        isBlink: !this.state.isBlink
      })
    }, 500);

    // const rp = await axios.get(`${http}/api/v1/dashboard/work_area/mobile`);
    // const { data } = rp.data;
    // this.setState({
    //   showData: data
    // })
  }


  // รอรับข้อมูลเมื่อ server มีการ update
  // http://localhost:5000/watch-sensors/test23333
  responseData = () => {
    this.setState({
      isLoading: true
    });
    const { endpoint } = this.state
    const socket = socketIOClient(endpoint)
    socket.on('dashboard_work_area', (data) => {
      // console.log('data:', data);
      if (data.length > 0) {
        this.setState({
          showData: data,
          isLoading: false
        });
      }
    });
  }

  fetchDataWorkArea = async () => {
    this.setState({
      isLoading: true
    });
    const rp = await axios.get(`${http}/api/v1/dashboard/work_area/fix`);
    const { data } = rp.data;
    if (data.length > 0) {
      this.setState({
        showData: data,
        isLoading: false
      });
    }
  }

  responseDataNow = () => {
    const { endpoint } = this.state
    const socket = socketIOClient(endpoint)
    socket.on('datanow', (data) => {
      // console.log('datanow:', data);
      if (data.length > 0) {
        this.setState({
          showDataNowFixed: data
        });
      }
    });
  }

  fetchDataWorkAreaMobile = async () => {
    const rp = await axios.get(`${http}/api/v1/dashboard/work_area/mobile`);
    const { data } = rp.data;
    if (data.length > 0) {
      this.setState({
        showDataNowFixed: data,
      });
      console.log(data);

    }

  }

  fetchEnvStandard = async () => {
    const rp = await axios.get(`${http}/api/v1/env_standard`);
    const { data } = rp.data;
    if (!rp.data.error) {
      // envStandard
      this.setState({
        envStandard: data
      });
      // console.log('env', data);
    }
  }

  checkEnvStd(type, value) {
    // let isDanger = '';
    const checkEnv = this.state.envStandard.find(el => {
      return el.env_type === type
    });
    if(value && checkEnv){
      // console.log(value, checkEnv.danger);
      return parseFloat(value) >= parseFloat(checkEnv.danger) ? 'text-light bg-danger danger' : '';
    }
  }

  render() {
    return (
      <div className="wrap-content">
        {this.state.isLoading &&
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
        <div className="table-responsive">
          <Table hover bordered size={this.props.size ? this.props.size : "sm"} className="table-work-area">
            <thead>
              <tr>
                {/* d-flex flex-column justify-content-center align-items-center */}
                <th>
                  <div className="th-work-area">
                    <FontAwesomeIcon icon={faSearchLocation} /> Location
                  </div>
                </th>
                <th>
                  <div className="th-work-area">
                    <FontAwesomeIcon icon={faBox} /> Box Sensor
                  </div>
                </th>
                <th>
                  <div className="th-work-area">
                    <FontAwesomeIcon icon={faIdCardAlt} /> JOB ID
                  </div>
                </th>
                <th>
                  <div className="th-work-area">
                    <FontAwesomeIcon icon={faCircle} /> SO2
                  </div>
                </th>
                <th>
                  <div className="th-work-area">
                    <FontAwesomeIcon icon={faTemperatureHigh} /> TEMP
                  </div>
                </th>
                <th>
                  <div className="th-work-area">
                    <FontAwesomeIcon icon={faCircle} /> O2
                  </div>
                </th>
                <th>
                  <div className="th-work-area">
                    <FontAwesomeIcon icon={faCircle} /> CO
                  </div>
                </th>
                <th>
                  <div className="th-work-area">
                    <FontAwesomeIcon icon={faVolumeUp} /> SOUND
                  </div>
                </th>
                <th>
                  <div className="th-work-area">
                    <FontAwesomeIcon icon={faCircle} /> Humidity
                  </div>
                </th>
                <th>
                  <div className="th-work-area">
                    <FontAwesomeIcon icon={faCircle} /> H2S
                  </div>
                </th>
                <th>
                  <div className="th-work-area">
                    <FontAwesomeIcon icon={faSkullCrossbones} /> %LEL
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.showDataNowFixed.length > 0 &&
                <>
                  {this.state.showDataNowFixed.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.location_name ? data.location_name : '-'}</td>
                        <td>{data.box_sensor >= 0 ? data.box_sensor : '-'}</td>
                        <td>{data.id}</td>
                        <td>{data.so2 >= 0 ? data.so2 : '-'}</td>
                        <td>{data.temp >= 0 ? data.temp : '-'}</td>
                        <td>{data.o2 >= 0 ? data.o2 : '-'}</td>
                        <td>{data.co >= 0 ? data.co : '-'}</td>
                        <td>{data.sound >= 0 ? data.sound : '-'}</td>
                        <td>{data.humid >= 0 ? data.humid : '-'}</td>
                        <td>{data.h2s >= 0 ? data.h2s : '-'}</td>
                        <td>{data.lel >= 0 ? data.lel : '-'}</td>
                      </tr>
                    )
                  })}
                </>
              }

              {this.state.showData &&
                <>
                  {this.state.showData.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-capitalize">{data.location.split('_').join(" ")}</td>
                        <td >{data.box_sensor}</td>
                        <td>-</td>
                        <td>{data.so2}</td>
                        <td className={this.state.isBlink ? this.checkEnvStd('temp', data.temp) : ""}>{data.temp}</td>
                        <td className={this.state.isBlink ? this.checkEnvStd('o2', data.o2) : ""}>{data.o2}</td>
                        <td className={this.state.isBlink ? this.checkEnvStd('co', data.co) : ""}>{data.co}</td>
                        <td className={this.state.isBlink ? this.checkEnvStd('sound', data.sound) : ""}>{data.sound}</td>
                        <td className={this.state.isBlink ? this.checkEnvStd('humid', data.humid) : ""}>{data.humid}</td>
                        <td>-</td>
                        <td className={this.state.isBlink ? this.checkEnvStd('lel', data.lel) : ""}>{data.lel}</td>
                      </tr>
                    )
                  })}
                </>
              }
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  markers: state.markers
})

const mapDispatchToProps = {
  setMarkers
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkArea);