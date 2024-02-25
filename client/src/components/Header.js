import { useState } from "react";
import { useCookies } from "react-cookie";

// Header(email, getPatients, user_type)
const Header = ({ email, user_type }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  // signout() removes cookies and reloads page to signout
  const signOut = () => {
    removeCookie("Email");
    removeCookie("AuthToken");
    removeCookie("Role");
    window.location.reload();
  };

  // renders header component
  return (
    <div className="header-container">
      {user_type ? (
        <h1>{email}'s Symptom-Disease Dashboard</h1>
      ) : (
        <h1>{email}'s Patient Dashboard</h1>
      )}

      <div className="button-container">
            <button className="signout" onClick={signOut}>
              Sign Out
            </button>
      </div>

    </div>
  );
};

export default Header;
