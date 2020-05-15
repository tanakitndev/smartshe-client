import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import rootPath from '../../configs/rootPath'
import axios from 'axios';
import http from '../../configs/http';

import { withRouter } from "react-router-dom";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                username: '',
                password: '',
                confirm_password: '',
                displayname: '',
                right1: '',
                right2: ''
            },
            roles: [],

            modePassword: {
                showPassword: false,
                showConfirmPassword: false
            }
        }
    }

    componentDidMount() {
        this.fetchMasterRole();
    }

    handlerSubmitRegisterForm = async (e) => {
        e.preventDefault();
        const rp = await axios.post(`${http}/api/v1/auth/users`, {
            ...this.state.formData
        });
        const data = rp.data;
        if (!data.error) {
            // set state
            this.props.history.goBack();
        } else {
            alert(data.message)
        }
    }

    fetchMasterRole = async () => {
        const rp = await axios.get(`${http}/api/v1/auth/roles`);
        const data = rp.data;
        if (!data.error) {
            this.setState({
                roles: data.data
            })
        }
    }

    setFormData = (e, key) => {
        this.setState({
            formData: {
                ...this.state.formData,
                [key]: e.target.value
            }
        });
    }

    toggleModePassword = (key) => {
        this.setState({
            modePassword: {
                ...this.state.modePassword,
                [key]: !this.state.modePassword[key]
            }
        })
    }

    render() {
        return (
            <div>
                <h4>ลงทะเบียนสมาชิก</h4>
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <form onSubmit={this.handlerSubmitRegisterForm} >
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.formData.username}
                                    onChange={(e) => this.setFormData(e, 'username')} />
                            </div>
                            <div className="form-group">
                                <label>Display Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.formData.displayname}
                                    onChange={(e) => this.setFormData(e, 'displayname')} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type={!this.state.modePassword.showPassword ? "password" : "text"}
                                    className="form-control"
                                    value={this.state.formData.password}
                                    onChange={(e) => this.setFormData(e, 'password')} />
                                <button className="btn btn-primary btn-sm" type="button" onClick={() => this.toggleModePassword('showPassword')}>
                                    {this.state.modePassword.showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}

                                </button>
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input
                                    type={!this.state.modePassword.showConfirmPassword ? "password" : "text"}
                                    className="form-control"
                                    value={this.state.formData.confirm_password}
                                    onChange={(e) => this.setFormData(e, 'confirm_password')} />
                                <button className="btn btn-primary btn-sm" type="button" onClick={() => this.toggleModePassword('showConfirmPassword')}>
                                    {this.state.modePassword.showConfirmPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                                </button>
                            </div>
                            <div className="form-group">
                                <label>Role</label>
                                <select className="form-control" onChange={(e) => this.setFormData(e, 'right1')}>
                                    <option value="">-- Select Role --</option>
                                    {this.state.roles.map((role, index) => {
                                        return (
                                            <option key={index} value={role.sign_right}>{role.w_right}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link to={`${rootPath}/users`} className="btn btn-light ml-2">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(Register);