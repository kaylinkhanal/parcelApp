const Order = require('../models/order')

const saveOrderDetails = async(req,res)=>{
    req.body.senderCoords= JSON.parse(req.body.senderCoords)
    req.body.receiverCoords= JSON.parse(req.body.receiverCoords)
    req.body.shipmentDetails = JSON.parse(req.body.shipmentDetails)
    req.body.orderImage= req.file.filename
    await Order.create(req.body)
    res.json({msg: 'Order created successfully'})
}



const getAllOrders  =async(req,res)=> {
   const orders =  await Order.find()
   res.json({orders})
}
module.exports= {saveOrderDetails,getAllOrders}