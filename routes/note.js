const express = require('express');
const Note = require('../models/note');
const router = express.Router();

// get data
router.get('/', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        // get all data and store into variable
        var notelist = await Note.find({});
        
        // return data response 
        return res.status(200).json(
        {
            data: notelist,
            code: 200,
            message: "List of all note"
        });

    } catch (error) {
        return res.status(400).json(
            {
                data: null,
                code: 400,
                message: error.message
            }
        );
    }
});


// create test (save data)
router.post('/', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        // get data into variable
        const note = new Note(req.body);

        // save to db
        await note.save();

        // return response
        return res.status(201).json(
        {
            data: note,
            code: 200,
            message: "Successfully created"
        });
    } catch (error) {
        return res.status(400).json(
            {
                data: null,
                code: 400,
                message: error.message
            });
    }
});    



// delete test
router.delete('/:id', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        // get id from params
        let { id } = req.params;

        // validate if id exists
        if (!id) {
            return res.status(400).json(
            {
                code: 400,
                message: "Note id not given"
            });
        }    

        // dselete data with id if exists
        await Note.findByIdAndDelete(id);

        // return successful response
        return res.status(200).json(
        {
            code: 200,
            message: "Note deleted"
        });

    } catch (error) {
        return res.status(400).json(
            {
                data: null,
                code: 400,
                message: error.message
            }
        );
    }

});



// update Note
router.patch('/:id', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        // get id from params
        let { id } = req.params;

        // validate if id exists
        if (!id) {
            return res.status(400).json(
            {
                code: 400,
                message: "Note id not given"
            });
        }    

        // update data with id if exists
        await Note.findByIdAndUpdate(id, req.body);

        // return successful response
        return res.status(200).json(
        {
            code: 200,
            data: req.body,
            message: "Note updated"
        });

    } catch (error) {
        return res.status(400).json(
            {
                data: null,
                code: 400,
                message: error.message
            }
        );
    }

});


module.exports = router; 