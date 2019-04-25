const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const entries = require('./controllers/entries');
const comment = require('./controllers/comment');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'pass',
		database: 'football'
	}
});

const key = {
	key: process.env.REACT_APP_API_KEY,
	secret: process.env.REACT_APP_API_SECRET
};

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send(database.users);
});
app.get('/arsenal', (req, res) => {
	res.json(key);
});
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
});
app.get('/profile/:id', (req, res) => {
	profile.handleProfile(req, res, db);
});
app.put('/entries', (req, res) => {
	entries.handleEntry(req, res, db);
});
app.post('/comment', (req, res) => {
	comment.handleComment(req, res, db);
});
app.get('/getComment/:matchid', (req, res) => {
	comment.handleGetComment(req, res, db);
});

app.listen(3000, () => {
	console.log('app is running on 3000');
});
