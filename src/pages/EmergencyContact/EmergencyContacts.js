import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import rootPath from '../../configs/rootPath'
import axios from 'axios';
import http from '../../configs/http';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';

export default class EmergencyContacts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contactList: [],
            contactSelected: []
        }
    }

    componentDidMount() {
        this.fetchEmergencyContacts();
    }

    fetchEmergencyContacts = async () => {
        const rp = await axios.get(`${http}/api/v1/emergency_contacts`);
        const { data } = rp.data;
        if (!rp.data.error) {
            this.setState({
                contactList: data
            })
        }
    }

    handlerDelete = async () => {
        await axios.post(`${http}/api/v1/emergency_contacts/deletes`, {
            ids: this.state.contactSelected
        }).catch(err => {
            // console.log(err.message);
        });
        this.setState({
            contactSelected: []
        });
        this.fetchEmergencyContacts();
        // console.log(this.state.personsSelected)
    }

    updateRowEmergencyContacts = async (emergency_contacts) => {
        await axios.put(`${http}/api/v1/emergency_contacts/update/${emergency_contacts.id}`, {
            emergency_contacts
        });

        // console.log(rp);
        this.fetchEmergencyContacts();
    }

    render() {

        const columns = [{
            dataField: 'id',
            text: 'ID'
        }, {
            dataField: 'name',
            text: 'ชื่อ',
            filter: textFilter()
        }, {
            dataField: 'telephone',
            text: 'เบอร์โทร',
            filter: textFilter()
        }, {
            dataField: 'position_name',
            text: 'ตำแหน่ง',
            filter: textFilter(),
            nonEditableRows: true
        }];

        const cellEdit = cellEditFactory({
            mode: 'click',
            afterSaveCell: (oldValue, newValue, row, column) => {
                // console.log(row);
                if (column.nonEditableRows) {
                    this.fetchEmergencyContacts();
                    alert('ไม่สามารถแก้ไขตำแหน่งได้');
                } else {
                    this.updateRowEmergencyContacts(row);
                    // console.log(row);

                }
            }
        });

        const selectRow = {
            mode: 'checkbox',
            onSelect: (row, isSelect, rowIndex, e) => {

                new Promise((resolve, reject) => {
                    if (!this.state.contactSelected.includes(row.id)) {
                        this.setState({
                            contactSelected: this.state.contactSelected.concat(row.id)
                        });
                    } else {
                        let contactSelectedIndex = this.state.contactSelected.findIndex(person => {
                            return person === row.id;
                        });

                        let newContactsSelected = this.state.contactSelected;
                        newContactsSelected.splice(contactSelectedIndex, 1);
                        this.setState({
                            contactSelected: newContactsSelected
                        });
                    }
                    return resolve();
                }).then(() =>{
                    // console.log(this.state.contactSelected)
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
                            contactSelected: rowsIds
                        });
                    } else {
                        this.setState({
                            contactSelected: []
                        });
                    }
                    return resolve();
                }).then(() => {
                    // console.log(this.state.contactSelected)
                });
            },
            style: { background: 'darkgreen' }
        };

        return (
            <div>
                <h2>Emergency Contacts</h2>

                <Link to={`${rootPath}/emergency-contacts/create`} className="btn btn-primary float-right">
                    <i className="fas fa-users nav-icon"></i> เพิ่มรายชื่อติดต่อ
                        </Link>

                {this.state.contactSelected.length > 0 &&
                    <div>
                        <button className="btn btn-danger" onClick={this.handlerDelete}>Delete Selected ({this.state.contactSelected.length}) item</button>
                    </div>
                }

                <BootstrapTable
                    keyField='id'
                    data={this.state.contactList}
                    columns={columns}
                    pagination={paginationFactory()}
                    filter={filterFactory()}
                    cellEdit={cellEdit}
                    selectRow={selectRow}
                    striped
                    bordered={false}
                />
            </div>
        )
    }
}
