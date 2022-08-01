//
const express = require('express');
const PORT = process.env.PORT || 4321;
const app = express();
const path = require('path')
// includes the api route in the server.
const api_routes = require('./routes/api_routes')

// joining the server.js with the public file 
app.use(express.static(path.join(__dirname, '/Develop/public')));
console.log(path.join(__dirname, '/Develop/public'));
// attach form data to request.body object 
app.use(express.urlencoded({extended: true}));
//all express to parse JSON data 
app.use(express.json())

// display the homepage
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/Develop/public/index.html');
})
// display the notes page
app.get('/notes', (request, response) =>{
    response.sendFile(__dirname + '/Develop/public/notes.html');
})

//localhost:4321/api
app.use('/api', api_routes)
// starting the server
app.listen(PORT, () => {
    console.log(`listing on local host ${PORT} `)
})
//s