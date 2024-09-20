const express = require('express')
const { getUsers, postUser, getUserById, updateUser } = require('../controllers/userController')
const { login, logout } = require('../controllers/authController')
const router = express.Router()


router
    .route('/')
    .get(getUsers)
    .post(postUser)

router
    .route('/login')
    .post(login)

router
    .route('/logout')
    .post(logout)

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    
module.exports = router