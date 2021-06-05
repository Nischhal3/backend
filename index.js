const { request, response } = require('express');
const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());

//middleware sample
/* const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger); */

morgan.token('body', (req) => JSON.stringify(req.body));

morgan.token('custom', (req, res) => {
    return (
        `${req.method} ${req.url}`
    )
})

app.use(morgan(':custom :status - :response-time ms :body'));

let persons = [
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
]
//retrieves root of the server
app.get('/', (request, response) => {
    response.send('<h1>Phonebook<h1>');
})

app.get('/info', (req, res) => {
    let time = new Date();

    res.send(`<div>
    <p>Phonebook holds infro for ${persons.length} people</p>
    <p>${time} </p>
    </div>`)
})

//retrives all persons in the collection
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//retrives certain person by id
app.get('/api/persons/:id', (request, response) => {
    // converting string id to number id
    const id = Number(request.params.id);
    //console.log(id, typeof id)
    const person = persons.find(person => person.id === id);
    if (person) {
        response.json(person);
    } else {
        //if no id is found this error is displayed
        response.status(404).end();
    }
})

//delete person by id through postman or vscode .rest file code
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
})

/**
 * Generates random id from 1-20 which is not equal to person id 
 * @returns id
 */
const generateId = () => {
    let id = 0;
    const checkId = persons.map(person => {
        return person.id;
    })

    //Loop runs until person id is not equal to id
    do {
        //prints random number from 1 - 20
        id = Math.floor(Math.random() * 20) + 1;
    } while (checkId.includes(id));

    return id;
}

//adding person to the server
app.post('/api/persons', (request, response) => {
    const body = request.body;
    //console.log(request.body);
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    } else {
        const person = {
            id: generateId(),
            name: body.name,
            number: body.number
        }
        const checkName = persons.map(person => {
            return person.name;
        })

        if (checkName.includes(body.name)) {
            return response.status(400).json({
                error: 'name must be unique'
            })
        } else {
            persons = persons.concat(person);
        }

        //console.log("Name are", checkName);
        response.json(person);
    }
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
