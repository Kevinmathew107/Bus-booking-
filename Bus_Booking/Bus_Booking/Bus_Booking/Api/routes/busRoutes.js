const express = require('express')
const router = express.Router()
const busController = require('../controllers/busController')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + '-' + file.originalname
        req.body.BusImage = filename
        cb(null, filename)
    }
})

const upload = multer({ storage: storage })

router.get('/buses', busController.getAllBuses)
router.post('/buses', upload.single('BusImage'), busController.createBus)
router.get('/bus/:id', busController.getBusById)
router.post('/payment', busController.makePayment)
router.post('/validate', busController.validatePayment)
router.post('/seatsleft', busController.seatsLeft)
router.post('/checkdate', busController.getBusByCitiesAndDate)
router.post('/contactus', busController.contactUs)
router.post('/deletebooking',busController.cancelBooking)
router.put('/updatebus/:id',busController.updateBus)


module.exports = router