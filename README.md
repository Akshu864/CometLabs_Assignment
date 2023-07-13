Installation
To run this project, we have to install these following pacakages:

mongoose
bcrypt
jsonwebtoken
express
nodemon

Wecan install these packages by running the following command:

npm install mongoose bcrypt jsonwebtoken express nodemon


Usage:

User Routes

SignUp
Endpoint: localhost:3000/signup

Method: POST

Description: This route is used to sign up users.


Login

Endpoint: localhost:3000/login

Method: POST

Description: This route is used to log in users.


questionRoutes:

Add Question

Endpoint: localhost:3000/question

Method: POST


Description: This route is used to add a new question.


Edit Question

Endpoint: localhost:3000/question/:id

Method: PUT

Description: This route is used to edit an existing question.


Delete Question
Endpoint: localhost:3000/question/:id

Method: DELETE

Description: This route is used to delete a question.


Add Test Case

Endpoint:localhost:3000/question/:questionId/testcase

Method: POST

Description: This route is used to add a test case to a question.


Check Solution

Endpoint:localhost:3000/question/:questionId/solution

Method: POST

Description: This route is used to check the solution for a question.

To run the server command is npm start.


