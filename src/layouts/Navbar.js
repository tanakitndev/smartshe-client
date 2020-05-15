import React from "react";
import { Link, withRouter } from "react-router-dom";

// import { connect } from "react-redux";
import rootPath from "../configs/rootPath";

import { useSelector } from "react-redux";
import { server } from "../store/constants";

function Navbar(props) {
  const alarms = useSelector(state => state.alarms);
  const user = useSelector(state => state.user.data);

  const logout = async () => {
    await localStorage.removeItem(server.TOKEN_KEY);
    // props.history.push(`${rootPath}/login`);
    window.location = `${rootPath}/login`
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-dark">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="fake_url">
            <i className="fas fa-bars" />
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to={`${rootPath}/`} className="nav-link">
            Dashboard
          </Link>
        </li>
      </ul>

      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        <li className="nav-item d-none d-sm-inline-block">
          <button
            className="btn btn-transparent bg-dark"
            onClick={logout}
          >
            {user.username} ({user.n_approve}) Logout
          </button>
        </li>
        {alarms.length > 0 ? (
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="control-sidebar"
              data-slide="true"
              href="fake_url"
            >
              <i className="fas fa-bell"></i>{" "}
              <span className="badge badge-danger">{alarms.length}</span>
            </a>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

// const mapStateToProps = state => ({
//   alarms: state.alarms
// });

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
export default withRouter(Navbar);
