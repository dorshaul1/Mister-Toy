const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getToy, getToys, deleteToy, updateToy,addToy} = require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getToys)
router.get('/:toyId', getToy)
router.post('/',  addToy)
router.put('/:toyId',  updateToy)

// router.put('/:id',  requireAuth, updateToy)
router.delete('/:toyId',requireAuth, deleteToy)

module.exports = router