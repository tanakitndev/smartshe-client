import React, { Component } from "react";
import rootPath from "../../configs/rootPath";
import { withRouter, Link } from "react-router-dom";

import "./Login.css";

import logo from "../../assets/images/logo.png";
import http from "../../configs/http";
import axios from "axios";
import { server } from "../../store/constants";

import { getUserInfo } from "../../store/actions/user.action";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  componentWillMount() {
    document.body.classList.remove("sidebar-mini");
    document.body.classList.add("login-page");
    document.body.classList.add("hold-transition");
  }

  componentWillUnmount() {
    document.body.classList.add("sidebar-mini");
    document.body.classList.remove("hold-transition");
    document.body.classList.remove("login-page");
  }

  login = async () => {
    const rp = await axios.post(`${http}/api/v1/auth/login`, {
      username: this.state.username,
      password: this.state.password
    });
    const data = rp.data;
    if (!data.error && data.token) {
      localStorage.setItem(server.TOKEN_KEY, data.token);
      this.props.history.push(`${rootPath}/`);
      this.props.getUserInfo();
    } else {
      localStorage.removeItem(server.TOKEN_KEY);
      alert(data.message);
    }
    console.log(data);
  };

  render() {
    return (
      <div className="login-box">
        <div className="login-logo">
          <img src={logo} alt="" width="50" height="50" />
          <Link to={`${rootPath}/`}>
            <b>Smart</b> Work Permit
          </Link>
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form onSubmit={e => e.preventDefault()} method="post">
              <div className="input-group mb-3">
                <input
                  type="username"
                  className="form-control"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={this.login}
                  className="btn btn-primary btn-block"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
          {/* /.login-card-body */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  getUserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
