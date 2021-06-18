npx create-react-app my-app (To create frontend app)

Backend server instructions:
->npm init
->npm install express
->npm install morgan (expectional)
->npm install --save-dev nodemon (installing nodemon)
->npm run dev (Starting server)
->npm install cors (Same origin policy)


In package.json add follwoing to the script of the backend
"start": "node index.js",
"dev": "nodemon index.js"

Application for internet:
For backend
create Procfile in root and add web: npm start inside Procfile

Heroku guide:
->heroku login
->git init
->heroku git:remote -a PROJECT_NAME
->git add .
->git commit -m "your commit"
->git push heroku master
add .gitignore file and add node_modules inside it

Testing
npm test -- tests/person_api.test.js //performs test with the file name
npm test -- -t 'a specific person is within the returned notes'  //performs test by parameter name