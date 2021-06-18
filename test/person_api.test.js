const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Person = require('../models/person');
const helper = require('./test_helper')


beforeEach(async () => {
    await Person.deleteMany({})

    let personObject = new Person(helper.initialPerson[0])
    await personObject.save()

    personObject = new Person(helper.initialPerson[1])
    await personObject.save()

    personObject = new Person(helper.initialPerson[2])
    await personObject.save()
})

test('Persons are returned to json', async () => {
    await api
        .get('/api/persons')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})


test('There are three persons', async () => {
    const response = await api.get('/api/persons')

    expect(response.body).toHaveLength(helper.initialPerson.length);
})

test('a specific person is in the list ', async () => {
    const response = await api.get('/api/persons')
    //console.log(response);
    const names = response.body.map(r => r.name);

    expect(names).toContain('Arto Hellas');
})

test('person to add', async () => {
    const newPerson = {
        name: 'Nischhal from async',
        number: '64646-9393'
    }

    await api
        .post('/api/persons')
        .send(newPerson)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const namesAtEnd = await helper.personInDb()
    expect(namesAtEnd).toHaveLength(helper.initialPerson.length + 1)

    const names = namesAtEnd.map(person => person.name)
    expect(names).toContain('Nischhal from async')
})

test('person with no name', async () => {
    const newPerson = {
        name: '',
        number: '747-848'
    }

    await api
        .post('/api/persons')
        .send(newPerson)
        .expect(400)

    const namesAtEnd = await helper.personInDb()
    console.log('length', helper.initialPerson.length);
    expect(namesAtEnd).toHaveLength(helper.initialPerson.length)
})

afterAll(() => {
    mongoose.connection.close()
})