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

module.exports = router;