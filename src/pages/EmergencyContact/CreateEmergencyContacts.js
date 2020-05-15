import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import rootPath from '../../configs/rootPath'
import axios from 'axios';
import http from '../../configs/http';

export default withRouter(class EmergencyContacts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                name: '',
                telephone: '',
                position_id: ''
            },
            positions: []
        }
    }

    componentDidMount() {
        this.fetchPositions();
    }

    handlerSubmitCreateEmergencyContacts = async (e) => {
        e.preventDefault();
        const { name, telephone, position_id } = this.state.formData;
        if (name && telephone && position_id) {
            const rp = await axios.post(`${http}/api/v1/emergency_contacts`, {
                ...this.state.formData
            }).catch(err => {
                alert(err.message)
            });

            if (!rp.data.err) {
                console.log(rp.data);
                this.props.history.goBack();
            } else {
                alert(rp.data.message);
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

    fetchPositions = async () => {
        const rp = await axios.get(`${http}/api/v1/positions`);
        const data = rp.data;
        if (!data.error) {
            this.setState({
                positions: data.data
            })
        }

    }


    render() {

        return (
            <div>
                <h4>เพิ่มรายชื่อติดต่อฉุกเฉิน</h4>
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <form onSubmit={this.handlerSubmitCreateEmergencyContacts}>
                            <div className="form-group">
                                <label>ชื่อ</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.formData.name}
                                    onChange={(e) => this.setFormData(e, 'name')} />
                            </div>

                            <div className="form-group">
                                <label>เบอร์โทร</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.formData.telephone}
                                    onChange={(e) => this.setFormData(e, 'telephone')} />
                            </div>

                            <div className="form-group">
                                <label>ตำแหน่ง</label>
                                <select className="form-control" onChange={(e) => this.setFormData(e, 'position_id')}>
                                    <option value="">-- Select Position --</option>
                                    {this.state.positions.map((position, index) => {
                                        return (
                                            <option key={index} value={position.id}>{position.name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            {/* <div className="form-group">
                                <label>ตำแหน่ง</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.formData.position}
                                    onChange={(e) => this.setFormData(e, 'position')} />
                            </div> */}

                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link to={`${rootPath}/emergency-contacts`} className="btn btn-light ml-2">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});
