import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showSnakbar } from "../store/slices/snakbar";

const Addbus = () => {
  const dispatch = useDispatch();

  const [image, setimage] = React.useState({
    file: [],
  });
  const [files, setFiles] = React.useState([]);
  const [formData, setFormData] = useState({
    NumRows:0,
    NumColumns:0,
    DepartureCity:"",
    ArrivalCity:"",
    BusName: "",
    DepartureTime:"",
    ArrivalTime:"",
    DateOfTravel: "",
    DateOfArrival:"",
    Fare:"",
    BusImage: files[0],
  });

  const topCitiesIndia = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Surat",
    "Pune",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Visakhapatnam",
    "Indore",
    "Thane",
    "Bhopal",
    "Patna",
    "Vadodara",
    "Ghaziabad",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleimginput = (e) => {
    setimage({  
      ...image,
      file: e.target.files,
    });
    setFiles(e.target.files);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.BusImage = files[0]
    

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

    axios.post("http://localhost:5000/api/buses",formData,{
      headers:{
        "Content-Type":"multipart/form-data",
      },
    }).then((res)=>{
      
      if(res.status === 201){
        dispatch(
          showSnakbar({
            message: 'Bus Added Successfully!',
            open: true,
            type: "success",
          })
        )
        window.location.reload();
      }
    }).catch((err)=>{
      console.error("Failed to Add Bus: ", err);
      dispatch(
        showSnakbar({
          message: 'Failed to Add bus',
          open: true,
          type: "error",
        }))
    })
   
  };
  return (
    <div className="container-fluid mt-5">
      <div className="card bg-secondary col-md-8 ml-auto mr-auto p-0 pb-2 pr-2 pl-2 m-0">
        <div className="card-header bg-white text-dark m-0">
          <h1 className="login-head">Add Bus</h1>
        </div>
        <div className="card-body"></div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label className="text-white" htmlFor="BusName">
              Name:
            </label>
            <input
              type="text"
              className="form-control form-input"
              placeholder="Enter Bus Name"
              id="BusName"
              onChange={handleChange}
              value={formData.BusName}
            />
          </div>

          <div className="row">
            <div className="form-group col-md-12">
              <label className="text-white" htmlFor="DepartureCity">
                From:
              </label>
              <select
                className="form-control"
                id="DepartureCity"
                onChange={handleChange}
                value={formData.DepartureCity}
              >
                <option value="">Select From</option>
                {topCitiesIndia.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-12">
              <label className="text-white" htmlFor="ArrivalCity">
                To:
              </label>
              <select
                className="form-control"
                id="ArrivalCity"
                onChange={handleChange}
                value={formData.ArrivalCity}
              >
                <option value="">Select To</option>
                {topCitiesIndia.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-12">
              <label className="text-white" htmlFor="DateOfTravel">
                Date:
              </label>
              <input
                type="date"
                className="form-control form-input"
                id="DateOfTravel"
                onChange={handleChange}
                value={formData.DateOfTravel}
              />
            </div>
            <div className="form-group col-md-12">
              <label className="text-white" htmlFor="DateOfArrival">
                Date of Arrival:
              </label>
              <input
                type="date"
                className="form-control form-input"
                id="DateOfArrival"
                onChange={handleChange}
                value={formData.DateOfArrival}
              />
            </div>
            <div className="form-group col-md-12">
              <label className="text-white" htmlFor="DepartureTime">
                Departure Time:
              </label>
              <input
                type="time"
                className="form-control form-input"
                id="DepartureTime"
                onChange={handleChange}
                value={formData.DepartureTime}
              />
            </div>

            <div className="form-group col-md-12">
              <label className="text-white" htmlFor="ArrivalTime">
                Arrival Time:
              </label>
              <input
                type="time"
                className="form-control form-input"
                id="ArrivalTime"
                onChange={handleChange}
                value={formData.ArrivalTime}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="text-white" htmlFor="BusImage">
              Image:
            </label>
            <input
              type="file"
              className="form-control form-input border-0"
              id="BusImage"
              onChange={handleimginput}
              value={formData.BusImage}
            />
          </div>
          <div className="form-group">
            <label className="text-white" htmlFor="Fare">
              Fare:
            </label>
            <input
              type="number"
              className="form-control form-input"
              id="Fare"
              onChange={handleChange}
              value={formData.Fare}
            />
          </div>
          <div className="form-group">
            <label className="text-white" htmlFor="NumRows">
              Number Of Rows:
            </label>
            <input
              type="number"
              className="form-control form-input"
              id="NumRows"
              onChange={handleChange}
              value={formData.NumRows}
            />
          </div>
          <div className="form-group">
            <label className="text-white" htmlFor="NumColumns">
              Number Of Columns:
            </label>
            <input
              type="number"
              className="form-control form-input"
              id="NumColumns"
              onChange={handleChange}
              value={formData.NumColumns}
            />
          </div>

          <button type="submit" className="btn">
            Add Bus
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbus;
