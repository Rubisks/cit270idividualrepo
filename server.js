const express = require ('express');
const bodyParser = require('body-parser');// body parser is called middleware
const { response } = require('express');

// crates an explress application we cant listen without.
const app = express();
const port = 3000;

app.use(bodyParser.json())// use the middleware(call it before anthing else happens on each request)
// call the listen through APP (express application)
app.listen(port,()=>{console.log("listening on port: " + port)});


// calls get and if there are no path parameters ('/')
app.get('/', (req,res)=>{res.send("Hello")});//every time somthing calls your API that is a request
console.log('app');// responce is when the API responds with data requesteid


app.post('/login',(request,response)=>{
    const loginRequest = request.body;
    if(loginRequest.userName =="callme@byui.edu" && loginRequest.password=="M@ckB00k"){
        response.status(200);
        response.send("welcome");
    }
    else{
        response.status(401);
        response.send("401 page not found");
    }
})// a post is when a client sends new information


// calls get and if there are no path parameters ('/')
app.get('/', (req,res)=>{res.send("Hello")});//every time somthing calls your API that is a request
console.log('app');// responce is when the API responds with data requesteid
