import Modal from "./Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

const Header = ({ listName, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const signOut = () => {
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };

  return (
    <div className="header-container">
      <h1>{listName}'s To-do List</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>
          ADD NEW
        </button>
        <button className="signout" onClick={signOut}>
          SIGN OUT
        </button>
      </div>
      {showModal && (
        <Modal mode={"Create"} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};

export default Header;
