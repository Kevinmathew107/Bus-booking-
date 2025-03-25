const conn = require('../config/connection')
const Razorpay = require('razorpay')
const crypto = require('crypto')

exports.contactUs = async (req, res) => {
  const requestData = req.body
  const sql =
    `INSERT INTO contactus (Name,Email,Message)` +
    `VALUES('${requestData.Name}','${requestData.Email}','${requestData.Message}')`
  conn.query(sql, (err, results) => {
    if (err) {
      return res.status(201).json({
        success: false,
        message: `Server Internal error`,
        error: err
      })
    }
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Message Sent',
      result: results
    })
  })
}
exports.createBus = async (req, res) => {
  const requestData = req.body
  const numRows = Number(requestData.NumRows)
  const numColumns = Number(requestData.NumColumns)

  const formattedDate = new Date(requestData.DateOfTravel)
    .toISOString()
    .split('T')[0]
  const formattedDateArrival = new Date(requestData.DateOfArrival)
    .toISOString()
    .split('T')[0]

  const sql =
    `INSERT INTO bus (DepartureCity,ArrivalCity,DepartureTime,ArrivalTime, DateOfTravel,DateOfArrival,Fare, BusName,BusImage,NumRows,NumColumns)` +
    ` VALUES ('${requestData.DepartureCity}','${requestData.ArrivalCity}','${requestData.DepartureTime}', '${requestData.ArrivalTime}', '${formattedDate}','${formattedDateArrival}', '${requestData.Fare}', '${requestData.BusName}','${requestData.BusImage}',${numRows},${numColumns} )`
  conn.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(400).json({
        success: false,
        message: `Server Internal error`,
        error: err
      })
    }
    return res.status(201).json({
      success: true,
      status: 202,
      message: 'Bus Add successfully',
      result: results
    })
  })
}

exports.getAllBuses = (req, res) => {
  conn.query('SELECT * FROM Bus ORDER BY created_at DESC', (error, results) => {
    if (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
      return
    }
    res.status(200).json(results)
  })
}

exports.getBusById = (req, res) => {
  const busId = req.params.id
  conn.query('SELECT * FROM bus WHERE BusID = ?', busId, (error, results) => {
    if (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
      return
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Bus not found' })
      return
    }
    res.status(200).json(results[0])
  })
}

exports.makePayment = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: 'rzp_test_X9xMqy5AcCDQPE',
      key_secret: 'USJRHFTTLQg8xXlYyWaTfHNu'
    })

    const options = req.body
    const order = await razorpay.orders.create(options)

    if (!order) {
      return res.status(500).send('Error')
    }

    res.json(order)
  } catch (err) {
    console.log(err)
    res.status(500).send('Error')
  }
}

exports.validatePayment = async (req, res) => {
  console.log(req.body)
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    UserID,
    BusID,
    TotalFare,
    selectedSeats,
    seatsNumber,
    mergedSeats
  } = req.body

  const selectedSeatsArray = selectedSeats
  const selectedSeatsString = selectedSeatsArray.join(',')
  const mergedSeatsArray = mergedSeats
  const mergedSeatsString = mergedSeatsArray.join(',')

  const sha = crypto.createHmac('sha256', 'USJRHFTTLQg8xXlYyWaTfHNu')
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)
  const digest = sha.digest('hex')

  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: 'Transaction is not legit!' })
  }

  const bookingDate = new Date().toISOString().split('T')[0]

  try {
    const getBusInfoSql = 'SELECT Fare, seatsLeft FROM bus WHERE BusID = ?'
    conn.query(getBusInfoSql, [BusID], (error, busResults) => {
      if (error) {
        console.error('Error fetching bus info:', error)
        return res.status(500).json({ message: 'Internal server error' })
      }

      if (busResults.length === 0) {
        return res.status(404).json({ message: 'Bus not found' })
      }
      const fare = TotalFare / 100
      const seatsLeft = busResults[0].seatsLeft

      const updatedSeatsLeft = seatsLeft - Number(seatsNumber)

      const updateSeats =
        'UPDATE bus SET seatsLeft = ?,SelectedSeats = ? WHERE BusID = ?'
      conn.query(
        updateSeats,
        [updatedSeatsLeft, mergedSeatsString, BusID],
        (err, results) => {
          if (err) {
            console.log(err)
            throw err
          } else {
            const insertBookingSql =
              'INSERT INTO booking (UserID, BusID, BookingDate, TotalFare,SelectedSeats) VALUES (?, ?, ?, ?, ?)'
            conn.query(
              insertBookingSql,
              [UserID, BusID, bookingDate, fare, selectedSeatsString],
              (error, bookingResults) => {
                if (error) {
                  console.error('Error inserting booking data:', error)
                  return res
                    .status(500)
                    .json({ message: 'Internal server error' })
                }

                var bookingId = bookingResults.insertId
                const insertPaymentSql =
                  'INSERT INTO payment (BookingID, RazorpayTransactionID) VALUES (?, ?)'
                conn.query(
                  insertPaymentSql,
                  [bookingId, razorpay_payment_id],
                  error => {
                    if (error) {
                      console.error('Error inserting payment data:', error)
                      return res
                        .status(500)
                        .json({ message: 'Internal server error' })
                    }
                    res.status(201).json({
                      message: 'Booking and payment created successfully',
                      bookingId
                    })
                  }
                )
              }
            )
          }
        }
      )
    })
  } catch (error) {
    console.error('Error validating payment:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.seatsLeft = async (req, res) => {
  try {
    const id = req.body.id

    conn.query(
      'SELECT seatsLeft FROM bus WHERE BusID = ?',
      [id],
      (error, results) => {
        if (error) {
          console.error('Error retrieving seats left:', error)
          res.status(500).json({ message: 'Internal server error' })
          return
        }
        if (results.length === 0) {
          res.status(404).json({ message: 'Bus not found' })
          return
        }
        const seatsLeft = results[0].seatsLeft

        if (seatsLeft === 0) {
          res.status(201).json({ seatsLeft, status: 'No seats available' })
        } else {
          res.status(200).json({ seatsLeft, status: 'Seats available' })
        }
      }
    )
  } catch (error) {
    console.error('Error checking seats left:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.getBusByCitiesAndDate = (req, res) => {
  const { departureCity, arrivalCity, date } = req.body
  const formattedDate = new Date(date).toISOString().split('T')[0]
  const sql = `
        SELECT *
        FROM bus
        WHERE DepartureCity = ? AND ArrivalCity = ? AND DateOfTravel = ?;
    `
  conn.query(
    sql,
    [departureCity, arrivalCity, formattedDate],
    (error, results) => {
      if (error) {
        console.error('Error fetching bus data:', error)
        return res.status(500).json({ message: 'Internal server error' })
      }

      if (results.length === 0) {
        return res
          .status(201)
          .json({ message: 'No bus found for the provided criteria' })
      }
      console.log('res', results)
      res.status(200).json(results)
    }
  )
}

exports.cancelBooking = (req, res) => {
  const { bookingId } = req.body

  conn.query(
    'SELECT BusID, SelectedSeats FROM booking WHERE BookingID = ?',
    [bookingId],
    (error, bookingResults) => {
      if (error) {
        console.error('Error fetching booking information:', error)
        res.status(500).json({ message: 'Internal server error' })
        return
      }

      if (bookingResults.length === 0) {
        res.status(404).json({ message: 'Booking not found' })
        return
      }

      const busId = bookingResults[0].BusID
      const selectedSeats = bookingResults[0].SelectedSeats.split(',')

      conn.beginTransaction(async err => {
        if (err) {
          console.error('Error starting transaction:', err)
          res.status(500).json({ message: 'Internal server error' })
          return
        }

        try {
          // Delete the booking
          await new Promise((resolve, reject) => {
            conn.query(
              'UPDATE booking SET Status = false WHERE BookingID = ?',
              [bookingId],
              error => {
                if (error) {
                  reject(error)
                } else {
                  resolve()
                }
              }
            )
          })

          // Update the SeatsLeft and SelectedSeats in the bus table
          await new Promise((resolve, reject) => {
            conn.query(
              'SELECT SeatsLeft, SelectedSeats FROM bus WHERE BusID = ?',
              [busId],
              (error, busResults) => {
                if (error) {
                  reject(error)
                  return
                }

                const seatsLeft = busResults[0].SeatsLeft
                const selectedSeatsInBus =
                  busResults[0].SelectedSeats.split(',')

                const updatedSeatsLeft = seatsLeft + selectedSeats.length
                const updatedSelectedSeats = selectedSeatsInBus
                  .filter(seat => !selectedSeats.includes(seat))
                  .join(',')

                conn.query(
                  'UPDATE bus SET SeatsLeft = ?, SelectedSeats = ? WHERE BusID = ?',
                  [updatedSeatsLeft, updatedSelectedSeats, busId],
                  error => {
                    if (error) {
                      reject(error)
                    } else {
                      resolve()
                    }
                  }
                )
              }
            )
          })

          conn.commit(error => {
            if (error) {
              console.error('Error committing transaction:', error)
              conn.rollback(() => {
                res.status(500).json({ message: 'Internal server error' })
              })
            } else {
              res
                .status(200)
                .json({ message: 'Booking cancelled successfully' })
            }
          })
        } catch (error) {
          conn.rollback(() => {
            console.error('Error cancelling booking:', error)
            res.status(500).json({ message: 'Internal server error' })
          })
        }
      })
    }
  )
}

exports.updateBus = (req, res) => {
  const busId = req.params.id
  const updatedBusData = req.body

  try {
    // Update the bus in the database based on the provided ID
    const sql = `UPDATE bus SET ? WHERE BusID = ?`
    conn.query(sql, [updatedBusData, busId], (err, result) => {
      if (err) {
        console.error('Error updating bus:', err)
        res.status(500).json({ message: 'Internal server error' })
        return
      }
      res.status(200).json({ message: 'Bus updated successfully' })
    })
  } catch (error) {
    console.error('Error updating bus:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
