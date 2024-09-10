const { Router } = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware/user');
const {transferSchema} = require('../zod/inputValid')
const { Account } = require('../db');

const router = Router();

// an endpoint to get the user's balance 
// based on the jwt token passed by the user in the headers we have to extract userId and then extract info of the users balance

router.get('/balance', authMiddleware, async (req, res) => {

    const { userId } = req;
    

    const user = await Account.findOne({
        userId
    })
    
    res.status(200).json({
        currentBalance: user.balance,
    })

})


// an endpoint to transfer money from one user to another
router.post('/transfer', authMiddleware, async (req, res) => {


    // input validation 
    const response = transferSchema.safeParse(req.body);
    if(!response.success){
        return res.status(403).json({err : "invalid credentials"})
    }

    // initialize the session 
    const session = await mongoose.startSession();

    //start transaction 
    session.startTransaction();
    
    // logic here
    const {to, amount} = req.body;   // to : user._id  

    // check if the user sending exist in the account 
    const user = await Account.findOne({
        userId : req.userId 
    }).session(session)
    if(!user){
        await session.abortTransaction();
        return res.status(400).json({err : "No such user exist "})
    }
    if( user.balance < amount){
       await session.abortTransaction();
        return res.status(400).json({msg : "User has insufficient balance"})
    }

    // now check the receiver existence in the account db
    const receiver = await Account.findOne({
        userId : to
    }).session(session)
    if(!receiver){
        await session.abortTransaction();
        return res.status(400).json({msg : "Receiver doesn't exist"})
    }
    
    // now perform the transfer logic 

    // decrementing the user's balance 
    await Account.updateOne({userId : req.userId }, {
        $inc : {
            balance : -amount
        }
    }).session(session)

    // incrementing the receiver's balance 
    await Account.updateOne({userId : to }, {
        $inc : {
            balance : amount
        }
    }).session(session)

    // committing the whole logic
    await session.commitTransaction();

    res.status(200).json({msg : "Transfer Successfull"})
})
module.exports = { router }