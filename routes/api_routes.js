
const notes_router = require('express').Router();


// CRUD
// write the function that reads the notes from the DB

function getNoteDB(){
    return fs.promises.readFile(db_path, 'utf8')
        .then(data => JSON.parse(data))
       
}
// READ
notes_router.get('/notes', (request, response) => {
    getNoteDB()
        .then(notes => response.json(notes))
        .catch(err => console.log(err));

        console.log('recieved the notes mate')
})

// UPDATE







console.log('test')







module.exports = notes_router;
