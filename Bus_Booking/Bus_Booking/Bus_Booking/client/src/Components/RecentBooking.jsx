import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showSnakbar } from "../store/slices/snakbar";



const RecentBooking = () => {
  
  const dispatch = useDispatch();
  const isAdmin = localStorage.getItem("admin");
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId");
  const [bookingIdToDelete, setBookingIdToDelete] = useState(null);
  useEffect(() => {
   
    fetchRecentBookings();
  }, []);
  const fetchRecentBookings = async () => {
    if (isAdmin === "1") {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/recentbookings",
          {
            UserID: userId,
          }
        );

        setBookings(response.data);
        console.log(bookings);
      } catch (error) {
        console.error("Error fetching recent bookings:", error);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/userbookings",
          {
            UserID: userId,
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching recent bookings:", error);
      }
    }
  };
  const handleCancelBooking = async () => {
    try {
      // Add code to cancel the booking based on the bookingIdToDelete
      const response = await axios.post(
        "http://localhost:5000/api/deletebooking",
        {
          bookingId: bookingIdToDelete,
        }
      );

      if (response.status === 200) {
        dispatch(
          showSnakbar({
            message: response.data.message,
            open: true,
            type: "success",
          })
        );
        fetchRecentBookings();
      } else {
        dispatch(
          showSnakbar({
            message: response.data.message,
            open: true,
            type: "error",
          })
        );
      }

      console.log(`Booking ${bookingIdToDelete} cancelled`);
    } catch (error) {
      console.error("Error cancelling booking:", error);
    } finally {
      // Reset the bookingIdToDelete after handling the cancellation
      setBookingIdToDelete(null);
    }
  };


  return (
    <div className="container mt-5">
      <div className="table-responsive">
      
        <table className="table table-striped table-bordered table-hover text-center">        
              <thead className="bg-secondary text-white">        
                <tr>
                  <th>Email</th>
                  <th>Bus Name</th>          
                  <th>Date Of Travel</th>
                  <th>Date Of Arrival</th>
                  <th>Bus Details</th>
                  <th>Departure Time  / <br />Arrival Time</th>
                  <th>Fare</th>
                  <th>Seats Selected</th>
                  {isAdmin !== "1" ? (<><th>Action</th></>):(<><th>Status</th></>)}
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.Email}</td>
                <td>{booking.BusName}</td>
                <td>{new Date(booking.DateOfTravel).toLocaleDateString('en-GB')}</td>
                <td>{new Date(booking.DateOfArrival).toLocaleDateString('en-GB')}</td>
                <td>{`${booking.DepartureCity} / ${booking.ArrivalCity}`}</td>
                <td>{`${booking.DepartureTime} / ${booking.ArrivalTime}`}</td>
                <td>{`${booking.TotalFare}`}</td>
                <td>{`${booking.SelectedSeats}`}</td>
                {isAdmin !== "1" ? (<><td>
                    <button
                      className="btn"
                      onClick={() => setBookingIdToDelete(booking.BookingID)}
                      data-toggle="modal"
                      data-target="#cancelConfirmationModal"
                    >
                      Cancel
                    </button>
                  </td></>):(<>
                  <td>
                    {booking.Status === 1 ? ("Booked"):("Canceled")}
                  </td>
                  </>)}
              </tr>
          ))}
        </tbody>          
      </table>      
      </div>
      <div
        className="modal fade"
        id="cancelConfirmationModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="cancelConfirmationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="cancelConfirmationModalLabel">
                Confirm Cancellation
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to cancel this booking?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleCancelBooking}
                data-dismiss="modal"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentBooking;
