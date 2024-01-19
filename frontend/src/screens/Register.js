import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { register } from "../Redux/Actions/userActions";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import ContactInfo from "../components/homeComponents/ContactInfo";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Register = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Toggle password visibility 
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const toggleConfirmPasswordVisiblity = () => {
    setConfirmPasswordShown(confirmPasswordShown ? false : true);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(fname, lname, email, password));
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}

        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="text"
            placeholder="First Name"
            value={fname}
            name="fname"
            required
            onChange={(e) => setFName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lname}
            name="lname"
            required
            onChange={(e) => setLName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-wrapper">
          <input
            className="password-input"
            type={passwordShown ? "text" : "password"}
            placeholder="Password"
            value={password}
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <i onClick={togglePasswordVisiblity} className="toggle-password">
            {passwordShown ? <FaEyeSlash /> : <FaEye />}
          </i>
          </div>
          <div className="password-wrapper">
          <input
            className="password-input"
            type={confirmPasswordShown ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            name="confirmPassword"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <i onClick={toggleConfirmPasswordVisiblity} className="toggle-password">
            {confirmPasswordShown ? <FaEyeSlash /> : <FaEye />}
          </i>
          </div>
          <button type="submit">Register</button>
          <p>
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
        </form>
      </div>
      <ContactInfo />
      <Footer />
    </>
  );
};

export default Register;
