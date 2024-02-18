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
   const orders =  await Order.find().populate('senderId')
   res.json({orders})
}


const getOrderDetailById  =async(req,res)=> {
    const ordersDetails =  await Order.findById(req.params.id)
    res.json({ordersDetails})
 }
 

module.exports= {saveOrderDetails,getAllOrders,getOrderDetailById}