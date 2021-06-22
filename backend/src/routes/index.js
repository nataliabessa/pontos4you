const router = require('express').Router()

const userController = require('./user')
const pointsController = require('./points')
const clientsController = require('./clients')

const verifyJWT = require('../infra/verifyJwt')

router.post('/login', userController.login)
router.post('/user', userController.create)

router.get('/client', verifyJWT, clientsController.get)
router.post('/client', verifyJWT, clientsController.create, pointsController.create)

router.get('/points', verifyJWT, pointsController.get)
router.put('/points', verifyJWT, pointsController.set)

module.exports = router
