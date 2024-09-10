const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Account } = require('../db');
const { userSignupMiddleware, userSigninMiddleware, authMiddleware } = require('../middleware/user')
const { userSignupSchema, userSigninSchema, updateSchema } = require('../zod/inputValid')
const { JWT_SECRET } = require('../config');

const router = Router();


// to register user to db
router.post('/signup', userSignupMiddleware, async (req, res) => {

    const response = userSignupSchema.safeParse(req.body);
    if (!response.success) {
        return res.status(403).json({ error: "Invalid Credentials, Please enter exact info" });
    }
    const { email, firstname, lastname, password } = response.data;


    // hashing password & creating user 
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(password, saltRounds)
    const user = await User.create({
        email: email,
        firstname: firstname,
        lastname: lastname,
        password : hashedPass
    })

    // creating a bank account for the user and crediting the user account with some money between 1-10000
     await Account.create({
        userId : user._id,
        balance : Math.floor(Math.random() *10000 )
    })
    // generating jwt for the user based on the id assigned to user in db
    const userToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "5min" })

    res.status(200).json({
        msg: "User created successfully",
        token: userToken
    })

})


// to signin/ login 
router.post('/signin', userSigninMiddleware, async (req, res) => {

    const response = userSigninSchema.safeParse(req.body);
    if (!response.success) {
        return res.status(403).json({ error: 'Invalid Credentials ' })
    }
    const { email, password } = response.data;

    const user = await User.findOne({
        email
    })

    // verifying password 
    const pass = await bcrypt.compare(password, user.password)
    if (!pass) {
        return res.status(404).json({ err: "incorrect password" })
    }

    // generating jwt for the user based on the id assigned to user in db
    const userToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1hr" })

    res.status(200).json({
        token: userToken
    })
})

// to update user info
router.put('/updateInfo', authMiddleware, async (req, res) => {

    // define zod validation first 
    const response = updateSchema.safeParse(req.body)
    if (!response.success) {
        return res.status(411).json({ err: "error while updating the information" })
    }
    //  so here the logic says that the body would contain either of firstname or lastname or password. If we would have know that what input the user has send then we would have directly updated it but the input is optional so we have to directly update the body which will update whatever the body has 
    const user = await User.updateOne({
        _id: req.userId
    }, req.body)

    res.status(200).json({ message: "Updated Successfully" })
})

// Route to get users from the backend, filterable via firstName/lastName
// here the logic says that write a logic that finds the user based on small chunks as input. For instance if user searches "Poo" it should return the user whose firstname or lastname has that particular string
router.get('/bulk', async (req, res) => {

    // the filter would either be a string searched by the user or if the user didn't search for any string then by default an empty string is assigned to filter that returns all the users from the db
    // cosnt filter = req.query.filter || "" ;

    // const { username } = req.query || "" ; this will retain the username as undefined and also not the correct syntax

    const { username = "" } = req.query;
    const users = await User.find({
        $or: [
            {
                firstname: {
                    $regex: username,
                    $options : 'i'
                }
            },
            {
                lastname: {
                    $regex: username,
                    $options : 'i'
                }
            }
        ]
    })
    res.status(200).json({
        users: users.map((user) => ({
            firstname: user.firstname,
            lastname: user.lastname,
            _id : user._id
        }))
    })
})
module.exports = { router }


// {
//     "email" : "omwadhi@exam.com",
//     "firstname" : "Om",
//     "lastname" : "wadhi",
//     "password" :"12345678"
//   }
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmRmYmZlNzYxYjhkYmMyMzlkMzMxZmIiLCJpYXQiOjE3MjU5Mzk2ODcsImV4cCI6MTcyNTkzOTk4N30.Y7r0-k50SkbTfoFEtj6Sk08yB14hyyyHxOJRftdyheU

// {
// "email" : "pooja@exam.com",
// "firstname" : "Pooja",
// "lastname" : "wadhi",
// "password" :"1234567890"
//   }
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmRmYzAxNjYxYjhkYmMyMzlkMzMyMDAiLCJpYXQiOjE3MjU5Mzk3MzUsImV4cCI6MTcyNTk0MDAzNX0.aJy2XDnh35GzZJ2bXF_6IzDGLRSAelAnk1HB-D_PyS0

// "currentBalance": 6739