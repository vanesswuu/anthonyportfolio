// SERVER CONFIGURATION

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares/errorHandler');


//import routes here
const authRoutes = require('./routers/authRoutes');
const planRoutes = require('./routers/planRoutes');
const subscriptionRoutes = require('./routers/subscriptionRoutes');
const uploadRoutes = require('./routers/uploadRoutes');
const workoutRoutes = require('./routers/workoutRoutes');
const statsRoutes = require('./routers/statsRoutes');



//server
const app = express();






//middlewares
app.use(express.json()); //to parse the body //to make the request string/json an object
app.use(cors()); //
app.use(morgan('dev'));



//use routes here
app.use('/api/auth', authRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/stats', statsRoutes);


//error handler
app.use(errorHandler);

module.exports = app;


