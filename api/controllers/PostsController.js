/**
 * PostsController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/*findAdult: function (req, res) {
		sails.log.debug("*******************finAdult");
		Post.find({ author: { '=': req } }).done(function (err, users) {
			if (err) res.json({ error: 'oups error' }, 500);
			if (users) { 
				res.json(users);
			} else {
				res.json({ message: 'User not found' });
			}
		});
	}*/
	
	author: function (req, res) {
		sails.log.debug("*******************author");
		Posts.findOneByAuthor(req.body.author).done(function (err, posts) {
			if (err) res.json({ error: 'oups error' }, 500);       
			if (posts) {
				res.json(posts);
			} else {
				res.json({ message: 'Author not found' });
			}
		});
	}
};

