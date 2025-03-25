const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const conn = require('../Api/config/connection')
const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes')


const app = express();
const port = 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());


app.use('/api', userRoutes, busRoutes);
app.use(express.static('public'));
app.use('', express.static('uploads'));


if (conn) {

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
} else {
    console.error('Error connecting to MySQL database: ' + err.stack);
}