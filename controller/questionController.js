
const Question = require('../models/questionModel');
const TestCase = require('../models/testCase')


const addQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    const newQuestion = new Question({ question });
    await newQuestion.save();

    res.status(201).send({status:true,msg:"sucessfully",data:newQuestion})
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};



const editQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    const { id } = req.params;

   const newQuestion= await Question.findByIdAndUpdate(id, { question });

    res.status(200).send({status:true, data:newQuestion, message: 'Question updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};



const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const existingQuestion = await Question.findById(id);

    if (!existingQuestion) {
      res.status(404).json({ status: false, error: 'Question not found' });
      return;
    }

    if (existingQuestion.isDeleted) {
      res.status(200).json({ status: false, message: 'Question already deleted' });
      return;
    }

    const deletedQuestion = await Question.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, upsert: true }
    );

    res.status(200).json({
      status: true,
      message: 'Question deleted successfully',
      id: deletedQuestion._id,
      question: deletedQuestion.question,
      isDeleted: true,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: 'Something went wrong' });
  }
};





const addTestCase = async (req, res) => {
  try {
    const { questionId, input, expectedOutput } = req.body;

    // Check if the test case already exists
    const existingTestCase = await TestCase.findOne({ questionId, input, expectedOutput });
    if (existingTestCase) {
      return res.status(400).json({ error: 'Duplicate test case' });
    }

    const newTestCase = new TestCase({ questionId, input, expectedOutput });
    await newTestCase.save();

    res.status(201).json({ data: newTestCase });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};



// const axios = require('axios');

// const checkSolution = async (req, res) => {
//   try {
//     const { questionId, solution } = req.body;

//     // Retrieve the question and its test cases
//     const question = await Question.findById(questionId).exec();
//     const testCases = await TestCase.find({ questionId }).exec();

//     // Prepare the request payload for the Sphere Engine API
//     const requestPayload = {
//       question: question.question,
//       testCases: testCases.map((testCase) => ({
//         input: testCase.input,
//         output: testCase.expectedOutput,
//       })),
//       solution,
//     };

//     // Make a POST request to the Sphere Engine API
//     const response = await axios.post('https://8daecbda.compilers.s', requestPayload);

//     // Check the response from the Sphere Engine API
//     if (response.data.status === 'success') {
//       res.status(200).json({ status: true, message: 'Solution is correct' });
//     } else {
//       res.status(200).json({ status: false, message: response.data.error });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// };


const checkSolution = async (req, res) => {
  try {
    const { questionId, solution } = req.body;

    // Retrieve the question and its test cases 
    const question = await Question.findById(questionId).exec();
    const testCases = await TestCase.find({ questionId }).exec();

    // Iterate through each test case and compare the solution with the expected output
    let isCorrect = true;
    let error = null;
    for (const testCase of testCases) {
      // Compare the user's solution with the expected output
      if (solution !== testCase.expectedOutput) {
        isCorrect = false;
        error = 'Solution is incorrect';
        break;
      }
    }

    // Prepare the response based on the correctness of the solution
    if (isCorrect) {
      res.status(200).json({ status: true, message: 'Solution is correct',solution });
    } else {
      res.status(200).json({ status: false, message: error });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};



module.exports={addQuestion,editQuestion,deleteQuestion,addTestCase,checkSolution}



// module.exports = { checkSolution };


