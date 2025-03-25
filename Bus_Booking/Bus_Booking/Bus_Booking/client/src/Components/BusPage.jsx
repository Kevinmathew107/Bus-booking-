import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showSnakbar } from '../store/slices/snakbar'
import './Seatbus.css'

const BusPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')
  const [selectedSeats, setSelectedSeats] = useState([])
  const [occupiedSeats, setOccupiedSeats] = useState()
  let mergedSeats = null

  const [busData, setBusData] = useState(null)

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bus/${id}`)
        setBusData(response.data)
        
        if (response.data.SelectedSeats !== null) {
          let set = response.data.SelectedSeats
          set = set.split(',')
          setOccupiedSeats(set)
        }
        
      } catch (error) {
        console.error('Error fetching bus data:', error)
      }
    }

    fetchBusData()
  }, [id])

  if (!busData) {
    return <div>Loading...</div>
  }

  const handleSeatSelection = seat => {
    const seatIndex = selectedSeats.indexOf(seat)
    if (seatIndex !== -1) {
      // If selected, remove it from the selectedSeats array
      setSelectedSeats(selectedSeats.filter(s => s !== seat))
    } else {
      // If not selected, add it to the selectedSeats array
      setSelectedSeats([...selectedSeats, seat])
    }
  }
  const numRows = busData.NumRows
  const numCols = busData.NumColumns

  const seats = []
  for (let row = 1; row <= numRows; row++) {
    const rowSeats = []
    for (let col = 1; col <= numCols; col++) {
      const seatId = `${row}${String.fromCharCode(64 + col)}`
      let isOccupied = false
      if (busData.SelectedSeats !== null) {
        if (occupiedSeats.includes(seatId)) {
          isOccupied = true
        }
      }
      rowSeats.push(
        <li key={seatId} className='seat'>
          <input
            type='checkbox'
            id={seatId}
            value={seatId}
            disabled={isOccupied}
            onChange={() => handleSeatSelection(seatId)}
          />
          <label htmlFor={seatId}>{seatId}</label>
        </li>
      )
    }
    seats.push(
      <li key={`row-${row}`} className={`row row--${row}`}>
        <ol className='seats' type='A'>
          {rowSeats}
        </ol>
      </li>
    )
  }
  const amount =
    Number(localStorage.getItem('Fare')) * 100 * selectedSeats.length
  const currency = 'INR'
  const receiptId = 'qwsaq1'

  const mergeSelection = async e => {
    if(occupiedSeats === undefined){
      mergedSeats = [...selectedSeats]
    } else{
      mergedSeats = [...selectedSeats, ...occupiedSeats]
    }
    
  }
  const handlePayment = async e => {
    await mergeSelection()

    const checkSeats = await fetch('http://localhost:5000/api/seatsleft', {
      method: 'POST',
      body: JSON.stringify({
        id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (checkSeats.status === 200) {
      const response = await fetch('http://localhost:5000/api/payment', {
        method: 'POST',
        body: JSON.stringify({
          amount,
          currency,
          receipt: receiptId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const order = await response.json()

      var options = {
        key: 'rzp_test_X9xMqy5AcCDQPE',
        amount,
        currency,
        name: 'T & T',
        description: 'Test Transaction',
        image: '../Assets/Images/Tours & Travels-logos_white.png',
        order_id: order.id,
        handler: async function (response) {
          const body = {
            ...response,
            UserID: localStorage.getItem('userId'),
            BusID: id,
            selectedSeats,
            TotalFare: amount,
            seatsNumber: selectedSeats.length,
            mergedSeats
          }

          const validateRes = await fetch(
            'http://localhost:5000/api/validate',
            {
              method: 'POST',
              body: JSON.stringify(body),
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )

          const jsonRes = await validateRes.json()
          if (jsonRes) {
            document.getElementById('exampleModal').classList.remove('show')
            document.body.classList.remove('modal-open')
            document.getElementsByClassName('modal-backdrop')[0].remove()
            navigate('/recentbooking')
          }
        },
        prefill: {
          name: localStorage.getItem('firstName'),
          email: localStorage.getItem('email'),
          contact: '0000000000'
        },
        notes: {
          address: 'Razorpay Corporate Office'
        },
        theme: {
          color: '#3399cc'
        }
      }

      var rzp1 = new window.Razorpay(options)

      rzp1.on('payment.failed', function (response) {
        alert(response.error.code)
      })

      rzp1.open()
      e.preventDefault()
    } else {
      dispatch(
        showSnakbar({
          message: 'No Seats Left!',
          open: true,
          type: 'error'
        })
      )
    }
  }

  return (
    <>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-8 col-md-10 col-sm-12 p-0'>
            <img
              src={`http://localhost:5000/${busData.BusImage}`}
              className='img-fluid'
              alt='Bus'
            />

            <div className='text-info mt-3'>
              <div className='bus-details'>
                <div className='col-12'>
                  <div>
                    <strong>Name:</strong> {busData.BusName}
                  </div>
                  <div>
                    <strong>Fare:</strong> {busData.Fare}
                  </div>
                  <div>
                    <strong>Date of Travel:</strong>{' '}
                    {new Date(busData.DateOfTravel).toLocaleDateString('en-GB')}
                  </div>
                  <div>
                    <strong>Date of Arrival:</strong>{' '}
                    {new Date(busData.DateOfArrival).toLocaleDateString('en-GB')}
                  </div>
                  <div>
                    <strong>To:</strong> {busData.ArrivalCity}
                  </div>
                  <div>
                    <strong>From:</strong> {busData.DepartureCity}
                  </div>
                  <div>
                    <strong>Departure Time:</strong> {busData.DepartureTime}
                  </div>
                  <div>
                    <strong>Arrival Time:</strong> {busData.ArrivalTime}
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-3 text-center'>
              <button
                type='button'
                className='btn btn-outline-dark px-5'
                data-toggle='modal'
                data-target='#exampleModal'
              >
                Select Your Seat
              </button>
            </div>

            <div
              className='modal fade'
              id='exampleModal'
              tabIndex='-1'
              aria-labelledby='exampleModalLabel'
              aria-hidden='true'
            >
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title' id='exampleModalLabel'>
                      Select Seat
                    </h5>
                    <button
                      type='button'
                      className='close'
                      data-dismiss='modal'
                      aria-label='Close'
                    >
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <ol className='cabin fuselage'>{seats}</ol>
                  </div>
                  <div className='modal-footer justify-content-center'>
                    <button
                      className='btn btn-outline-dark px-5'
                      onClick={handlePayment}
                    >
                      Book Bus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BusPage
