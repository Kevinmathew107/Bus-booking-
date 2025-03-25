import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showSnakbar } from "../store/slices/snakbar";


const TravelsLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const dispatch = useDispatch();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


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
      const login = await axios.post("http://localhost:5000/api/travellerlogin", formData);

      if (login.status === 200) {        
        dispatch(
          showSnakbar({
            message: "Login Success",
            open: true,
            type: "success",
          })
        );
        localStorage.clear();
        localStorage.setItem("email", login.data.Email);
        localStorage.setItem("userId", login.data.UserID);
        localStorage.setItem("admin", login.data.isAdmin);
        localStorage.setItem("firstName", login.data.FirstName);
        localStorage.setItem("user",login.data);
        window.location.replace("/");
        
      } else{
        localStorage.clear();
        dispatch(
          showSnakbar({
            message: "Invalid Details",
            open: true,
            type: "error",
          })
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(
          showSnakbar({
            message: "Invalid email or password",
            open: true,
            type: "error",
          })
        );
      } else if (error.response.status === 402) {
        localStorage.clear();
        dispatch(
          showSnakbar({
            message: "Customer login not allowed!!",
            open: true,
            type: "error",
          })
        );
      }else{
        console.error("Failed to login:", error);
        dispatch(
          showSnakbar({
            message: "Failed to login",
            open: true,
            type: "error",
          })
        );
      }
    }
  };
  return (
    <div className="container">
      <div className="card bg-secondary col-md-6 mx-auto mt-5 p-0">
        <div className="card-header bg-white text-dark">
          <h1 className="login-head text-center">Travels Login</h1>
        </div>
        <div className="card-body">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-white" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="form-group">
              <label className="text-white" htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <button type="submit" className="btn btn-light btn-block">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default TravelsLogin;
