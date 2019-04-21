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
	db
		.select('*')
		.from('comments')
		.where({ matchid })
		.then((comment) => {
			if (comment.length) {
				res.json(comment);
			} else {
				res.status(400).json('Error 400');
			}
		})
		.catch((err) => res.status(400).json('Not found'));
};

module.exports = {
	handleComment,
	handleGetComment
};
