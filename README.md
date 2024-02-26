Features
Phase 1
- Auth 
    -  Login required to access portal
    - Register
- Order creation:
    - Address: map (location…..)
    - Form: documents + parcel,  image upload (multer+react dragdropzone), calendar + time picker (emergency 5 hrs) 30km/hr
    - Sender form: senderName, phoneNumber,
- Order tracking by receiver
- Order history
- Sender receives notification when item is delivered
- Pricing: Location+Weight+category
- Live location tracking   (socket.io)


Phase 2:
- Analytics (react charts):
    - rider  month vs order taken   (bar graph)
    - rider total distance
    - rider sales vs months
    - rider -> user revisiting orders

    - users orders count vs month  (line graph)
    - users orders count vs month  (%parcel %documents)


- Payment gateway
- Generate QR for order details
//https://api.qrserver.com/v1/create-qr-code/?data=http://localhost:4000/orders&size=100x100
- Deploy-> vercel and render
-> Google/github 
-> route protext

flow: 

login ---> home 



