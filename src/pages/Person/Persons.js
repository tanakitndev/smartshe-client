import React, { Component } from "react";
import { Link } from "react-router-dom";
import rootPath from "../../configs/rootPath";
import axios from "axios";
import http from "../../configs/http";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import cellEditFactory from "react-bootstrap-table2-editor";

export default class Persons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      personsSelected: []
    };
  }

  componentDidMount() {
    this.fetchPersons();
  }

  fetchPersons = async () => {
    const rp = await axios.get(`${http}/api/v1/persons`);
    const { data } = rp.data;
    if (!rp.data.error) {
      this.setState({
        persons: data
      });
      // console.log("data", data);
    }
  };

  handlerDelete = async () => {
    await axios
      .post(`${http}/api/v1/persons/deletes`, {
        ids: this.state.personsSelected
      })
      .catch(err => {
        // console.log(err.message);
      });
    this.setState({
      personsSelected: []
    });
    this.fetchPersons();
    // console.log(this.state.personsSelected)
  };


  handlerResetSelected = () => {
    new Promise((resolve, reject) => {
      this.setState({
        personsSelected: []
      });
      resolve();
    }).then(() => {
      // console.log(this.state.personsSelected)
    });
  };

  updateRowPerson = async person => {
     await axios.put(`${http}/api/v1/persons/update/${person.id}`, {
      person
    });
    this.fetchPersons();
    // console.log('person',person);
  };

  render() {
    const columns = [
      {
        dataField: "id",
        text: "ID"
      },
      {
        dataField: "first_name",
        text: "ชื่อ",
        filter: textFilter()
      },
      {
        dataField: "last_name",
        text: "นายสกุล",
        filter: textFilter()
      },
      {
        dataField: "is_approver",
        text: "อนุมัติ",
        // editable: false,
        formatter: (cell, row) =>
          row["is_approver"] === "1" ? (
            <i style={{ color: "lightgreen" }} className="fas fa-check"></i>
          ) : (
            <i className="fas fa-times text-danger"></i>
          )
        // filter: textFilter()
      },
      {
        dataField: "is_conservator",
        text: "ควบคุม",
        // editable: false,
        formatter: (cell, row) =>
          row["is_conservator"] === "1" ? (
            <i style={{ color: "lightgreen" }} className="fas fa-check"></i>
          ) : (
            <i className="fas fa-times text-danger"></i>
          )
        // filter: textFilter()
      },
      {
        dataField: "is_performer",
        text: "ปฏิบัติ",
        // editable: false,
        formatter: (cell, row) =>
          row["is_performer"] === "1" ? (
            <i style={{ color: "lightgreen" }} className="fas fa-check"></i>
          ) : (
            <i className="fas fa-times text-danger"></i>
          )
        // filter: textFilter()
      },
      {
        dataField: "is_helper",
        text: "ช่วยเหลือ",
        // editable: false,
        formatter: (cell, row) =>
          row["is_helper"] === "1" ? (
            <i style={{ color: "lightgreen" }} className="fas fa-check"></i>
          ) : (
            <i className="fas fa-times text-danger"></i>
          )
        // filter: textFilter()
      },
      {
        dataField: "phone_no",
        text: "เบอร์โทร",
        filter: textFilter()
      },
      {
        dataField: "position",
        text: "ตำแหน่ง",
        filter: textFilter(),
        editable: false
      }
    ];

    const cellEdit = cellEditFactory({
      mode: "click",
      afterSaveCell: (oldValue, newValue, row, column) => {
        // console.log(row);
        if (column.nonEditableRows) {
          this.fetchPersons();
          alert("ไม่สามารถแก้ไขได้");
        } else {
          this.updateRowPerson(row);
        }
      }
    });

    const selectRow = {
      mode: "checkbox",
      onSelect: (row, isSelect, rowIndex, e) => {
        new Promise((resolve, reject) => {
          if (!this.state.personsSelected.includes(row.id)) {
            this.setState({
              personsSelected: this.state.personsSelected.concat(row.id)
            });
          } else {
            let personsSelectedIndex = this.state.personsSelected.findIndex(
              person => {
                return person === row.id;
              }
            );

            let newPersonsSelected = this.state.personsSelected;
            newPersonsSelected.splice(personsSelectedIndex, 1);
            this.setState({
              personsSelected: newPersonsSelected
            });
          }
          return resolve();
        }).then(() =>{
          // console.log(this.state.personsSelected)
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
              personsSelected: rowsIds
            });
          } else {
            this.setState({
              personsSelected: []
            });
          }
          return resolve();
        }).then(() => {
          // console.log(this.state.personsSelected)
        });
      },
      style: { background: "darkgreen" }
    };

    return (
      <div>
        <h2>Persons</h2>

        <Link
          to={`${rootPath}/persons/create`}
          className="btn btn-primary float-right"
        >
          <i className="fas fa-users nav-icon"></i> เพิ่มบุคคล
        </Link>

        <div
          style={{
            display: "flex"
          }}
        >
          {/* {this.state.personsSelected.length === 1 && (
            <div>
              <button
                className="btn btn-success"
                onClick={this.handlerEditSelected}
              >
                Edit Selected
              </button>
            </div>
          )} */}
          {this.state.personsSelected.length > 0 && (
            <div>
              <button className="btn btn-danger" onClick={this.handlerDelete}>
                Delete Selected ({this.state.personsSelected.length}) item
              </button>
            </div>
          )}
        </div>

        <div className="table-responsive">
          <BootstrapTable
            keyField="id"
            data={this.state.persons}
            columns={columns}
            pagination={paginationFactory()}
            filter={filterFactory()}
            cellEdit={cellEdit}
            selectRow={selectRow}
            striped
            bordered={false}
          />
        </div>
      </div>
    );
  }
}
