const express = require('express')
const recipe_router = require('./recipe')

const router = express.Router()


router.use('/recipe', recipe_router)

module.exports = router