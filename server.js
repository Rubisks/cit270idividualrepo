const express = require ('express');
const bodyParser = require('body-parser');// body parser is called middleware
const {response} = require('express');
const md5 = require('md5');
const {createClient} = require('redis')

const redisClient = createClient();//  create a client to talk to redis hash maps

// crates an explress application we cant listen without.
const app = express();
const port = 3000;
redisClient.connect();

app.use(bodyParser.json())// use the middleware(call it before anthing else happens on each request)

// call the listen through APP (express application)
app.listen(port,()=>{console.log("listening on port: " + port)});


// calls get and if there are no path parameters ('/')
app.get('/', (req,res)=>{res.send("Hello")});//every time somthing calls your API that is a request
console.log('app');// responce is when the API responds with data requesteid


app.post('/login', async (request,response)=>{ // a post is when a client sends new information to an API

    // hashes the password given by the user to comair to hashed pasword stored in redis
    const hashedPasswordFromuser = md5(request.body.password);

    const password = await redisClient.hGet("cradentials", request.body.userName)


    const loginRequest = request.body;
    console.log('Request Body', JSON.stringify(request.body));
    //search databace for given username and return password hash

    //compare hashed version given password with stored password hash
    
    if(request.body.userName == "callme@byui.edu" && password == hashedPasswordFromuser){
        response.status(200); // a 200 code means OK
        response.send("welcome");
        console.log("user was logged in")
    }
    else{
        response.status(401); // 401 mean unautherized
        response.send("401 page not found");
    }
})// a post is when a client sends new information


// calls get and if there are no path parameters ('/')
app.get('/', (req,res)=>{res.send("Hello")});//every time somthing calls your API that is a request
console.log('app');// responce is when the API responds with data requesteid
