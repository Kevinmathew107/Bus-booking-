import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AllBuses = () => {
  const [buses, setBuses] = useState([])

  useEffect(() => {
    fetchAllBuses()
  }, [])

  const fetchAllBuses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/buses')
      setBuses(response.data)
    } catch (error) {
      console.error('Error fetching all buses:', error)
    }
  }

  return (
    <div className='container mt-5'>
      <h1>All Buses</h1>
      <div className='row'>
        {buses.map(bus => (
          <div key={bus.BusID} className='col-lg-4 col-md-6 col-sm-12 mb-4'>
            <Link to={`/updatebus?id=${bus.BusID}`}>
              <div className='card'>
                <img
                  src={`http://localhost:5000/${bus.BusImage}`}
                  className='card-img-top'
                  alt={bus.BusName}
                />
                <div className='card-body'>
                  <h5 className='card-title'>{bus.BusName}</h5>
                  <p className='card-text'>From: {bus.DepartureCity}</p>
                  <p className='card-text'>To: {bus.ArrivalCity}</p>
                  <p className='card-text'>
                    Date Of Travel:{' '}
                    {new Date(bus.DateOfTravel).toLocaleDateString()}
                  </p>
                  <p className='card-text'>
                    Date Of Arrival:{' '}
                    {new Date(bus.DateOfArrival).toLocaleDateString()}
                  </p>
                  <p className='card-text'>
                    Departure Time: {bus.DepartureTime}
                  </p>
                  <p className='card-text'>Arrival Time: {bus.ArrivalTime}</p>
                  <p className='card-text'>Fare: {bus.Fare}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllBuses
