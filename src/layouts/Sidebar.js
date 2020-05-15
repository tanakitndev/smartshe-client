import React, { Component } from 'react'

import {
    Link
} from "react-router-dom";

import logo from '../assets/images/logo.png';
import rootPath from '../configs/rootPath';

import { withRouter } from "react-router";

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pathname: ''
        }
    }

    componentDidMount() {
        const { location } = this.props;
        // console.log(location.pathname);
        this.setState({
            pathname: location.pathname
        })
    }

    checkActive = (currentPath) => {
        const { location } = this.props;
        const mainLink = location.pathname.split('/')[2];
        const parentCurrentLink = currentPath.split('/')[2];
        
        let className = '';
        if (parentCurrentLink === mainLink) {
            className = 'active'
        }
        return className;
    }


    render() {
        // const { location } = this.props;
        // console.log(location.pathname);
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <Link to={`${rootPath}/`} className="brand-link">
                    <img src={logo} alt="AdminLTE Logo" className="brand-image elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light text-uppercase">PTF Smart She</span>
                </Link>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column nav-child-indent" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item has-treeview menu-open">
                                <a href="fake_url" className={`nav-link`}>
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>
                                        Dashboard
                                        <i className="right fas fa-angle-left" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to={`${rootPath}/`} className={`nav-link ${this.checkActive(`${rootPath}/`)}`}>
                                            <i className="fas fa-home nav-icon"></i>
                                            <p>Home</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`${rootPath}/report-chart`} className={`nav-link ${this.checkActive(`${rootPath}/report-chart`)}`}>
                                            <i className="fas fa-chart-bar nav-icon"></i>
                                            <p>Report Chart</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`${rootPath}/report-work-permit`} className={`nav-link ${this.checkActive(`${rootPath}/report-work-permit`)}`}>
                                            <i className="fas fa-chart-bar nav-icon"></i>
                                            <p>Report Work Permit</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`${rootPath}/job-list`} className={`nav-link ${this.checkActive(`${rootPath}/job-list`)}`}>
                                            <i className="fas fa-list nav-icon"></i>
                                            <p>Job List</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`${rootPath}/ip-camera`} className={`nav-link ${this.checkActive(`${rootPath}/ip-camera`)}`}>
                                            <i className="fas fa-video nav-icon"></i>
                                            <p>IP Camera</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`${rootPath}/environments`} className={`nav-link ${this.checkActive(`${rootPath}/environments`)}`}>
                                            <i className="fab fa-envira nav-icon"></i>
                                            <p>Environments</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`${rootPath}/work-area`} className={`nav-link ${this.checkActive(`${rootPath}/work-area`)}`}>
                                            <i className="fas fa-people-carry nav-icon"></i>
                                            <p>Work Area</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`${rootPath}/map-factory`} className={`nav-link ${this.checkActive(`${rootPath}/map-factory`)}`}>
                                            <i className="fas fa-map-marked-alt nav-icon"></i>
                                            <p>Map Factory</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item has-treeview menu-open">
                                <a href="fake_url" className="nav-link">
                                    <i className="nav-icon fas fa-cogs" />
                                    <p>
                                        Setting
                                        <i className="right fas fa-angle-left" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to={`${rootPath}/line-notify`} className={`nav-link ${this.checkActive(`${rootPath}/line-notify`)}`}>
                                            <i className="fab fa-line nav-icon"></i>
                                            <p>Line Notify</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`${rootPath}/setting-env`} className={`nav-link ${this.checkActive(`${rootPath}/setting-env`)}`}>
                                            <i className="fas fa-cog nav-icon"></i>
                                            <p>กำหนดค่ามาตรฐาน</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`${rootPath}/users`} className={`nav-link ${this.checkActive(`${rootPath}/users`)}`}>
                                            <i className="fas fa-users nav-icon"></i>
                                            <p>ผู้ใช้งาน</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`${rootPath}/persons`} className={`nav-link ${this.checkActive(`${rootPath}/persons`)}`}>
                                            <i className="fas fa-users nav-icon"></i>
                                            <p>รายชื่อผู้ผ่านการฝึกอบรม</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`${rootPath}/emergency-contacts`} className={`nav-link ${this.checkActive(`${rootPath}/emergency-contacts`)}`}>
                                            <i className="fas fa-bolt nav-icon" />
                                            <p>การติดต่อฉุกเฉิน</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`${rootPath}/departments`} className={`nav-link ${this.checkActive(`${rootPath}/departments`)}`}>
                                            <i className="fas fa-building nav-icon" />
                                            <p>หน่วยงาน</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`${rootPath}/locations`} className={`nav-link ${this.checkActive(`${rootPath}/locations`)}`}>
                                            <i className="fas fa-search-location nav-icon" />
                                            <p>พื้นที่</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>
        )
    }
}

export default withRouter(Sidebar);