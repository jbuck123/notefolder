const notes_router = require('express').Router();
const fs = require("fs");
const path = require('path');
const uuid = require('uuid').v4;
// const mysql = require('mysql2');
const db_path = path.join(__dirname, "../db/db.json")


// CRUD
// write the function that reads the notes from the DB

function getNoteDB(){
    return fs.promises.readFile(db_path, 'utf8')
        .then(data => JSON.parse(data))
       
}
// READ
notes_router.get('/notes', (request, response) => {
    getNoteDB()
        .then(notes_data => response.json(notes_data))
        .catch(err => console.log(err));

        console.log('recieved the notes mate')
})

// UPDATE 

notes_router.post('/notes', (request, response) => {
    getNoteDB()
        .then((notes_data) => {
            const new_note = request.body;
            // using uuid to create unique ids for each note
            new_note.id = uuid().slice(0,4);


            notes_data.push(new_note);

            // write the note to the DB

            fs.promises.writeFile(db_path)

            console.log(notes_data)

        })
})








console.log('test')







module.exports = notes_router;
