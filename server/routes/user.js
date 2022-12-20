const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get('/teacher', userController.view_teacher);
router.post('/teacher', userController.find_teacher);


router.get('/student_check', userController.form_student);
router.post('/student_check', userController.find_teacher);


router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.update);
router.get('/viewuser/:id', userController.viewall);
router.get('/:id',userController.delete);
  
module.exports = router;