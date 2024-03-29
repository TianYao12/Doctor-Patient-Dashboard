import { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  // viewLogin(status) directs to login view if status is true and sign up view otherwise
  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };
  // handleSubmit(e, authtype) handles form submission
  const handleSubmit = async (e, authtype) => {
    e.preventDefault();
    // if signup view check if passwords match
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords must match!");
      return;
    }
    // make a POST request depending on signup or login with user data
    const response = await fetch(
      `${process.env.REACT_APP_SERVERURL}/${authtype}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      }
    );
    
    const data = await response.json(); // get response data
    if (data.detail) { // handle errors
      setError(data.detail);
    } else { // if no errors, set cookies and reload page
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);
      setCookie("Role", data.role);
      window.location.reload();
    }
  };
  // render authenticated page
  return (
    <div className="auth-container">
      <div className="auth-container-inner">
        <form>
          <h2>{isLogin ? "Login" : "Sign up"}</h2>
          {/* Email */}
          <input
            required
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password */}
          <input
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Confirm password for signup */}
          {!isLogin && (
            <input
              required
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <select
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              padding: "8px",
              margin: "10px 0px 10px 0px",
              borderRadius: "10px",
            }}
          >
            <option value="" disabled>
              Select a role
            </option>
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
          </select>
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
          />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            style={{ marginTop: "100px" }}
            onClick={() => viewLogin(false)}
          >
            Sign Up
          </button>
          <button
            style={{ marginTop: "100px" }}
            onClick={() => viewLogin(true)}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
