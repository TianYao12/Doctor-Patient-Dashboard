import Modal from "./Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

const Header = ({ listName, getPatients, hide }) => {
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const signOut = () => {
    removeCookie("Email");
    removeCookie("AuthToken");
    removeCookie("Role");
    window.location.reload();
  };
  return (
    <div className="header-container">
      {hide ? (
        <h1>{listName}'s Symptom-Disease Dashboard</h1>
      ) : (
        <h1>{listName}'s Patient Dashboard</h1>
      )}

      <div className="button-container">
            <button className="signout" onClick={signOut}>
              Sign Out
            </button>
      </div>
      {showModal && (
        <Modal mode={"Create"} setShowModal={setShowModal} getPatients={getPatients} />
      )}
    </div>
  );
};

export default Header;
