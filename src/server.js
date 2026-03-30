// IMPORT BOTH DATABASE AND SERVER 


require('dotenv').config(); //to load .env

const app = require('./app');
const connectDB = require('./config/mongoDB');

connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`server is running in ${process.env.NODE_ENV} in port ${PORT}`)
})
