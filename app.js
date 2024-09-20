const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const cors = require('cors')
const cookieParser = require('cookie-parser');



require("./db/sequelizeSetup")

const corsOptions = {
    credentials: true,
    origin : 'http://localhost:5173'
};


app
    .use(morgan('dev'))
    .use(cors(corsOptions))
    .use(express.json())
    .use(cookieParser());


// const companyRouter = require('./routes/companyRoutes')
const userRouter = require('./routes/userRoutes')
const postingRouter = require('./routes/postingRoutes')

// app.use('/company', companyRouter)
app.use('/user', userRouter)
app.use('/posting', postingRouter)
app.use("*", (req, res) => {
    res.status(404).json({message : "error 404 url not found"})    
})


app.listen(port, () => console.log(
	`Notre application Node est démarrée sur : http://localhost:${port}`)
)
