const express=require('express')

const router=express();

const userController=require('../controller/userController')


// for signup users

router.post('/signUp',userController.signUp)

//for login users

router.post('/login',userController.login)


module.exports=router;

