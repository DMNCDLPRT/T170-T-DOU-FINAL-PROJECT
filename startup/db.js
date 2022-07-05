const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(() => winston.info('MongoDb connected successfuly...'));
}