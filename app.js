require('dotenv').config();
const express = require('express');
const app = express();
//DB
require('./db/connect'); 
//
const cors = require('cors');
const xssclean = require('xss-clean');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit')


const authRoute = require('./routes/authRoute');
const jobRoute = require('./routes/jobRoute');
const authToken = require('./middleware/authentication');

//Error Handller
const notFoundMeddleware = require('./middleware/not-found');
const errorHandlerMiddle = require('./middleware/error-handler');

app.use(express.json());

const port = process.env.PORT || 3000


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API is running 🚀"
    });
});

// //securty
// app.set('trust proxy', 1);
// app.use(rateLimiter({
//     windowMs:15*60*100, //15 minute
//     max:100, //limit each ip to 100 request
// }))
 app.use(cors());
 app.use(xssclean());
 app.use(helmet());
// //






//routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/jobs',authToken, jobRoute );


app.use(notFoundMeddleware);
app.use(errorHandlerMiddle);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});