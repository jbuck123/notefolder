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

// create?

notes_router.post('/notes', (request, response) => {
    getNoteDB()
        .then((notes_data) => {
            const new_note = request.body;
            // using uuid to create unique ids for each note
            new_note.id = uuid().slice(0,4);


            notes_data.push(new_note);

            // write the note to the DB

            fs.promises.writeFile(db_path, JSON.stringify(notes_data, null, 2))
                .then(() => {
                    console.log('added successfully')
                    response.json(notes_data)
                })
                .catch(err => console.log(err))

        })
})
//Update or Delete?
// deleter 
notes_router.delete('/notes', (request, response) => {
    getNoteDB()
        .then(notes => {
            const id = request.body.id;
            // find itterates like for each but breaks when it finds the matching index
            const obj = notes.find(notes.id === id);
            // indexOF method is used to return to the first occurrence of a specified value in a string
            const index = notes.indexOf(obj);
            //splice method changes the contents of an arary by removing or replacing existing elements and or adding new elemnts in place
            notes.splice(index, 1);

            fs.promises.writeFile(db_path, JSON.stringify(notes, null, 2))
                .then(() => {
                    console.log("notes updated successfully")
                    response.json(todos)
                })
                .catch(err => console.log(err));
        })
})









console.log('test')







module.exports = notes_router;
