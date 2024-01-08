import Modal from "./Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

const Header = ({ listName, getData, hide }) => {
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
        {!hide ? (
          <>
            <button className="create" onClick={() => setShowModal(true)}>
              ADD NEW
            </button>
            <button className="signout" onClick={signOut}>
              Sign Out
            </button>
          </>
        ) : (
          <button className="signout" onClick={signOut}>
            Sign Out
          </button>
        )}
      </div>
      {showModal && (
        <Modal mode={"Create"} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};

export default Header;
