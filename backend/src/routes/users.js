const {Router} = require('express');

const router = Router();

const {createUser,getUsers,deleteUser} = require('../controllers/users.controllers')

router.route('/')
    .get(getUsers)
    .post(createUser)

router.route('/:id')
    .delete(deleteUser)

    
module.exports = router;