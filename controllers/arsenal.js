const fetch = require('node-fetch');

const handleFixtures = (req, res) => {
	const { leagueid } = req.params;
	const key = {
		key: process.env.API_KEY,
		secret: process.env.API_SECRET
	};

	fetch(
		`http://livescore-api.com/api-client/fixtures/matches.json?key=${key.key}&secret=${key.secret}&league=${leagueid}`
	)
		.then((res) => res.json())
		.then((data) => {
			res.send({ data });
		});
};

const handleLive = (req, res) => {
	const { leagueid } = req.params;
	const key = {
		key: '8uoqtmuaQ1s4bRe4',
		secret: 'M2baUvmhpyZunhzvLYVekqpbrRgCJuHv'
	};

	fetch(`http://livescore-api.com/api-client/scores/live.json?key=${key.key}&secret=${key.secret}&league=${leagueid}`)
		.then((res) => res.json())
		.then((data) => {
			res.send({ data });
		});
};

const handleGame = (req, res) => {
	const key = {
		key: '8uoqtmuaQ1s4bRe4',
		secret: 'M2baUvmhpyZunhzvLYVekqpbrRgCJuHv'
	};

	fetch(`http://livescore-api.com/api-client/scores/live.json?key=${key.key}&secret=${key.secret}`)
		.then((res) => res.json())
		.then((data) => {
			res.send({ data });
		});
};

module.exports = {
	handleFixtures,
	handleLive,
	handleGame
};
