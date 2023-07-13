const express=require('express')

const router=express();

const userController=require('../controller/userController')

const questionController=require('../controller/questionController')

const authMiddleware=require('../middleware/authMiddleware')


// for signup users

// router.post('/signUp',userController.signUp)

// //for login users

// router.post('/login',userController.login)

// //for admin


// router.post('/question', authMiddleware, questionController.addQuestion);
// router.put('/question/:id', authMiddleware, questionController.editQuestion);
// router.delete('/question/:id', authMiddleware, questionController.deleteQuestion);

// router.post('/question/:questionId/testcase', authMiddleware, questionController.addTestCase);
// router.post('/question/:questionId/solution', authMiddleware, questionController.checkSolution);

// Routes for user-related APIs
// const express = require('express');
// // const router = express.Router();
// const userController = require('../controller/userController');
// const questionController = require('../controller/questionController');
// const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', userController.signUp);
router.post('/login', userController.login);

router.post('/question', authMiddleware, questionController.addQuestion);
router.put('/question/:id', authMiddleware, questionController.editQuestion);
router.delete('/question/:id', authMiddleware, questionController.deleteQuestion);
router.post('/question/:questionId/testcase', authMiddleware, questionController.addTestCase);
router.post('/question/:questionId/solution', authMiddleware, questionController.checkSolution);

module.exports = router;



