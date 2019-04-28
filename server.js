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
const arsenal = require('./controllers/arsenal');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'pass',
		database: 'football'
	}
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('Working!');
});
app.get('/arsenalFixtures/:leagueid', (req, res) => {
	arsenal.handleFixtures(req, res);
});
app.get('/arsenalLive/:leagueid', (req, res) => {
	arsenal.handleLive(req, res);
});
app.get('/arsenal', (req, res) => {
	arsenal.handleGame(req, res);
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

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on ${process.env.PORT}`);
});
