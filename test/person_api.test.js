const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('Persons are returned to json', async () => {
    await api
        .get('/api/persons')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('the first person is ', async () => {
    const response = await api.get('/api/persons')
    //console.log(response);
    expect(response.body[0].name).toBe('Dan Abramov')
})

test('There are three persons', async () => {
    const response = await api.get('/api/persons')

    expect(response.body).toHaveLength(3);
})
afterAll(() => {
    mongoose.connection.close()
})