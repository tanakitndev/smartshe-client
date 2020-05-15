import React, { Component } from 'react'

import { Table } from 'react-bootstrap';

// import axios from 'axios';
import http from '../configs/http';

import socketIOClient from 'socket.io-client'
import axios from 'axios';

export default class Environments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showData: [],
            endpoint: "",
            isLoading: false
        }
    }

    componentWillMount() {
        this.setState({ endpoint: http });
    }

    componentDidMount() {
        // this.fetchData();
        this.fetchDataEnv();
        this.response();
    }

    // รอรับข้อมูลเมื่อ server มีการ update
    // http://localhost:5000/watch-sensors/test23333
    response = () => {
        this.setState({
            isLoading: true
        });
        const { endpoint } = this.state
        const socket = socketIOClient(endpoint)
        socket.on('dashboard_env', (data) => {
            // console.log('dashboard_env:', data);
            if (data) {
                this.setState({
                    showData: data,
                    isLoading: false
                });
            }
        });
    }


    fetchDataEnv = async () => {
        this.setState({
            isLoading: true
        });
        const rp = await axios.get(`${http}/api/v1/dashboard/environments/env`);
        const { data } = rp.data;
        if (data.length > 0) {
            console.log(data);
            
            this.setState({
                showData: data,
                isLoading: false
            });
        }
    }



    render() {
        return (
            <div>
                {this.state.isLoading &&
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                }
                <div className="table-responsive">
                    <Table hover bordered size={this.props.size ? this.props.size : "sm"} className="table-env">
                        <thead>
                            <tr>
                                <th>Location</th>
                                <th>PM2.5</th>
                                <th>CO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.showData.map((env, index) => {
                                let showData;
                                if (env.dust  !== 'null' || env.co  !== 'null') {
                                    showData = (
                                        <tr key={index}>
                                            <td className="text-capitalize">{env.location}</td>
                                            <td>{env.dust}</td>
                                            <td>{env.co}</td>
                                        </tr>
                                    )
                                }
                                return showData;
                            })}
                        </tbody>
                    </Table>
                </div>

                <h4>Waste Water</h4>
                <div className="table-responsive">
                    <Table hover bordered size={this.props.size ? this.props.size : "sm"} className="table-env">
                        <thead>
                            <tr>
                                <th>Location</th>
                                <th>PH</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.showData.map((env, index) => {
                                let showData;
                                if (env.ph !== 'null') {
                                    showData = (
                                        <tr key={index}>
                                            <td className="text-capitalize">{env.location}</td>
                                            <td>{env.ph}</td>
                                        </tr>
                                    )
                                }
                                return showData;
                            })}
                        </tbody>
                    </Table>
                </div>

            </div>
        )
    }
}
