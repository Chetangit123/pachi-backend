const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
// const { connectDB } = require('./src/config/dbConnection');
require('dotenv').config();
// const Router = require('./src/routes/indexRouter')

const app = express();

app.use(helmet());
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// app.use('/api/v1', Router)

app.get('/api/dummy', (req, res) => {
    res.json({
        message: "Hello World",
        status: 200
    })
})

const PORT = process.env.PORT || 3003
// connectDB().then(() => {
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// }).catch(error => {
//     console.error('Failed to connect to MongoDB', error);
// });
