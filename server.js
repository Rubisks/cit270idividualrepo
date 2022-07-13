const express = require ('express');
const https = require ('https');
const fs = require('fs');
// crates an explress application we cant listen without.
const port = 3000;
const app = express();
const md5 = require('md5');
const bodyParser = require('body-parser');// body parser is called middleware
const {createClient} = require('redis');


const redisClient = createClient(    
    {
        //external ip address for redis
        url: 'redis://default: @35.239.149.196:6379',

        // saved redis url that is used localy for node server
        //url: 'redis://default: @10.128.0.2:6379',
        socket:{
            port:6379,
            host:"127.0.0.1",
        },
        
    }
);

app.use(bodyParser.json());// use the middleware(call it before anthing else happens on each request)
// comment 
// call the listen through APP (express application)
// https.createServer({
//     key: fs.readFileSync('server.key'),
//     cert: fs.readFileSync('server.cert'),
//     passphrase :'P@ssw0rd',
// },app).listen(port, async ()=>{
//     await redisClient.connect();// makes a connections to redis database
//     console.log("listening on port: " + port);
// });
app.listen(port,async()=>{
    await redisClient.connect();
    console.log('listening on port: ' , port)
})

// calls get and if there are no path parameters ('/')
app.get('/', (req,res)=>{res.send("Hello")});//every time somthing calls your API that is a request
console.log('app');// responce is when the API responds with data requesteid


const validatePassword = async (request,response)=>{
    
// hashes the password given by the user to comair to hashed pasword stored in redis
    const hashedPasswordFromuser = md5(request.body.password);// get password from user and hash it
    const password = await redisClient.hGet("cradentials", request.body.userName)
    console.log('Request Body', JSON.stringify(request.body));
    //search databace for given username and return password hash

    //compare hashed version given password with stored password hash
    
    if(password == hashedPasswordFromuser){
        response.status(200); // a 200 code means OK
        response.send("welcome");
        console.log("user was logged in")
    }
    else{
        response.status(401); // 401 mean unautherized
        response.send("Unauthorized");
    }
}

const signup = async (request, response)=>{
    const newHashedPassword = md5(request.body.password);
    await redisClient.hSet("cradentials", request.body.userName, newHashedPassword);
    response.status(200);
    response.send({result:"saved"});
    console.log(request.body);
}
// calls get and if there are no path parameters ('/')
app.get('/', (req,res)=>{res.send("Hello")});//every time somthing calls your API that is a request

console.log('app');// responce is when the API responds with data requesteid

app.post('/login', validatePassword);// a post is when a client sends new information

// gets cradentials uppon signup 
app.post('/signup', signup);