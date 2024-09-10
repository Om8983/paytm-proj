const express = require("express");
const cors = require('cors');
const {router} = require('./routes/user');
const {router : accountRouter} = require('./routes/accounts')
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/v1/user', router)
app.use('/api/v1/account', accountRouter)

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
    
})

