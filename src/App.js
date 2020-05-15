import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";

import Layout from "./layouts/Layout";

import Home from "./pages/Home/Home";
import SettingEnvironment from "./pages/SettingEnvironment/SettingEnvironment";
import SettingEnvironmentCreate from "./pages/SettingEnvironment/Create";
import MapFactory from "./pages/MapFactory/MapFactory";

import rootPath from "./configs/rootPath";

import { connect } from "react-redux";
import { setAlarmData, setVisibleAlarms } from "./store/actions";

import socketIOClient from "socket.io-client";

import ReportChart from "./pages/ReportChart/ReportChart";
import JobList from "./pages/JobList/JobList";
import CameraIP from "./pages/CameraIP/CameraIP";
import Environments from "./pages/Environments/Environments";
import WorkArea from "./pages/WorkArea/WorkArea";

import LineNotify from "./pages/LineQRCode/LineNotify";
import http from "./configs/http";
import Users from "./pages/User/Users";
import Register from "./pages/User/Register";
import Persons from "./pages/Person/Persons";
import PersonCreate from "./pages/Person/Create";
import EmergencyContacts from "./pages/EmergencyContact/EmergencyContacts";
import CreateEmergencyContacts from "./pages/EmergencyContact/CreateEmergencyContacts";
import Departments from "./pages/Department/Departments";
import DepartmentCreate from "./pages/Department/Create";

import Login from "./pages/Auth/Login";
import Locations from "./pages/Location/Locations";
import LocationCreate from "./pages/Location/Create";

import * as loginActions from "./store/actions/login.action";
import { getUserInfo } from "./store/actions/user.action";
import ReportWorkPermit from "./pages/ReportWorkPermit/ReportWorkPermit";
import WorkPermitHistory from "./pages/ReportWorkPermit/WorkPermitHistory";

// import axios from "axios";
// import { server } from "./store/constants";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      endpoint: "", // เชื่อมต่อไปยัง url ของ realtime server
      isAuth: true,
      isAdmin: true,
    };
  }
  componentWillMount() {
    this.setState({ endpoint: http });
  }
  // <a class="nav-link" data-widget="control-sidebar" href="#">Toggle Control Sidebar</a>
  // document.body.classList.add("control-sidebar-slide-open");
  componentDidMount() {
    // localStorage.removeItem('myValueInLocalStorage')

    if (this.state.isAuth) {
      this.response();
      this.responseEnv();
    }

    this.props.getUserInfo();
    // console.log("this.props.userInfo", this.props.user);
  }

  getTokenFromLocalStorage = async () => {
    try {
      const token = await localStorage.setItem("token", "gg");
      if (token) {
        this.setState({
          isAuth: true,
        });
      }
    } catch (error) {}
  };

  // // เมื่อมีการส่งข้อมูลไปยัง server
  // send = (message) => {
  //   const { endpoint } = this.state
  //   const socket = socketIOClient(endpoint)
  //   socket.emit('sent-message', message)
  //   // this.setState({ input: '' })
  // }

  // รอรับข้อมูลเมื่อ server มีการ update
  // http://localhost:5000/watch-sensors/test23333
  response = () => {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("receiveAlarm", (messageAlarm) => {
      this.setMessageAlarm(messageAlarm)
        .then(() => this.props.setAlarmData(this.state.message))
        .then(() => {
          if (this.props.alarms.length > 0) {
            this.props.setVisibleAlarms(true);
            document.body.classList.add("control-sidebar-slide-open");
          } else {
            this.props.setVisibleAlarms(false);
          }
        });
      console.log("message:", messageAlarm);
    });
  };

  responseEnv = () => {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("detected_env", (message) => {
      console.log("detected_env:", message);
    });
  };

  setMessageAlarm = (messageAlarm) => {
    return new Promise((resolve, reject) => {
      // let decodeMessage = messageAlarm.replace(/_/g, '/');
      // decodeMessage = decodeMessage.replace(/!/g, '?')

      // let editLinkMessage = decodeMessage.split(',');
      // // editLinkMessage[0] += `\n<a href="${editLinkMessage[1]}">See Camera</a>`
      // editLinkMessage.splice(1, 1);
      this.setState({
        message: this.state.message.concat(messageAlarm),
      });
      resolve();
    });
  };

  // fetchUserInfomation = async () => {
  //   const token = localStorage.getItem(server.TOKEN_KEY);
  //   const rp = await axios.post(`${http}/api/v1/auth/profile`, null, {
  //     headers: {
  //       "x-access-token": token
  //     }
  //   });
  //   const { error, data } = rp.data;
  //   console.log("error", error);
  //   console.log("user", data);
  // };

  render() {
    return (
      <Switch>
        <LoginRoute path={`${rootPath}/login`} component={Login} />

        <Layout>
          <AuthRoute exact path={`${rootPath}/`} component={Home} />
          <AuthRoute
            path={`${rootPath}/report-chart`}
            component={ReportChart}
          />
          <AuthRoute
            exact
            path={`${rootPath}/report-work-permit`}
            component={WorkPermitHistory}
          />
          <AuthRoute
            path={`${rootPath}/report-work-permit/:work_permit_id`}
            component={ReportWorkPermit}
          />
          <AuthRoute path={`${rootPath}/job-list`} component={JobList} />
          <AuthRoute path={`${rootPath}/ip-camera`} component={CameraIP} />
          <AuthRoute
            path={`${rootPath}/environments`}
            component={Environments}
          />
          <AuthRoute path={`${rootPath}/work-area`} component={WorkArea} />
          <AuthRoute
            exact
            path={`${rootPath}/setting-env`}
            component={SettingEnvironment}
          />
          <AuthRoute
            exact
            path={`${rootPath}/setting-env/create`}
            component={SettingEnvironmentCreate}
          />
          <AuthRoute path={`${rootPath}/map-factory`} component={MapFactory} />
          <AuthRoute path={`${rootPath}/line-notify`} component={LineNotify} />
          <AuthRoute exact path={`${rootPath}/users`} component={Users} />
          <AuthRoute path={`${rootPath}/users/register`} component={Register} />
          <AuthRoute exact path={`${rootPath}/persons`} component={Persons} />
          <AuthRoute
            path={`${rootPath}/persons/create`}
            component={PersonCreate}
          />
          <AuthRoute
            exact
            path={`${rootPath}/emergency-contacts`}
            component={EmergencyContacts}
          />
          <AuthRoute
            path={`${rootPath}/emergency-contacts/create`}
            component={CreateEmergencyContacts}
          />
          <AuthRoute
            exact
            path={`${rootPath}/departments`}
            component={Departments}
          />
          <AuthRoute
            path={`${rootPath}/departments/create`}
            component={DepartmentCreate}
          />
          <AuthRoute
            exact
            path={`${rootPath}/locations`}
            component={Locations}
          />
          <AuthRoute
            path={`${rootPath}/locations/create`}
            component={LocationCreate}
          />
        </Layout>
      </Switch>
    );
  }
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      // ternary condition
      loginActions.isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to={`${rootPath}/login`} />
      )
    }
  />
);

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      // ternary condition
      loginActions.isLoggedIn() ? (
        <Redirect to={`${rootPath}/`} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  alarms: state.alarms,
  visibleAlarms: state.visibleAlarms,
  user: state.user.data,
});

const mapDispatchToProps = {
  setAlarmData,
  setVisibleAlarms,
  getUserInfo,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
