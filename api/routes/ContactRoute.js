const express = require('express');
const contactRoutes = express.Router();
const UsersController = require('../controllers/UserController')

// Require Contact model in our routes module
let Contact = require('../models/contact');

contactRoutes.route('/').get(UsersController.getAllUsers);
contactRoutes.route('/add').post(UsersController.createUser);
contactRoutes.route('/edit/:id').put(UsersController.editUser);
contactRoutes.route('/update/:id').post(UsersController.updateUser);
contactRoutes.route('/delete/:id').delete(UsersController.deleteUser);


module.exports = contactRoutes;