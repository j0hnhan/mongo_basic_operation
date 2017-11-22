const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blog_post');
const Comment = require('../src/comment');
const assert = require('assert');

describe('association test', () => {
	let John, BP, comment;
	beforeEach((done) => {
		John = new User({name: "John"});
		BP = new BlogPost({title: "post1", content: "this is the first post"});
		comment = new Comment({ content: "good!" });

		John.blogPosts.push(BP);
		BP.comments.push(comment);
		comment.user = John;

		Promise.all([John.save(), BP.save(), comment.save()])
			.then(() => done());
	});

	it('relationship established', (done) => {
		User.findOne({name: "John"})
			.populate('blogPosts')
			.then((user) => {
				console.log(user);
				assert(user.blogPosts[0].title === "post1");
				done();
			})
	});

	it("load full", (done) => {
		User.findOne({name: "John"})
			.populate({
				path:'blogPosts',
				model: 'blogpost',
				populate: {
					path:'comments',
					model: 'comment',
					populate: {
						path: 'user',
						model: 'user'
					}
				}
			}).then((user) => {
				assert(user.blogPosts[0].title === "post1");
				assert(user.blogPosts[0].comments[0].content === "good!");
				assert(user.blogPosts[0].comments[0].user.name === "John");
				done();
			})
	});
});