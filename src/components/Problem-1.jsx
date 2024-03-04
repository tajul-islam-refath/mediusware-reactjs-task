import React, { useEffect, useState } from "react";

const defaultState = {
  name: "",
  status: "",
};
const Problem1 = () => {
  const [tasks, setTask] = useState([]);
  const [filterdTasks, setFilteredtask] = useState([]);
  const [show, setShow] = useState("all");
  const [taskForm, setTaskForm] = useState({ ...defaultState });

  const handleClick = (val) => {
    setShow(val);
  };

  const handleOnChange = (e) => {
    const { name, value } = event.target;
    setTaskForm({ ...taskForm, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!taskForm.name) {
      alert("Name can not be empty");
      return;
    }

    if (!taskForm.status) {
      alert("Status can not be empty");
      return;
    }

    setTask((prev) => [...prev, taskForm]);
    setTaskForm({ ...defaultState });
  };

  const sortData = (sortingCriteria) => {
    if (sortingCriteria === "all") {
      let sortedData = tasks.sort((a, b) =>
        a.status.toLowerCase() > b.status.toLowerCase() ? 1 : -1
      );
      setFilteredtask(sortedData);
    } else {
      let sortedData = tasks.filter(
        (item) => item.status.toLowerCase() === sortingCriteria.toLowerCase()
      );
      setFilteredtask(sortedData);
    }
  };

  useEffect(() => {
    sortData(show);
  }, [show, tasks]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={onSubmit}>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                onChange={handleOnChange}
                value={taskForm.name}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                name="status"
                onChange={handleOnChange}
                value={taskForm.status}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}>
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}>
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}>
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filterdTasks.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
