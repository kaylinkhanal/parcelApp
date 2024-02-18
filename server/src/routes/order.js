const express = require('express')
router = express.Router()
const {saveOrderDetails,getAllOrders,getOrderDetailById}  = require('../controllers/order')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/orders/')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
router.post('/orders', upload.single('orderImage'), saveOrderDetails)
router.get('/orders', getAllOrders)
router.get('/orders/:id', getOrderDetailById)

module.exports = router