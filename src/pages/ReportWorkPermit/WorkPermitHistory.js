import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import rootPath from "../../configs/rootPath";
import Axios from "axios";
import http from "../../configs/http";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import 
filterFactory
// { textFilter } 
from "react-bootstrap-table2-filter";

const WorkPermitHistory = () => {
  // http://localhost:5000/api/v1/work_permit/history/354/all
  const [workPermitClosedAll, setWorkPermitClosedAll] = useState([]);

  useEffect(() => {
    const fetchWorkPermitClosedAll = async () => {
      const rp = await Axios.get(
        `${http}/api/v1/work_permit/history/closed/all`
      );
      const { error, data } = rp.data;
      if (!error) {
        let newData = data;
        newData.reverse();
        setWorkPermitClosedAll(newData);
      }
    };
    fetchWorkPermitClosedAll();
  }, []);

  const columns = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "area_floor",
      text: "Locations",
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, row) => {
        return (
          // <button
          //   className="btn btn-primary btn-sm"
          //   // onClick={() => this.handleShowEditModal(row)}
          //   onClick={() => {
          //     console.log(row);

          //   }}
          // >
          //   {/* {row["displayname"]} */}
          //   <i className="fas fa-eye"></i> View Report
          // </button>
          <Link
            to={`${rootPath}/report-work-permit/${row.id}`}
            className="btn btn-primary btn-sm"
          >
           <i className="fas fa-eye"></i> View Report
          </Link>
        );
      },
      editable: false,
    },
  ];

  // const selectRow = {
  //   mode: "checkbox",
  //   onSelect: (row, isSelect, rowIndex, e) => {
  //     new Promise((resolve, reject) => {
  //       if (!this.state.usersSelected.includes(row.id)) {
  //         this.setState({
  //           usersSelected: this.state.usersSelected.concat(row.id),
  //         });
  //       } else {
  //         let usersSelectedIndex = this.state.usersSelected.findIndex(
  //           (user) => {
  //             return user === row.id;
  //           }
  //         );

  //         let newUsersSelected = this.state.usersSelected;
  //         newUsersSelected.splice(usersSelectedIndex, 1);
  //         this.setState({
  //           usersSelected: newUsersSelected,
  //         });
  //       }
  //       return resolve();
  //     }).then(() => {
  //       // console.log(this.state.usersSelected)
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
  //           usersSelected: rowsIds,
  //         });
  //       } else {
  //         this.setState({
  //           usersSelected: [],
  //         });
  //       }
  //       return resolve();
  //     }).then(() => {
  //       // console.log(this.state.usersSelected)
  //     });
  //   },
  //   style: { background: "darkgreen" },
  // };

  return (
    <div className="pb-5">
      <h4>Work Permit History</h4>
      {/* <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>location</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {workPermitClosedAll.map((el, index) => {
            let permit_enable = JSON.parse(el.permit_enable);
            return (
              <tr key={index}>
                <td>{el.id}</td>
                <td>{el.area_floor}</td>
                <td>
                  <Link
                    to={`${rootPath}/report-work-permit/${el.id}`}
                    className="btn btn-success btn-sm mx-1"
                  >
                    View Report
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}

      <BootstrapTable
        keyField="id"
        data={workPermitClosedAll}
        columns={columns}
        pagination={paginationFactory()}
        filter={filterFactory()}
        striped
        bordered={false}
      />
    </div>
  );
};

export default WorkPermitHistory;
