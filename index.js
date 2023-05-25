const express = require("express");
const morgan  = require("morgan");
const axios = require('axios');
const {createProxyMiddleware} = require('http-proxy-middleware')
const rateLimit = require('express-rate-limit');
const e = require("express");

const app = express();

app.use(morgan('combined'));    

const PORT = 3005;

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	
})


app.use(limiter)

app.use('/bookingservice', async (req,res,next) =>{
    try {
        const response = await axios.get('http://localhost:3001/api/v1/isauthenticated', {
            headers : {
                'x-access-token' : req.headers['x-access-token']
            }
        });
        console.log(response.data);
        if(response.data.success){
            next();
        }
        else{
            res.status(401).json({
                message :"Unauthorised / not authenticated"
            }) 
        }
    } 
    catch (error) {
        res.status(401).json({
            message :"Something Unauthorised / not authenticated"
        })    
    }
})

app.use('/bookingservice', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));


app.get('/home', (req,res)=>{
    return res.json({message: "Okay"});
})

app.listen(PORT, () => {
    console.log(`Server is now running on PORT ${PORT}`)
})
