const {Router} = require('express');
const { route } = require('./users');

const {getNotes,getNote,deleteNote,updateNotes,createNote} = require('../controllers/notes.controllers');

const router = Router();

router.route('/')
    .get(getNotes)
    .post(createNote)

router.route('/:id')
    .get(getNote)
    .put(updateNotes)
    .delete(deleteNote)

module.exports = router;