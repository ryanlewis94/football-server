const handleComment = (req, res, db) => {
	const { id } = req.body;
	db('comments')
		.where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then((entries) => {
			res.json(entries[0]);
		})
		.catch((err) => res.status(400).json('Unable to find users'));
};

module.exports = {
	handleComment
};
