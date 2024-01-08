import { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };
  
  console.log(email, password, confirmPassword);

  const handleSubmit = async (e, authtype) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords must match!");
      return;
    }
    const response = await fetch(
      `${process.env.REACT_APP_SERVERURL}/${authtype}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      }
    );

    const data = await response.json();
    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);
      setCookie("Role", data.role)
      window.location.reload();
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-container-inner">
        <form>
          <h2>{isLogin ? "Please log in" : "Please sign up"}</h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="role"
            onChange={(e) => setRole(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
          />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button style={{marginTop:"100px"}} onClick={() => viewLogin(false)}>Sign Up</button>
          <button style={{marginTop:"100px"}} onClick={() => viewLogin(true)}>Log In</button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
