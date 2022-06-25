const express = require('express');
const app = express();
const bodyparser = require('body-parser');
require('./db/connection');
require('dotenv').config({ path: __dirname + '/config/.env' })

const cookieparser = require('cookie-parser')

const userRouter = require('./router/user')
const adminRouter = require('./router/admin')


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieparser())

app.use(userRouter)
app.use(adminRouter)


app.listen(4000, () => {
    console.log("server is up on the port 4000");
})