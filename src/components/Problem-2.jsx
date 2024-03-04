import { Link, useLocation } from "react-router-dom";
import AllContactsModal from "./AllContactsModal ";
import UsContactModal from "./UsContactModal";

const Problem2 = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modal = queryParams.get("modal");
  console.log(modal);
  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

          <div className="d-flex justify-content-center gap-3">
            <Link
              to={`/problem-2?modal=all-contacts`}
              className="btn btn-lg btn-outline-primary"
              type="button">
              All Contacts
            </Link>

            <Link
              className="btn btn-lg btn-outline-warning"
              type="button"
              to={`/problem-2?modal=us-contacts`}>
              US Contacts
            </Link>
          </div>
        </div>
      </div>
      {modal == "all-contacts" && <AllContactsModal />}
      {modal == "us-contacts" && <UsContactModal />}
    </>
  );
};

export default Problem2;
