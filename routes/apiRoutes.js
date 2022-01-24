const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data)
        res.json(JSON.parse(data));
    });
}); // end of router.get

router.post('/notes', (req, res) => {

    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        req.body.id = uuidv4();
        var notes = JSON.parse(data);
        notes.push(req.body); 

        fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            res.json(req.body);
        });
    });

}); // end of router.post

router.delete('/notes/:id', (req, res) => {
    const noteToDelete = req.params.id;

    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        req.body.id = uuidv4();
        var notes = JSON.parse(data);
        var newNotes = notes.filter(note => note.id !== noteToDelete)

        fs.writeFile('db/db.json', JSON.stringify(newNotes), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            res.json(req.body);
        });
    });

}); // end of router.delete

module.exports = router;