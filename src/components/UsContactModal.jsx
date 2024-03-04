import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import SingleContactModal from "./SingleContactModal";

const UsContactModal = () => {
  const [selectedContact, setSelectedContact] = useState(null);

  const [usCountacts, setUsCountacts] = useState([]);
  const [next, setNext] = useState("");
  const [even, setEven] = useState(false);

  const getUsContacts = async () => {
    let {
      data: { next, results },
    } = await axios.get(
      `https://contact.mediusware.com/api/country-contacts/United States/`
    );
    setNext(next);
    setUsCountacts(results);
  };

  const onChangeEven = () => {
    setEven(!even);
  };

  useEffect(() => {
    if (even) {
      let evenData = usCountacts.filter((c) => c.id % 2 == 0);
      setUsCountacts(evenData);
    } else {
      getUsContacts();
    }
  }, [even]);

  const handleClose = () => {
    setSelectedContact(null);
  };

  return (
    <>
      <Modal show={true}>
        <Modal.Header closeButton>
          <Modal.Title>US Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <Link
              to="/problem-2?modal=all-contacts"
              className="btn btn-lg"
              style={{ color: "#46439f" }}
              type="button">
              All Contacts
            </Link>
            <Link
              to="/problem-2?modal=us-contacts"
              style={{ color: "#ff7f50" }}
              className="btn btn-lg"
              type="button">
              US Contacts
            </Link>
            <Link
              to="/problem-2"
              style={{ color: "#46439f" }}
              className="btn btn-lg"
              type="button">
              Close
            </Link>
          </div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Mobile</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              {usCountacts?.map((item, i) => (
                <tr key={i} onClick={() => setSelectedContact(item)}>
                  <th>{item.id}</th>
                  <th>{item.phone}</th>
                  <th>{item.country?.name}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={even}
              id="flexCheckChecked"
              onChange={onChangeEven}
            />
            <label className="form-check-label" htmlFor="flexCheckChecked">
              Even Only
            </label>
          </div>
        </Modal.Footer>
      </Modal>
      {selectedContact && (
        <SingleContactModal
          contact={selectedContact}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default UsContactModal;
