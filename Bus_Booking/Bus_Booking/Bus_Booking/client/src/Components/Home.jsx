import React from "react";
import { useNavigate } from "react-router-dom";
import background1 from "../Assets/Images/bookbus.png";
import background2 from "../Assets/Images/busbooking.jpg";
import Document from "./Document";

const Home = () => {
  
  if (localStorage.getItem("user") === null) {
    navigate("/login");
  }
  const navigate = useNavigate();
  return (
    <>
      <div className="container-fluid p-0">
        <Document />
      </div>
      <div className="container">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-3 col-sm-6 my-2">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Offer 1</h5>
                  <p className="card-text">
                  Makemytrip Bus Coupons
Upto ₹500 Off On Bus Ticket Bookings
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 my-2">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Offer 2</h5>
                  <p className="card-text">
                  Buy 1 Get 1 Free
Buy 1 Bus Ticket & Get Another 1 Free and 12% discount
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 my-2">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Offer 3</h5>
                  <p className="card-text">
                  Save Rs.500 On Your Bus Bookings
Save Rs.500 on your Bus Bookings
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 my-2">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Offer 4</h5>
                  <p className="card-text">
                  15% Cashback
Users get 15% Cashback up to Rs 200 on Bus ticket booking
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5 justify-content-center">
          <div className="col-md-8 text-center">
            <div className="bg-secondary text-white p-5 rounded">
              <h2>Ready to Book Your Bus Ticket?</h2>
              <p className="lead">
                Get started now and explore your favorite destinations with
                ease!
              </p>
              <button
                className="btn btn-lg btn-light"
                onClick={() => navigate("/searchbus")}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
