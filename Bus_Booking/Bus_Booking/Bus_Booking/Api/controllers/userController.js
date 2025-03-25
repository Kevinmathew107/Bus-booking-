const conn = require('../config/connection');

exports.createUser = (req, res) => {
    const { firstName, lastName, email, phone, password, gender } = req.body;


    conn.query('SELECT * FROM Users WHERE email = ?', email, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        if (results.length > 0) {
            res.status(400).json({ message: 'User with the same email already exists' });
            return;
        }
        const newUser = { firstName, lastName, email, phone, password, gender };
        conn.query('INSERT INTO Users SET ?', newUser, (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }

            res.status(201).json({ message: 'User created successfully' });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    conn.query('SELECT * FROM Users WHERE email = ? AND password = ?', [email, password], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        if (results.length === 0) {

            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        if (results[0].isAdmin === 1) {

            res.status(402).json({ message: 'Admin login not allowed!!' });
            return;
        }

        const user = results[0];
        res.status(200).json(user);
    });
};

exports.loginAdmin = (req, res) => {
    const { email, password } = req.body;
    conn.query('SELECT * FROM Users WHERE email = ? AND password = ?', [email, password], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        if (results[0].isAdmin === 0) {
            res.status(402).json({ message: 'Customer login not allowed!!' });
            return;
        }
        const user = results[0];
        res.status(200).json(user);
    });
};


exports.getUserBookings = (req, res) => {
    const userId = req.body.UserID;

    const sql = `
    SELECT B.BookingID, B.UserID, B.BookingDate,B.SelectedSeats,BU.BusName, BU.DepartureCity, BU.ArrivalCity, BU.DateOfTravel,BU.DateOfArrival, BU.DepartureTime, BU.ArrivalTime,B.TotalFare, U.Email
    FROM booking AS B
    JOIN bus AS BU ON B.BusID = BU.BusID
    JOIN users AS U ON B.UserID = U.UserID Where U.UserID=? AND B.status = true
    ORDER BY B.BookingDate DESC;
    `;
    conn.query(sql, [userId], (error, results) => {
        if (error) {
            console.error("Error fetching user bookings:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json(results);
    });
};

exports.getAllBookings = (req, res) => {
    const sql = `
        SELECT B.BookingID, B.UserID,B.Status, B.BookingDate,B.SelectedSeats,BU.BusName, BU.DepartureCity, BU.ArrivalCity, BU.DateOfTravel,BU.DateOfArrival, BU.DepartureTime, BU.ArrivalTime,B.TotalFare, U.Email
        FROM booking AS B
        JOIN bus AS BU ON B.BusID = BU.BusID
        JOIN users AS U ON B.UserID = U.UserID
        ORDER BY B.created_at DESC;
    `;
    conn.query(sql, (error, results) => {
        if (error) {
            console.error("Error fetching bookings:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json(results);
    });
};