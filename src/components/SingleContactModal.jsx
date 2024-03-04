import { Modal } from "react-bootstrap";

const SingleContactModal = ({ contact, handleClose }) => {
  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>ID: </strong>
          {contact.id}
        </p>
        <p>
          <strong>Phone: </strong>
          {contact.phone}
        </p>
        <p>
          <strong>Country: </strong>
          {contact.country?.name}
        </p>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default SingleContactModal;
