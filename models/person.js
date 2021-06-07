const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('Connecting', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(response => {
        console.log('connected to mongoose');
    }).catch(error => {
        console.log('Error connecting to mongoose', erro);
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema);