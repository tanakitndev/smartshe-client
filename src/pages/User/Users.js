import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import rootPath from '../../configs/rootPath'
import axios from 'axios';
import http from '../../configs/http';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
// import cellEditFactory from 'react-bootstrap-table2-editor';

import './User.css';

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            usersSelected: []
        }
    }

    componentDidMount() {
        this.fetchUsers();
    }



    fetchUsers = async () => {
        const rp = await axios.get(`${http}/api/v1/auth/users`);
        const { data } = rp.data;
        this.setState({
            users: data
        })
        // console.log(data);
    }


    handlerDelete = async () => {
        await axios.post(`${http}/api/v1/auth/users/deletes`, {
            ids: this.state.usersSelected
        }).catch(err => {
            // console.log(err.message);
        });

        this.setState({
            usersSeleted: []
        });
        this.fetchUsers();
        // console.log(this.state.usersSeleted)
    }


    render() {

        const selectRow = {
            mode: 'checkbox',
            onSelect: (row, isSelect, rowIndex, e) => {
                new Promise((resolve, reject) => {
                    if (!this.state.usersSelected.includes(row.id)) {
                        this.setState({
                            usersSelected: this.state.usersSelected.concat(row.id)
                        });
                    } else {
                        let usersSelectedIndex = this.state.usersSelected.findIndex(user => {
                            return user === row.id;
                        });

                        let newUsersSelected = this.state.usersSelected;
                        newUsersSelected.splice(usersSelectedIndex, 1);
                        this.setState({
                            usersSelected: newUsersSelected
                        });
                    }
                    return resolve();
                }).then(() => {
                    // console.log(this.state.usersSelected)
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
                            usersSelected: rowsIds
                        });
                    } else {
                        this.setState({
                            usersSelected: []
                        });
                    }
                    return resolve();
                }).then(() => {
                    // console.log(this.state.usersSelected)
                });
            },
            style: { background: 'darkgreen' }
        };

        const columns = [{
            dataField: 'id',
            text: 'User ID'
        }, {
            dataField: 'username',
            text: 'Username',
            filter: textFilter()
        }, {
            dataField: 'n_approve',
            text: 'Role'
        }];

        return (
            <div>
                <h2>Users</h2>
                <Link to={`${rootPath}/users/register`} className="btn btn-primary float-right">
                    <i className="fas fa-users nav-icon"></i> ลงทะเบียน
                </Link>
                {this.state.usersSelected.length > 0 &&
                    <div>
                        <button className="btn btn-danger" onClick={this.handlerDelete}>Delete Selected ({this.state.usersSelected.length}) item</button>
                    </div>
                }

                <BootstrapTable
                    keyField='id'
                    data={this.state.users}
                    columns={columns}
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
