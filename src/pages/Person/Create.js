import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import rootPath from '../../configs/rootPath';
import axios from 'axios';
import http from '../../configs/http';

import { withRouter } from "react-router-dom";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import th from 'date-fns/locale/th';
registerLocale('th', th)

class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                name: '',
                first_name: '',
                last_name: '',
                phone_no: '',
                position: '',
                certificate_no: '',
                certificate_checklist: {
                    is_approver: false,
                    is_conservator: false,
                    is_performer: false,
                    is_helper: false
                },
                certificate_at: new Date()
            },
            departments: [],
        }
    }

    componentDidMount() {
        this.fetchDepartments();
    }

    handlerSubmitCreatePerson = async (e) => {
        e.preventDefault();
        const { first_name, last_name, phone_no, position, certificate_no, certificate_at, certificate_checklist: { is_approver, is_conservator, is_performer, is_helper } } = this.state.formData;

        if (first_name && last_name && phone_no && position && certificate_no && certificate_at && (is_approver || is_conservator || is_performer || is_helper)) {
            const rp = await axios.post(`${http}/api/v1/persons`, {
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
                        <form onSubmit={this.handlerSubmitCreatePerson}>
                            <div className="form-group">
                                <label>ชื่อ</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.formData.first_name}
                                    onChange={(e) => this.setFormData(e, 'first_name')} />
                            </div>

                            <div className="form-group">
                                <label>นามสกุล</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.formData.last_name}
                                    onChange={(e) => this.setFormData(e, 'last_name')} />
                            </div>

                            <div className="form-group">
                                <label>เบอร์โทร</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.formData.phone_no}
                                    onChange={(e) => this.setFormData(e, 'phone_no')} />
                            </div>

                            <div className="form-group">
                                <label>หน่วยงาน</label>
                                <select className="form-control" onChange={(e) => this.setFormData(e, 'position')}>
                                    <option value="">-- Select Department --</option>
                                    {this.state.departments.map((department, index) => {
                                        return (
                                            <option key={index} value={department.department}>{department.department}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>ผ่านการฝึกอบรม</label>

                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="is_approver"
                                        value={this.state.formData.certificate_checklist.is_approver}
                                        onChange={(e) => this.setFormDataCertificateCheckList('is_approver')}
                                    />
                                    <label className="custom-control-label" htmlFor="is_approver">ผู้อนุมัติ</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="is_conservator"
                                        value={this.state.formData.certificate_checklist.is_conservator}
                                        onChange={(e) => this.setFormDataCertificateCheckList('is_conservator')}
                                    />
                                    <label className="custom-control-label" htmlFor="is_conservator">ผู้ควบคุม</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="is_helper"
                                        value={this.state.formData.certificate_checklist.is_helper}
                                        onChange={(e) => this.setFormDataCertificateCheckList('is_helper')}
                                    />
                                    <label className="custom-control-label" htmlFor="is_helper">ผู้ช่วยเหลือ</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="is_performer"
                                        value={this.state.formData.certificate_checklist.is_performer}
                                        onChange={(e) => this.setFormDataCertificateCheckList('is_performer')}
                                    />
                                    <label className="custom-control-label" htmlFor="is_performer">ผู้ปฏิบัติงาน</label>
                                </div>

                            </div>

                            <div className="form-group">
                                <label>รหัสใบขออนุญาต</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.formData.certificate_no}
                                    onChange={(e) => this.setFormData(e, 'certificate_no')} />
                            </div>

                            <div className="form-group">
                                <label>วันที่ผ่านอบรม: </label>
                                <DatePicker
                                    selected={this.state.formData.certificate_at}
                                    onChange={this.handleChangeCertificateAt}
                                    locale="th"
                                    className="form-control"
                                />
                                {/* <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.formData.certificate_at}
                                    onChange={(e) => this.setFormData(e, 'certificate_at')} /> */}
                            </div>



                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link to={`${rootPath}/persons`} className="btn btn-light ml-2">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Create);