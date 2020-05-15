import React, { Component } from 'react'
// import { Table } from 'react-bootstrap';

import axios from 'axios';
import http from '../../configs/http';
// import ModalForm from './ModalForm';

import { Link } from 'react-router-dom'
import rootPath from '../../configs/rootPath'

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';

export default class SettingEnvironment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            envData: [],
            show: false,
            envSelected: {
                id: '',
                env_type: '',
                warning: '',
                danger: '',
                created_at: ''
            },
            environments: [],
            environmentsSeleted: [],
        }
    }

    // handleClose = () => {
    //     this.setState({
    //         show: false
    //     });
    // };

    // handleShow = (env) => {
    //     this.setState({
    //         show: true,
    //         envSelected: env
    //     });
    // };

    componentDidMount() {
        this.fetchEnvData();
    }

    fetchEnvData = async () => {
        const res = await axios.get(`${http}/api/v1/env_standard`);
        const { data } = res.data;
        // this.setState({
        //     envData: data
        // });
        if (data) {
            this.setState({
                environments: data
            });
        }

    }


    handlerDelete = async () => {
        const rp = await axios.post(`${http}/api/v1/env_standard/deletes`, {
            ids: this.state.environmentsSeleted
        }).catch(err => {
            // console.log(err.message);
        });

        if (!rp.data.error) {
            this.setState({
                environmentsSeleted: []
            });
            this.fetchEnvData();
        } else {
            alert('ไม่สามารถลบข้อมูลที่มีการใช้งานอยู่ได้');
        }

        // console.log(this.state.dataSeleted)
    }

    updateRowEnv = async (row) => {
        await axios.put(`${http}/api/v1/env_standard/update/${row.id}`, {
            env_type: row.env_type,
            warning: row.warning,
            danger: row.danger
        });
        // console.log(row);
        

        this.fetchEnvData();
    }

    saveChangeEnvData = async () => {
        const form = this.state.envSelected;
        const postForm = await axios.put(`${http}/api/v1/env_standard`, {
            id: form.id,
            env_type: form.env_type,
            warning: form.warning,
            danger: form.danger
        });
        if (postForm.data.success) {
            // console.log(postForm);
            this.fetchEnvData();
            this.handleClose();
        } else {
            // console.log('Error');
        }
    }

    render() {

        const cellEdit = cellEditFactory({
            mode: 'click',
            afterSaveCell: (oldValue, newValue, row, column) => {
                if (column.nonEditableRows) {
                    this.fetchEnvData();
                    alert('ไม่สามารถแก้ไขตัวย่อได้');
                } else {
                    // console.log(row);

                    this.updateRowEnv(row);
                }
            }
        });
        // const selectRow = {
        //     mode: 'checkbox',
        //     onSelect: (row, isSelect, rowIndex, e) => {
        //         new Promise((resolve, reject) => {
        //             if (!this.state.environmentsSeleted.includes(row.id)) {
        //                 this.setState({
        //                     environmentsSeleted: this.state.environmentsSeleted.concat(row.id)
        //                 });
        //             } else {
        //                 let environmentsSeletedIndex = this.state.environmentsSeleted.findIndex(location => {
        //                     return location === row.id;
        //                 });

        //                 let newEnvironmentsSeleted = this.state.environmentsSeleted;
        //                 newEnvironmentsSeleted.splice(environmentsSeletedIndex, 1);
        //                 this.setState({
        //                     environmentsSeleted: newEnvironmentsSeleted
        //                 });
        //             }
        //             return resolve();
        //         }).then(() => console.log(this.state.environmentsSeleted));
        //     },
        //     onSelectAll: (isSelect, rows, e) => {
        //         new Promise((resolve, reject) => {
        //             let rowsIds = [];
        //             for (let i in rows) {
        //                 rowsIds.push(rows[i].id);
        //             }
        //             if (isSelect) {
        //                 this.setState({
        //                     environmentsSeleted: rowsIds
        //                 });
        //             } else {
        //                 this.setState({
        //                     environmentsSeleted: []
        //                 });
        //             }
        //             return resolve();
        //         }).then(() => console.log(this.state.environmentsSeleted));
        //     },
        //     style: { background: 'darkgreen' }
        // };

        const columns = [{
            dataField: 'id',
            text: 'ID'
        }, {
            dataField: 'env_type',
            text: 'ENV Type',
            filter: textFilter(),
            editable: false
        }, {
            dataField: 'warning',
            text: 'Warning',
            filter: textFilter(),
        }, {
            dataField: 'danger',
            text: 'Danger',
            filter: textFilter(),
        }];
        return (
            <div>
                <h2>SettingEnvironment</h2>

                <Link to={`${rootPath}/setting-env/create`} className="btn btn-primary float-right">
                    <i className="fas fa-cog" /> เพิ่มค่ามาตรฐาน
                </Link>
                {this.state.environmentsSeleted.length > 0 &&
                    <div>
                        <button className="btn btn-danger" onClick={this.handlerDelete}>Delete Selected ({this.state.environmentsSeleted.length}) item</button>
                    </div>
                }

                <BootstrapTable
                    keyField='id'
                    data={this.state.environments}
                    columns={columns}
                    cellEdit={cellEdit}
                    pagination={paginationFactory()}
                    filter={filterFactory()}
                    striped
                    bordered={false}
                    // selectRow={selectRow}
                />
                {/* 
                <Table hover bordered className="table-env">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ENV Type</th>
                            <th>Warning</th>
                            <th>Danger</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.envData.map((env, index) => {
                            return (
                                <tr key={index}>
                                    <td>{env.id}</td>
                                    <td className="text-uppercase">{env.env_type}</td>
                                    <td>{env.warning}</td>
                                    <td>{env.danger}</td>
                                    <td>
                                        <button className="btn btn-light btn-sm" onClick={() => this.handleShow(env)}>แก้ไข</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

                <ModalForm
                    show={this.state.show}
                    data={this.state.envSelected}
                    onHide={this.handleClose}
                    onHandleClose={this.handleClose}
                    handleFormChange={(key, value) => {
                        this.setState({
                            envSelected: {
                                ...this.state.envSelected,
                                [key]: value
                            }
                        })
                    }}
                    submitForm={() => {
                        console.log(this.state.envSelected);
                        // Save Change
                        this.saveChangeEnvData();
                    }} /> */}
            </div>
        )
    }
}
