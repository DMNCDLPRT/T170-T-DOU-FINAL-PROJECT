const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
    mongoose.connect('mongodb+srv://dmnc:JUQVFTj92vt8qRjt@customerdatabase.pspse.mongodb.net/StoreData?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(() => winston.info('MongoDb connected successfuly...'));
}