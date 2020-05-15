import React, { Component } from "react";
import { Link } from "react-router-dom";
import rootPath from "../../configs/rootPath";
import axios from "axios";
import http from "../../configs/http";

import { withRouter } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";

import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

import th from "date-fns/locale/th";
import MapFactoryMarker from "../../components/MapFactoryMarker";
registerLocale("th", th);

const ref = React.createRef();

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: "",
        lat: "",
        lng: "",
        department_id: "",
        user_owners: [],
        user_owner: {
          id: "",
          username: "",
          displayname: "",
        },
      },
      departments: [],
      users_owner: [],
      selected: [],

      marker: null,
    };
  }

  addUserOwners = () => {
    const { id, username, displayname } = this.state.formData.user_owner;
    if (id && username && displayname) {
      this.setState({
        formData: {
          ...this.state.formData,
          user_owners: this.state.formData.user_owners.concat({
            id,
            username,
            displayname,
          }),
          user_owner: {
            //clear form
            id: "",
            username: "",
            displayname: "",
          },
        },
      });
    }

    ref.current.clear();
  };

  componentDidMount() {
    this.fetchDepartments();
    this.fetchAllUsersOwner();
  }

  fetchDepartments = async () => {
    const rp = await axios.get(`${http}/api/v1/master/departments`);
    const data = rp.data;
    if (!data.error) {
      this.setState({
        departments: data.data,
      });
    }
  };

  fetchAllUsersOwner = async () => {
    const rp = await axios.get(`${http}/api/v1/locations/users_owner`);
    const data = rp.data;
    if (!data.error) {
      this.setState({
        users_owner: data.data,
      });
    }
  };

  handlerSubmitCreate = async (e) => {
    e.preventDefault();
    const { name, lat, lng, department_id, user_owners } = this.state.formData;

    if (name && lat && lng && department_id && user_owners.length) {
      console.log(this.state.formData);

      const rp = await axios
        .post(`${http}/api/v1/locations`, {
          ...this.state.formData,
        })
        .catch((err) => {
          console.log("err", err);
        });

      if (!rp.data.error) {
        this.props.history.goBack();
      }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบ");
    }
  };

  setFormData = (e, key) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [key]: e.target.value,
      },
    });
  };

  onClickMarker = (e) => {
    this.setState({
      formData: {
        ...this.state.formData,
        lat: e.latLng.lat().toString(),
        lng: e.latLng.lng().toString(),
      },
      marker: {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    });
    // console.log(e.latLng.lat(), e.latLng.lng());
  };

  render() {
    return (
      <div>
        <h4>เพิ่มสถานที่</h4>
        <div className="row">
          <div className="col-lg-8">
            <MapFactoryMarker
              coordinate={this.state.marker}
              onClick={this.onClickMarker}
            />
          </div>

          <div className="col-lg-4">
            <div className="row">
              <div className="col-md-12">
                <form onSubmit={this.handlerSubmitCreate}>
                  <div className="form-group">
                    <label>ชื่อสถานที่</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.formData.name}
                      onChange={(e) => this.setFormData(e, "name")}
                    />
                  </div>

                  <div className="form-group">
                    <label>Latitude</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.formData.lat}
                      readOnly
                      // onChange={(e) => this.setFormData(e, 'lat')}
                    />
                  </div>
                  <div className="form-group">
                    <label>Longitude</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.formData.lng}
                      readOnly
                      // onChange={(e) => this.setFormData(e, 'lng')}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <label>รายการเจ้าของพื้นที่</label>
                      <ul style={{ listStyle: "none" }}>
                        {this.state.formData.user_owners.map((el, index) => {
                          return (
                            <li key={index}>
                              {index + 1}. {el.displayname}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>เจ้าของพื้นที่</label>
                        <Typeahead
                          //   ref={(ref) => (this.typehead = ref)}
                          ref={ref}
                          id="dropdown-basic"
                          labelKey="displayname"
                          multiple={false}
                          options={this.state.users_owner}
                          placeholder="ค้นหารายชื่อ..."
                          onChange={(selected) => {
                            this.setState({ selected });
                            if (selected.length) {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  user_owner: selected[0],
                                },
                              });
                            } else {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  user_owner: {
                                    id: "",
                                    username: "",
                                    displayname: "",
                                  },
                                },
                              });
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={this.addUserOwners}
                        >
                          <i className="fas fa-plus"></i> เพิ่ม
                        </button>
                      </div>
                    </div>
                    <div className="col-md-6">
                      {this.state.formData.user_owner.id ? (
                        <div>
                          <label htmlFor="unknow">ข้อมูลเจ้าของพื้นที่</label>
                          <div className="form-group">
                            <label htmlFor="id">UserID</label>
                            <input
                              type="text"
                              className="form-control"
                              value={this.state.formData.user_owner.id}
                              readOnly
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                              type="text"
                              className="form-control"
                              value={this.state.formData.user_owner.username}
                              readOnly
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="displayname">Displayname</label>
                            <input
                              type="text"
                              className="form-control"
                              value={this.state.formData.user_owner.displayname}
                              readOnly
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="form-group">
                          <label htmlFor="unknow">ข้อมูลเจ้าของพื้นที่</label>
                          <div>ไม่พบข้อมูล</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>หน่วยงาน</label>
                    <select
                      className="form-control"
                      onChange={(e) => this.setFormData(e, "department_id")}
                    >
                      <option value="">-- Select Department --</option>
                      {this.state.departments.map((department, index) => {
                        return (
                          <option key={index} value={department.id}>
                            {department.department} ({department.building_code})
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <Link
                    to={`${rootPath}/locations`}
                    className="btn btn-light ml-2"
                  >
                    Cancel
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Create);
