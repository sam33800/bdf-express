const express = require('express')
const { getPostings, createPosting, updatePosting, deletePosting, getMyPostings, findPostingByPk } = require('../controllers/postingController')
const { protect, restrictToOwnUser } = require('../middleware/auth')
const { Posting } = require('../db/sequelizeSetup')
const router = express.Router()

router
    .route('/')
    .get(protect, getPostings)
    .post(protect, createPosting)

router
    .route('/mypost')
    .get(protect, getMyPostings)

router
    .route('/:id')
    .get(protect, restrictToOwnUser(Posting), findPostingByPk)
    .put(protect, restrictToOwnUser(Posting), updatePosting)
    .delete(protect,restrictToOwnUser(Posting) , deletePosting)

module.exports = router
