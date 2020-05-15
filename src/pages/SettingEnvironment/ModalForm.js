import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function ModalForm(props) {

    return (
        <Modal centered show={props.show} onHide={props.onHide} backdrop="static" >
            <Modal.Header closeButton className="bg-dark">
                <Modal.Title className="text-uppercase">{props.data.env_type}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark">
                <form onSubmit={props.submitForm}>
                    <div className="form-group">
                        <label htmlFor="env_type" className="text-uppercase">Warning</label>
                        <input
                            type="text"
                            className="form-control"
                            value={props.data.warning}
                            placeholder="warning"
                            onChange={(e) => props.handleFormChange('warning', e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="env_type" className="text-uppercase">Dangerous</label>
                        <input
                            type="text"
                            className="form-control"
                            value={props.data.danger}
                            placeholder="danger"
                            onChange={(e) => props.handleFormChange('danger', e.target.value)} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className="bg-dark">
                <Button variant="primary" onClick={props.submitForm}>
                    Save Changes
                </Button>

                <Button variant="secondary" onClick={props.onHandleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalForm;
