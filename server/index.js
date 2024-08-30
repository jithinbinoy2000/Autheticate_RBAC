require('dotenv').config();
const cors = require('cors');
const express = require('express');
const router = require('./Routes/route');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(router)
app.listen(3000,()=>{
    console.log(`Server Started Running @ port ${port || 3000}`);
})
app.get('/',(request,response)=>{
    response.send("Server Listening at Port 3000")
})