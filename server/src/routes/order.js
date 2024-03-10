const express = require('express')
router = express.Router()


const {saveOrderDetails,getAllOrders,getOrderDetailById,getAllOrdersForUserId,changeOrderStatus}  = require('../controllers/order')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/order-image/')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
router.post('/orders', upload.single('orderImage'), saveOrderDetails)
router.get('/orders', getAllOrders)
router.get('/orders/users/:id', getAllOrdersForUserId)
router.patch('/orders/:id', changeOrderStatus)
router.get('/orders/:id', getOrderDetailById)


module.exports = router