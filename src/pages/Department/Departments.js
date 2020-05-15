import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import rootPath from '../../configs/rootPath'
import axios from 'axios';
import http from '../../configs/http';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';

// import './Department.css';

export default class Department extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            departmentSeleted: []
        }
    }

    componentDidMount() {
        this.fetchDepartments();
    }



    fetchDepartments = async () => {
        const rp = await axios.get(`${http}/api/v1/departments`);
        const { data } = rp.data;
        if (data) {
            this.setState({
                departments: data
            })
        }
    }


    handlerDelete = async () => {
        const rp = await axios.post(`${http}/api/v1/departments/deletes`, {
            ids: this.state.departmentSeleted
        }).catch(err => {
            // console.log(err.message);
        });

        if (!rp.data.error) {
            this.setState({
                departmentSeleted: []
            });
            this.fetchDepartments();
        } else {
            alert('ไม่สามารถลบข้อมูลที่มีการใช้งานอยู่ได้');
        }

        // console.log(this.state.dataSeleted)
    }

    updateRowDepartment = async (row) => {
        await axios.put(`${http}/api/v1/departments/update/${row.id}`, {
            department: row
        });

        // console.log(rp);
        this.fetchDepartments();
    }


    render() {
        const cellEdit = cellEditFactory({
            mode: 'click',
            afterSaveCell: (oldValue, newValue, row, column) => {
                // console.log(row);
                this.updateRowDepartment(row);
            }
        });
        const selectRow = {
            mode: 'checkbox',
            onSelect: (row, isSelect, rowIndex, e) => {
                new Promise((resolve, reject) => {
                    if (!this.state.departmentSeleted.includes(row.id)) {
                        this.setState({
                            departmentSeleted: this.state.departmentSeleted.concat(row.id)
                        });
                    } else {
                        let departmentSeletedIndex = this.state.departmentSeleted.findIndex(user => {
                            return user === row.id;
                        });

                        let newDepartmentSelected = this.state.departmentSeleted;
                        newDepartmentSelected.splice(departmentSeletedIndex, 1);
                        this.setState({
                            departmentSeleted: newDepartmentSelected
                        });
                    }
                    return resolve();
                }).then(() => {
                    // console.log(this.state.departmentSeleted)
                });
            },
            onSelectAll: (isSelect, rows, e) => {
                new Promise((resolve, reject) => {
                    let rowsIds = [];
                    for (let i in rows) {
                        rowsIds.push(rows[i].id);
                    }
                    if (isSelect) {
                        this.setState({
                            departmentSeleted: rowsIds
                        });
                    } else {
                        this.setState({
                            departmentSeleted: []
                        });
                    }
                    return resolve();
                }).then(() => {
                    // console.log(this.state.departmentSeleted)
                });
            },
            style: { background: 'darkgreen' }
        };

        const columns = [{
            dataField: 'id',
            text: 'ID'
        }, {
            dataField: 'department',
            text: 'หน่วยงาน',
            filter: textFilter()
        }, {
            dataField: 'building_code',
            text: 'ตัวย่อ',
            filter: textFilter()
        }];

        return (
            <div>
                <h2>Departments</h2>
                <Link to={`${rootPath}/departments/create`} className="btn btn-primary float-right">
                    <i className="fas fa-users nav-icon"></i> เพิ่มหน่วยงาน
                </Link>
                {this.state.departmentSeleted.length > 0 &&
                    <div>
                        <button className="btn btn-danger" onClick={this.handlerDelete}>Delete Selected ({this.state.departmentSeleted.length}) item</button>
                    </div>
                }

                <BootstrapTable
                    keyField='id'
                    data={this.state.departments}
                    columns={columns}
                    cellEdit={cellEdit}
                    pagination={paginationFactory()}
                    filter={filterFactory()}
                    striped
                    bordered={false}
                    selectRow={selectRow}
                />
            </div>
        )
    }
}
