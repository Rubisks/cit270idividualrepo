const express = require ('express');
const bodyParser = require('body-parser');// body parser is called middleware
const { response } = require('express');
const md5 = require('md5')

// crates an explress application we cant listen without.
const app = express();
const port = 3000;

app.use(bodyParser.json())// use the middleware(call it before anthing else happens on each request)

// call the listen through APP (express application)
app.listen(port,()=>{console.log("listening on port: " + port)});


// calls get and if there are no path parameters ('/')
app.get('/', (req,res)=>{res.send("Hello")});//every time somthing calls your API that is a request
console.log('app');// responce is when the API responds with data requesteid


app.post('/login',(request,response)=>{ // a post is when a client sends new information to an API
    const loginRequest = request.body;
    //search databace for given username and return password hash
    //compair hashed version given password with stored password hash
    const hashedPasswordFromuser = md5(req.body.password);
    if(loginRequest.userName =="callme@byui.edu" && loginRequest.password=="M@ckB00k"){
        response.status(200); // a 200 code means OK
        response.send("welcome");
    }
    else{
        response.status(401); // 401 mean unautherized
        response.send("401 page not found");
    }
})// a post is when a client sends new information


// calls get and if there are no path parameters ('/')
app.get('/', (req,res)=>{res.send("Hello")});//every time somthing calls your API that is a request
console.log('app');// responce is when the API responds with data requesteid
