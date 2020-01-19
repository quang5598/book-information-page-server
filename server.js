/*
	
*/

const express = require('express');
const register = require('./controllers/register');
const signin = require('./controllers/signin')
const addtolist = require('./controllers/addtolist')
const readinglist = require('./controllers/readinglist')
const deletebook = require('./controllers/deletebook')
var cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const knex = require('knex');
app.use(cors());
app.use(bodyParser.json());
const database = knex({
	client: 'pg',
	connection:{
		host:'127.0.0.1',
		user:'postgres',
		password: 'password',
		database: 'book-management'
	}
	
})
app.get('/',(req,res) => {
	database.select('*').from('users').then(data => console.log(data))
})
app.post('/signin', (req,res) => {signin.handleSignIn(req,res,database)})

app.post('/register', (req,res) => {register.handleRegister(req,res,database) })

app.put('/addtolist', (req, res) => {addtolist.handleAddToList(req,res,database)})

app.post('/readinglist', (req,res) => {readinglist.handleReadingList(req,res,database)})

app.post('/deletebook', (req, res) => {deletebook.handleDeleteBook(req,res,database)})

app.listen(5000);