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
router.post('/api/signup', userController.signUp);
router.post('/api/login', userController.login);

// Routes for question-related APIs
router.post('/api/question', authMiddleware, questionController.addQuestion);
router.put('/api/question/:id', authMiddleware, questionController.editQuestion);
router.delete('/api/question/:id', authMiddleware, questionController.deleteQuestion);
router.post('/api/question/:questionId/testcase', authMiddleware, questionController.addTestCase);
router.post('/api/question/:questionId/solution', authMiddleware, questionController.checkSolution);

module.exports = router;


module.exports=router;

