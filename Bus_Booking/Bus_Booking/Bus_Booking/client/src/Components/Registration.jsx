import React, { useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showSnakbar } from "../store/slices/snakbar";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    email: "",
    password: ""
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if any field is null
    for (const key in formData) {
      if (formData[key] === "") {
        dispatch(
          showSnakbar({
            message: `Please enter ${key}`,
            open: true,
            type: "error",
          })
        );
        return;
      }
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/users", formData);
  
      if (response.status === 201) {
        // Handle successful user creation
        dispatch(
          showSnakbar({
            message: `Registration Successfully`,
            open: true,
            type: "success",
          })
        );
        // Redirect the user to the login page after successful registration
        window.location.href = "/login";
      } else {
        dispatch(
          showSnakbar({
            message: `Failed to create user`,
            open: true,
            type: "error",
          })
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        dispatch(
          showSnakbar({
            message: `Email already exists`,
            open: true,
            type: "error",
          })
        );
      } else {
        console.error("Failed to create user:", error);
        dispatch(
          showSnakbar({
            message: `Failed to create user`,
            open: true,
            type: "error",
          })
        );
      }
    }
  };
  
  

  return (
    <div className="container">
      <div className="card bg-secondary col-md-6 ml-auto mr-auto p-0 pb-2 pr-2 pl-2 m-0">
        <div className="card-header bg-white text-dark m-0">
          <h1 className="login-head">Customer Registration</h1>
        </div>
        <div className="card-body"></div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group col-md-6">
              <label className="text-white" htmlFor="firstName">
                First Name :
              </label>
              <input
                type="text"
                className="form-control form-input"
                placeholder="Enter First Name"
                id="firstName"
                onChange={handleChange}
                value={formData.firstName}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="text-white" htmlFor="lastName">
                Last Name :
              </label>
              <input
                type="text"
                className="form-control form-input"
                placeholder="Enter Last Name"
                id="lastName"
                onChange={handleChange}
                value={formData.lastName}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label className="text-white" htmlFor="phone">
                Phone Number :
              </label>
              <input
                type="text"
                className="form-control form-input"
                placeholder="Enter Contact Number"
                id="phone"
                onChange={handleChange}
                value={formData.phone}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="text-white" htmlFor="gender">
                Gender :
              </label>
              <br />
              <span className="text-white">Male</span>&emsp;
              <input
                type="radio"
                value="male"
                name="gender"
                id="gender"
                onChange={handleChange}
                checked={formData.gender === "male"}
              />
              &emsp;
              <span className="text-white">Female</span>&emsp;
              <input
                type="radio"
                value="female"
                name="gender"
                id="gender"
                onChange={handleChange}
                checked={formData.gender === "female"}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="text-white" htmlFor="email">
              Email :
            </label>
            <input
              type="email"
              className="form-control form-input"
              placeholder="Enter Email"
              id="email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div className="form-group">
            <label className="text-white" htmlFor="password">
              Password :
            </label>
            <input
              type="password"
              className="form-control form-input"
              placeholder="Enter Password"
              id="password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <button type="submit" className="btn">
            Create Account
          </button>
        </form>
        <div className="text-white">
          Do you have an account?
          <Link to={"/login"} className="forma">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
