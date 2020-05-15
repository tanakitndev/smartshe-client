import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import rootPath from '../../configs/rootPath';
import axios from 'axios';
import http from '../../configs/http';

import { withRouter } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import th from 'date-fns/locale/th';
registerLocale('th', th)

class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                env_type: '',
                warning: '',
                danger: ''
            },
            departments: [],
        }
    }

    componentDidMount() {
        this.fetchDepartments();
    }

    handlerSubmitCreateEnvStandard = async (e) => {
        e.preventDefault();
        const { warning, danger, env_type } = this.state.formData;

        if (env_type && warning && danger) {
            const rp = await axios.post(`${http}/api/v1/env_standard`, {
                ...this.state.formData
            }).catch(err => {
                console.log('err', err);
            });

            if (!rp.data.error) {
                this.props.history.goBack();
            }
        } else {
            alert("กรุณากรอกข้อมูลให้ครบ")
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

    setFormDataCertificateCheckList = (key) => {
        this.setState({
            formData: {
                ...this.state.formData,
                certificate_checklist: {
                    ...this.state.formData.certificate_checklist,
                    [key]: !this.state.formData.certificate_checklist[key]
                }
            }
        });
    }

    handleChangeCertificateAt = date => {
        this.setState({
            formData: {
                ...this.state.formData,
                certificate_at: date
            }
        });
    };


    fetchDepartments = async () => {
        const rp = await axios.get(`${http}/api/v1/master/departments`);
        const data = rp.data;
        if (!data.error) {
            this.setState({
                departments: data.data
            })
        }

    }

    render() {
        return (
            <div>
                <h4>เพิ่มบุคคล</h4>
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <form onSubmit={this.handlerSubmitCreateEnvStandard}>
                            <div className="form-group">
                                <label>Env Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.formData.env_type}
                                    onChange={(e) => this.setFormData(e, 'env_type')} />
                            </div>

                            <div className="form-group">
                                <label>Warning</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.formData.warning}
                                    onChange={(e) => this.setFormData(e, 'warning')} />
                            </div>

                            <div className="form-group">
                                <label>Danger</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.formData.danger}
                                    onChange={(e) => this.setFormData(e, 'danger')} />
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link to={`${rootPath}/setting-env`} className="btn btn-light ml-2">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Create);