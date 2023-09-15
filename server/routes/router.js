const express = require('express')
const route = express.Router()

const services = require('../services/render')
const controller = require('../controller/controller')


/**
*@decription Root Route
*@method GET
 */

route.get('/',services.homeRoutes)

/**
*@decription add users
*@method GET
 */

route.get('/add-user',services.add_user)

/**
*@decription update user 
*@method GET
 */

route.get('/update-user',services.update_user)


//API
route.post('/api/users',controller.create)
route.get('/api/users',controller.find)
route.get('/api/users/:id', controller.findUserById);
route.put('/api/users/:id',controller.update)
route.delete('/api/users/:id',controller.delete)


module.exports = route