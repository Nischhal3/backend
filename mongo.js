const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];
const nameToAdd = process.argv[3];
const numberToAdd = process.argv[4];

const url =
    `mongodb+srv://fullstack:${password}@cluster0.pepxt.mongodb.net/phonebook-app?retryWrites=true`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema);

const person = new Person({
    name: nameToAdd,
    number: numberToAdd,
})

if (process.argv.length === 3) {
    console.log("Phonebook");
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number);
        })
        mongoose.connection.close();
    })
} else {
    person.save().then(response => {
        console.log(`added ${person.name} number ${person.number} to phonebook`);
        mongoose.connection.close();
    })
}