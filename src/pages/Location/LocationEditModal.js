import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import http from "../../configs/http";
import axios from "axios";

const LocationEditModal = props => {
  const [usersOwner, setUsersOwner] = useState([]);
  const [userOwnerSelected, setUserOwnerSelected] = useState([]);
  const [enableButon, setEnableButon] = useState(false);

  useEffect(() => {
    const fetchAllUsersOwner = async () => {
      const rp = await axios.get(`${http}/api/v1/locations/users_owner`);
      const data = rp.data;
      if (!data.error) {
        setUsersOwner(data.data);
      }
    };
    fetchAllUsersOwner();
  }, []);

  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onHide}
    >
      <Modal.Body>
        <h4>{props.title}</h4>
        <form>
          <div className="form-group">
            <label htmlFor="user_owner_id">เจ้าของพื้นที่</label>
            <Typeahead
              //   ref={ref => (this.typehead = ref)}
              id="dropdown-basic"
              labelKey="displayname"
              multiple={false}
              options={usersOwner}
              placeholder="ค้นหารายชื่อ..."
              onChange={selected => {
                // this.setState({ selected });
                if (selected.length) {
                  setUserOwnerSelected(selected[0]);
                  setEnableButon(true);
                } else {
                  //   console.log(selected[0]);
                  setUserOwnerSelected([]);
                  setEnableButon(false);
                }
              }}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={!enableButon}
          onClick={() => props.onSave(userOwnerSelected)}
          variant="primary"
        >
          Save
        </Button>
        <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LocationEditModal;
