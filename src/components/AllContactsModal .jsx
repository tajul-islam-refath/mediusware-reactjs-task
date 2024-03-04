import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import SingleContactModal from "./SingleContactModal";

const AllContactsModal = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [allCountacts, setAllCountacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [nextPage, setNextPage] = useState(null);
  const [even, setEven] = useState(false);

  const getAllContacts = async (search = "", per_page = 30) => {
    try {
      let url = `https://contact.mediusware.com/api/contacts/?page_size=${per_page}`;
      if (search.trim() !== "") {
        url += `&search=${search}`;
      }

      let {
        data: { next, results },
      } = await axios.get(url);
      setAllCountacts(results);
      setNextPage(next);
    } catch (err) {
      console.log(err);
    }
  };

  const getInfiniteData = async (nextPage) => {
    try {
      let {
        data: { next, results },
      } = await axios.get(nextPage);
      setAllCountacts((prev) => [...prev, ...results]);
      setNextPage(next);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (even) {
      let evenData = allCountacts.filter((c) => c.id % 2 == 0);
      setAllCountacts(evenData, searchTerm);
    } else {
      getAllContacts(searchTerm);
    }
  }, [even]);

  const onChangeEven = () => {
    setEven(!even);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAllContacts(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [searchTerm]);

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      getAllContacts(searchTerm);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClose = () => {
    setSelectedContact(null);
  };

  useEffect(() => {
    let intersection = document.querySelector("#intersection");
    let observer = new IntersectionObserver((entries) => {
      entries.map((entry) => {
        if (entry.isIntersecting && nextPage) {
          getInfiniteData(nextPage);
        }
      });
    });
    observer.observe(intersection);
    return () => observer.disconnect();
  }, [nextPage]);

  return (
    <>
      <Modal show={true}>
        <Modal.Header>
          <Modal.Title>All Contacts</Modal.Title>
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
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              placeholder="search"
              name="search"
              onChange={handleSearch}
              value={searchTerm}
              onKeyDown={handleEnterKey}
            />
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
              {allCountacts?.map((item, i) => (
                <tr key={i} onClick={() => setSelectedContact(item)}>
                  <th>{item.id}</th>
                  <th>{item.phone}</th>
                  <th>{item.country?.name}</th>
                </tr>
              ))}
              <tr id="intersection">
                <td>Loading....</td>
              </tr>
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

export default AllContactsModal;
