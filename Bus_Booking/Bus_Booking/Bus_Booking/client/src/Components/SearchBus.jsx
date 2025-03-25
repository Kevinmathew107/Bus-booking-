import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showSnakbar } from '../store/slices/snakbar'

const SearchBus = () => {
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
  const [formData, setFormData] = useState({
    departureCity: '',
    arrivalCity: '',
    date: ''
  })
  const [busList, setBusList] = useState([])

  const handleInputChange = e => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleFormSubmit = async e => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/checkdate', {
        method: 'POST',
        body: JSON.stringify({
          departureCity: formData.departureCity,
          arrivalCity: formData.arrivalCity,
          date: formData.date
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 201) {
        dispatch(
          showSnakbar({
            message: 'No bus found!!',
            open: true,
            type: 'error'
          })
        )
      } else {
        const data = await response.json()
        setBusList(data)
        console.log(data)
      }
    } catch (error) {
      console.error('Error fetching bus data:', error)
    }
  }

  const SetFare = async fare => {
    localStorage.setItem('Fare', fare)
  }
  const GetUrlData = async () => {
    const data = await axios.get('http://localhost:5000/api/buses')
    setBusList(data.data)
  }

  useEffect(() => {
    GetUrlData()
  }, [])
  return (
    <div className='container'>
      <div className='card bg-secondary mx-auto mt-3 p-3'>
        <form className='row'>
          <div className='form-group col-md-4'>
            <label className='text-white' htmlFor='from'>
              From:
            </label>
            <select
              className='form-control'
              id='departureCity'
              onChange={handleInputChange}
              value={formData.departureCity}
            >
              <option value=''>Select From</option>
              {topCitiesIndia.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group col-md-4'>
            <label className='text-white' htmlFor='to'>
              To:
            </label>
            <select
              className='form-control'
              id='arrivalCity'
              onChange={handleInputChange}
              value={formData.arrivalCity}
            >
              <option value=''>Select To</option>
              {topCitiesIndia.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group col-md-3'>
            <label className='text-white' htmlFor='date'>
              Date:
            </label>
            <input
              type='date'
              className='form-control'
              placeholder='Date'
              id='date'
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
          <div className='form-group col-md-1 mt-auto'>
            <button
              type='submit'
              className='btn btn-light'
              onClick={handleFormSubmit}
            >
              <i className='fa fa-search' aria-hidden='true'></i>
            </button>
          </div>
        </form>
      </div>

      <div className='mt-5'>
        <div className='row'>
          {busList.map(prod => (
            <>
              <div className='col-md-6 mb-2'>
                <div class='card p-2'>
                  <div class='row'>
                    <div
                      class='imagebus col-4'
                      style={{ height: '150px', width: '150px' }}
                    >
                      <img
                        src={`http://localhost:5000/${prod.BusImage}`}
                        height='100%'
                        width='100%'
                      />
                    </div>
                    <div class='description col-8 text-dark'>
                      <div class='des text-justify'>
                        Bus Name : {prod.BusName}
                      </div>

                      <div class='des text-justify'>
                        From : {prod.DepartureCity}
                      </div>
                      <div class='des text-justify'>
                        To : {prod.ArrivalCity}
                      </div>
                      <div class='des text-justify'>
                        Date :{' '}
                        {new Date(prod.DateOfTravel).toLocaleDateString('en-GB')}
                      </div>
                      <div class='des text-justify'>
                        Time : {prod.DepartureTime} / {prod.ArrivalTime}
                      </div>
                      <div class='des text-justify'>Price : {prod.Fare}</div>
                      <div class='des text-justify'>
                        Total Seats : {prod.seatsLeft}
                      </div>
                      <div class='book ml-5 mt-2 mb-2'>
                        <Link
                          to={`/bus?id=${prod.BusID}`}
                          onClick={SetFare(prod.Fare)}
                          class=' btn  btn-outline-dark px-5 '
                        >
                          Book Bus
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchBus
