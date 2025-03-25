import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showSnakbar } from '../store/slices/snakbar'
import './image.css'

const UpdateBus = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const topCitiesIndia = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Ahmedabad',
    'Chennai',
    'Kolkata',
    'Surat',
    'Pune',
    'Jaipur',
    'Lucknow',
    'Kanpur',
    'Nagpur',
    'Visakhapatnam',
    'Indore',
    'Thane',
    'Bhopal',
    'Patna',
    'Vadodara',
    'Ghaziabad'
  ]
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id') // Get the ID from the URL params
  const [formData, setFormData] = useState({
    NumRows: 0,
    NumColumns: 0,
    DepartureCity: '',
    ArrivalCity: '',
    BusName: '',
    DepartureTime: '',
    ArrivalTime: '',
    DateOfTravel: '',
    DateOfArrival: '',
    Fare: '',
    BusImage: ''
  })

  useEffect(() => {
    fetchBusDetails()
  }, [])

  const fetchBusDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/bus/${id}`)

      setFormData(response.data)
      console.log(formData.DateOfTravel)
    } catch (error) {
      console.error('Error fetching bus details:', error)
    }
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  const handleImageChange = e => {
    e.preventDefault()
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData({ ...formData, BusImage: reader.result })
    }
    reader.readAsDataURL(file)
  }
  const handleSubmit = async e => {
    e.preventDefault()

    for (const key in formData) {
      if (formData[key] === '') {
        dispatch(
          showSnakbar({
            message: `Please enter ${key}`,
            open: true,
            type: 'error'
          })
        )

        return
      }
    }
    formData.DateOfTravel = new Date(formData.DateOfTravel)
      .toISOString()
      .split('T')[0]
    formData.DateOfArrival = new Date(formData.DateOfArrival)
      .toISOString()
      .split('T')[0]
    try {
      await axios.put(`http://localhost:5000/api/updatebus/${id}`, formData)
      dispatch(
        showSnakbar({
          message: 'Bus updated successfully!',
          open: true,
          type: 'success'
        })
      )
      navigate('/allbus')
    } catch (error) {
      console.error('Error updating bus:', error)
    }
  }

  return (
    <div className='container mt-5'>
      <h1>Update Bus</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <div className='image-preview-container'>
            <label htmlFor='fileInput'>
              <input
                type='file'
                accept='image/*'
                id='fileInput'
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <img
                src={`http://localhost:5000/${formData.BusImage}`}
                alt='Bus Image'
                className='image-preview clickable'
                onClick={() => document.getElementById('fileInput').click()}
              />
            </label>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='BusName'>Name:</label>
          <input
            type='text'
            className='form-control'
            id='BusName'
            value={formData.BusName}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='DepartureCity'>From:</label>
          <select
            className='form-control'
            id='DepartureCity'
            onChange={handleChange}
            value={formData.DepartureCity}
          >
            <option value=''>Select From</option>
            {topCitiesIndia.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='ArrivalCity'>To:</label>
          <select
            className='form-control'
            id='ArrivalCity'
            onChange={handleChange}
            value={formData.ArrivalCity}
          >
            <option value=''>Select From</option>
            {topCitiesIndia.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='DateOfTravel'>Date of Travel:</label>
          <input
            type='date'
            className='form-control'
            id='DateOfTravel'
            value={formData.DateOfTravel}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='DateOfArrival'>Date of Arrival:</label>
          <input
            type='date'
            className='form-control'
            id='DateOfArrival'
            value={formData.DateOfArrival}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='DepartureTime'>Departure Time:</label>
          <input
            type='time'
            className='form-control'
            id='DepartureTime'
            value={formData.DepartureTime}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='ArrivalTime'>Arrival Time:</label>
          <input
            type='time'
            className='form-control'
            id='ArrivalTime'
            value={formData.ArrivalTime}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='Fare'>Fare:</label>
          <input
            type='number'
            className='form-control'
            id='Fare'
            value={formData.Fare}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='NumRows'>Number Of Rows:</label>
          <input
            type='number'
            className='form-control'
            id='NumRows'
            value={formData.NumRows}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='NumColumns'>Number Of Columns:</label>
          <input
            type='number'
            className='form-control'
            id='NumColumns'
            value={formData.NumColumns}
            onChange={handleChange}
          />
        </div>
        {/* Add other input fields for other bus details */}
        <button type='submit' className='btn btn-primary'>
          Update Bus
        </button>
      </form>
    </div>
  )
}

export default UpdateBus
