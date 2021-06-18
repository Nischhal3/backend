const Person = require('../models/person')

const initialPerson = [
    {
        name: "Dan Abramov",
        number: "39-44-666",
        id: "60bb969b003242aeb94559d2"
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323",
        id: "60bb96b4003242aeb94559d3"
    },
    {
        name: "Arto Hellas",
        number: "22-44344",
        id: "60bb96bf003242aeb94559d4"
    }
]

const nonExistingId = async () => {
    const person = new Person({
        name: 'will remove this soon',
        number: '00000'
    })
    await person.save();
    await person.remove();
}

const personInDb = async () => {
    const persons = await Person.find({})
    return persons.map(person => person.toJSON())
}

module.exports = {
    initialPerson, nonExistingId, personInDb
}