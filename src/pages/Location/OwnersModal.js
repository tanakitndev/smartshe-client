import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const OwnersModal = (props) => {
  useEffect(() => {}, []);

  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onHide}
    >
      <Modal.Body>
        <h4 className="text-dark">{props.title}</h4>
        <form className="text-dark">
          <div className="col-md-8">
            <div className="form-group">
              <label htmlFor="user_owner_id">เจ้าของพื้นที่</label>

              {props.data &&
                props.data.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className="my-2 d-flex justify-content-between align-items-center"
                    >
                      <div>
                        {index + 1}. {el.displayname}
                      </div>
                      <div>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            props.onClickRemove(el.location_id)
                          }}
                        >
                          remove
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OwnersModal;
