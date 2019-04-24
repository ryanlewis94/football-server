const handleComment = (req, res, db) => {
	const { comment, userid, matchid } = req.body;
	if (!comment || !userid || !matchid) {
		return res.status(400).json('incorrect');
	}
	db.transaction((trx) => {
		trx
			.insert({
				comment: comment,
				userid: userid,
				matchid: matchid
			})
			.into('comments')
			.then(trx.commit)
			.catch(trx.rollback);
	});
};

const handleGetComment = (req, res, db) => {
	const { matchid } = req.params;
	db('comments')
		.orderBy('comments.id', 'desc')
		.join('users', 'comments.userid', '=', 'users.id')
		.select('users.name', 'users.entries', 'comments.comment')
		.where({ matchid })
		.then((comment) => {
			res.json(comment);
		})
		.catch((err) => res.status(400).json('Not found'));
};

module.exports = {
	handleComment,
	handleGetComment
};
