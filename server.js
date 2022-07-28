
const express = require('express');
const PORT = process.env.PORT || 4321;
const app = express();
const path = require('path')

const api_routes = require('./routes/api_routes')

app.use(express.static(path.join(__dirname, 'public')));

// display the homepage
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/Develop/public/index.html');
})
// display the notes page
app.get('/notes', (request, response) =>{
    response.sendFile(__dirname + '/Develop/public/notes.html');
})


app.use('/api', api_routes)

app.listen(PORT, () => {
    console.log(`listing on local host ${PORT} `)
})
