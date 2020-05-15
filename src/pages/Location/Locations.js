import React, { Component } from "react";
import { Link } from "react-router-dom";
import rootPath from "../../configs/rootPath";
import axios from "axios";
import http from "../../configs/http";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";

// import LocationEditModal from "./LocationEditModal";
import OwnersModal from "./OwnersModal";

// import './Department.css';

export default class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      locationsSeleted: [],
      departments: [],

      locationIdSeleted: null,
      showEditModal: false,
      showOwnersModal: false,

      locationSeleted: null,
      user_owners: [],
    };
  }

  componentDidMount() {
    this.fetchLocations();
    this.fetchDepartments();
  }

  fetchLocations = async () => {
    const rp = await axios.get(`${http}/api/v1/locations`);
    const { data } = rp.data;
    if (data) {
      this.setState({
        locations: data,
      });
    }
  };

  handlerDelete = async () => {
    const rp = await axios
      .post(`${http}/api/v1/locations/deletes`, {
        ids: this.state.locationsSeleted,
      })
      .catch((err) => {
        // console.log(err.message);
      });

    if (!rp.data.error) {
      this.setState({
        locationsSeleted: [],
      });
      this.fetchLocations();
    } else {
      alert("ไม่สามารถลบข้อมูลที่มีการใช้งานอยู่ได้");
    }

    // console.log(this.state.dataSeleted)
  };

  updateRowLocation = async (row) => {
    await axios.put(`${http}/api/v1/locations/update/${row.location_id}`, {
      department_id: row.department_id,
      user_owner_id: row.user_owner_id,
      department_name: row.department_name,
      location_name: row.location_name,
      building_code: row.building_code,
    });

    // console.log(rp);
    this.fetchLocations();
  };

  fetchDepartments = async () => {
    const rp = await axios.get(`${http}/api/v1/departments`);
    const { data } = rp.data;
    if (data) {
      let departmentOptions = [];
      data.forEach((dpm) => {
        departmentOptions.push({
          ...dpm,
          value: dpm.id,
          label: `${dpm.department} (${dpm.building_code})`,
        });
      });
      this.setState({
        departments: departmentOptions,
      });
    }
  };

  handleShowEditModal = (row) => {
    this.setState({
      locationSeleted: row,
      showEditModal: true,
    });
  };

  handleShowOwnersModal = (row) => {
    return new Promise((resolve, reject) => {
      this.setState({
        locationSeleted: row,
        showOwnersModal: true,
      });
      return resolve();
    }).then(() => {
      this.fetchAllUsersOwner();
    });
  };

  fetchAllUsersOwner = async () => {
    const rp = await axios.get(
      `${http}/api/v1/locations/users_owners/${this.state.locationSeleted?.location_name}`
    );
    const { error, data } = rp.data;
    if (!error) {
      this.setState({
        user_owners: data,
      });
    }
  };

  removeLocationById = async (location_id) => {
    console.log(location_id);

    const rp = await axios.get(
      `${http}/api/v1/locations/${location_id}/delete`
    );
    const { 
      error, 
      // message 
    } = rp.data;
    if(!error){
      this.fetchAllUsersOwner();
      this.fetchLocations();
    }
  };

  render() {
    const cellEdit = cellEditFactory({
      mode: "click",
      afterSaveCell: (oldValue, newValue, row, column) => {
        if (column.nonEditableRows) {
          this.fetchLocations();
          alert("ไม่สามารถแก้ไขตัวย่อได้");
        } else {
          // console.log(row);

          this.updateRowLocation(row);
        }
      },
    });
    // const selectRow = {
    //   mode: "checkbox",
    //   onSelect: (row, isSelect, rowIndex, e) => {
    //     new Promise((resolve, reject) => {
    //       if (!this.state.locationsSeleted.includes(row.location_id)) {
    //         this.setState({
    //           locationsSeleted: this.state.locationsSeleted.concat(
    //             row.location_id
    //           ),
    //         });
    //       } else {
    //         let locationsSeletedIndex = this.state.locationsSeleted.findIndex(
    //           (location) => {
    //             return location === row.location_id;
    //           }
    //         );

    //         let newDepartmentSelected = this.state.locationsSeleted;
    //         newDepartmentSelected.splice(locationsSeletedIndex, 1);
    //         this.setState({
    //           locationsSeleted: newDepartmentSelected,
    //         });
    //       }
    //       return resolve();
    //     }).then(() => {
    //       // console.log(this.state.locationsSeleted)
    //     });
    //   },
    //   onSelectAll: (isSelect, rows, e) => {
    //     new Promise((resolve, reject) => {
    //       let rowsIds = [];
    //       for (let i in rows) {
    //         rowsIds.push(rows[i].id);
    //       }
    //       if (isSelect) {
    //         this.setState({
    //           locationsSeleted: rowsIds,
    //         });
    //       } else {
    //         this.setState({
    //           locationsSeleted: [],
    //         });
    //       }
    //       return resolve();
    //     }).then(() => {
    //       // console.log(this.state.locationsSeleted)
    //     });
    //   },
    //   style: { background: "darkgreen" },
    // };

    const columns = [
      {
        dataField: "location_id",
        text: "ID",
      },
      {
        dataField: "user_owner_id",
        text: "เจ้าของพื้นที่",
        formatter: (cell, row) => {
          return (
            <button
              className="btn btn-primary btn-block btn-sm"
              // onClick={() => this.handleShowEditModal(row)}
              onClick={() => {
                this.handleShowOwnersModal(row);
              }}
            >
              {/* {row["displayname"]} */}
              <i className="fas fa-user"></i> เจ้าของพื้นที่
            </button>
          );
        },
        editable: false,
      },
      {
        dataField: "location_name",
        text: "พื้นที่",
        filter: textFilter(),
        editable: false,
      },
      {
        dataField: "department_name",
        text: "หน่วยงาน",
        filter: textFilter(),
        editor: {
          type: Type.SELECT,
          options: this.state.departments,
        },
      },
      {
        dataField: "building_code",
        text: "ตัวย่อ",
        filter: textFilter(),
        nonEditableRows: true,
        editable: false,
      },
      {
        dataField: "department_id",
        text: "หน่วยงาน",
        filter: textFilter(),
        hidden: true,
      },
    ];

    return (
      <div>
        <h2>Locations</h2>
        <Link
          to={`${rootPath}/locations/create`}
          className="btn btn-primary float-right"
        >
          <i className="fas fa-search-location" /> เพิ่มพื้นที่
        </Link>
        {this.state.locationsSeleted.length > 0 && (
          <div>
            <button className="btn btn-danger" onClick={this.handlerDelete}>
              Delete Selected ({this.state.locationsSeleted.length}) item
            </button>
          </div>
        )}

        <BootstrapTable
          keyField="location_id"
          data={this.state.locations}
          columns={columns}
          cellEdit={cellEdit}
          pagination={paginationFactory()}
          filter={filterFactory()}
          striped
          bordered={false}
          // selectRow={selectRow}
        />

        {/* <LocationEditModal
          show={this.state.showEditModal}
          title="แก้ไขเจ้าของพื้นที่"
          onHide={() => this.setState({ showEditModal: false })}
          onSave={(data) => {
            // console.log(data);
            this.updateRowLocation({
              ...this.state.locationSeleted,
              user_owner_id: data.id,
            });
            this.setState({ showEditModal: false });
          }}
        /> */}

        <OwnersModal
          show={this.state.showOwnersModal}
          data={this.state.user_owners}
          title="รายชื่อเจ้าของพื้นที่"
          onHide={() => this.setState({ showOwnersModal: false })}
          locationSeleted={this.state.locationSeleted}
          onClickRemove={(id) => {
            this.removeLocationById(id);
          }}
        />
      </div>
    );
  }
}
