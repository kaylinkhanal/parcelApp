const Order = require('../models/order')
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
     user: "kyalin.khanal@gmail.com",
     pass: "bjfexdfjosvzwgtz",
   },
 });


const saveOrderDetails = async(req,res)=>{
   try{
      console.log(req.body)
      req.body.senderCoords= JSON.parse(req.body.senderCoords)
      req.body.receiverCoords= JSON.parse(req.body.receiverCoords)
      req.body.shipmentDetails = JSON.parse(req.body.shipmentDetails)
      req.body.orderImage= req.file.filename
      const createdOrder = await Order.create(req.body)
      res.json({msg: 'Order created successfully' ,orderId: createdOrder})
   }catch(err){
      console.log(err)
   }
}



const getAllOrders  =async(req,res)=> {
   try{
      const skipCount = (req.query.page -1) * 10 
      const orderCount =  await Order.find({status: req.query.filterBy}).count()
      const orders =  await Order.find({status: req.query.filterBy}).populate('senderId').limit(10).skip(skipCount)
      res.json({orders,orderCount})
   }catch(err){
      console.log(err)
   }

}

const getAllOrdersForUserId  =async(req,res)=> {
   try{
      const orders =  await Order.find({senderId: req.params.id}).populate('senderId')
      res.json({orders})
   }catch(err){
      console.log(err)
   }

}

const getOrderDetailById  =async(req,res)=> {
   try{
      console.log(req.params.id)
    const ordersDetails =  await Order.findById(req.params.id).populate('senderId')
    res.json({ordersDetails})
   }catch(err){
      console.log(err)
   }
 }


 const generateMailText =(orderDetails)=> {
const {shipmentDetails, status, _id,senderAddr} = orderDetails
   switch (status) {
      case 'approved':
         return `Your order ${_id} has been approved`
         break;
      case 'pickedUp':
         return `Your order ${_id} has been picked up from ${senderAddr}`
      default:
         return `Your order has been sent`
         break;
   }
 }

 const changeOrderStatus =  async(req,res)=> {
   try{
      const ordersDetails =  await Order.findById(req.params.id).populate('receiverId')
      ordersDetails.status = req.body.status
      ordersDetails.riderId = req.body.riderId
      const receiverEmail = ordersDetails.receiverId.email
      
      await transporter.sendMail({
         from: 'kyalin.khanal@gmail.com', 
         to: receiverEmail, 
         subject: `Order ${ordersDetails._id} has been ${ordersDetails.status}`, // Subject line
         text: generateMailText(ordersDetails), // plain text body
         html: 'Embedded image: <img src="https://api.qrserver.com/v1/create-qr-code/?data=http://localhost:3000/orders/'+ordersDetails._id+'&size=100x100"/>',

       });
      ordersDetails.save()
      res.json({"msg": "Order Status updated"})
   }catch(err){
      console.log(err)
   }
 
 }
 

module.exports= {saveOrderDetails,getAllOrdersForUserId,getAllOrders,getOrderDetailById,changeOrderStatus}
