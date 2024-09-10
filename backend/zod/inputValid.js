const { z } = require('zod');

const userSignupSchema = z.object({
    email: z.string().email(),
    firstname : z.string(),
    lastname : z.string(),
    password : z.string().min(8)

})

const userSigninSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8)
})

const updateSchema = z.object({
        // optional means its not necessarily required
    firstname : z.string().optional(),
    lastname : z.string().optional(),
    password : z.string().min(8).optional()
})

const transferSchema = z.object({
    to : z.string(),
    amount : z.number()
})
module.exports = {userSignupSchema, userSigninSchema, updateSchema, transferSchema}