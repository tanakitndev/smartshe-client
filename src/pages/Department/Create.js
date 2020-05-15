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
                department: '',
                building_code: ''
            },
        }
    }

    componentDidMount() {
        // this.fetchDepartments();
    }

    handlerSubmitCreate = async (e) => {
        e.preventDefault();
        const { department, building_code } = this.state.formData;

        if (department && building_code) {
            const rp = await axios.post(`${http}/api/v1/departments`, {
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

    render() {
        return (
            <div>
                <h4>เพิ่มหน่วยงาน</h4>
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <form onSubmit={this.handlerSubmitCreate}>
                            <div className="form-group">
                                <label>หน่วยงาน</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.formData.department}
                                    onChange={(e) => this.setFormData(e, 'department')} />
                            </div>

                            <div className="form-group">
                                <label>ตัวย่อ</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.formData.building_code}
                                    onChange={(e) => this.setFormData(e, 'building_code')} />
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link to={`${rootPath}/departments`} className="btn btn-light ml-2">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Create);