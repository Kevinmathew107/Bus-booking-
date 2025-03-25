import React from "react";
import { useState } from "react";
import { showSnakbar } from "../store/slices/snakbar";
import { useDispatch } from "react-redux";

const Contact = () => {
  const dispatch = useDispatch();
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
      const response = await fetch("http://localhost:5000/api/contactus", {
        
        method: "POST",
        body: JSON.stringify({
          "Name":formData.Name,
          "Email":formData.Email,
          "Message": formData.Message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(response.status === 201){
        dispatch(
          showSnakbar({
            message: 'Error!',
            open: true,
            type: "error",
          }))
      } else{
        dispatch(
          showSnakbar({
            message: 'Message Sent!',
            open: true,
            type: "success",
          }))
          window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching bus data:", error);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Message: ""
  });
  return (
    <div className="container">
      <div className="card bg-secondary col-md-8 mx-auto mt-5 p-0">
        <div className="card-header bg-white text-dark">
          <h1 className="login-head text-center">Contact Us</h1>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group row">
              <div className="col-md-6">
                <label className="text-white" htmlFor="name">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  onChange={handleInputChange}
                  placeholder="Enter Name"
                  value={formData.Name}
                />
              </div>
              <div className="col-md-6">
                <label className="text-white" htmlFor="email">
                  Email:
                </label>
                <input
                 type="email"
                 className="form-control"
                 id="Email"
                 onChange={handleInputChange}
                 placeholder="Enter email"
                 value={formData.Email}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="text-white" htmlFor="message">
                Message:
              </label>
              <textarea
                className="form-control"
                id="Message"
                placeholder="Enter Message"
                rows="5"
                style={{ border: "2px solid white" }}
                onChange={handleInputChange}
                value={formData.Message}
              ></textarea>
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-light btn-block">
              Contact
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;