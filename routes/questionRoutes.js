const express = require('express');
const questionController = require('../controller/questionController')
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/question', authMiddleware, questionController.addQuestion);
router.put('/question/:id', authMiddleware, questionController.editQuestion);
router.delete('/question/:id', authMiddleware, questionController.deleteQuestion);

router.post('/question/:questionId/testcase', authMiddleware, questionController.addTestCase);
router.post('/question/:questionId/solution', authMiddleware, questionController.checkSolution);

module.exports = router;
