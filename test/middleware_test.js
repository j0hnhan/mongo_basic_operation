const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blog_post');
const assert = require('assert');

describe('association test', () => {
	let John, BP;
	beforeEach((done) => {
		John = new User({name: "John"});
		BP = new BlogPost({title: "post1", content: "this is the first post"});

		John.blogPosts.push(BP);

		Promise.all([John.save(), BP.save()])
			.then(() => done());
	});

	it('middleware will clean up related blog post', (done) => {
		John.remove()
			.then(() => BlogPost.count())
			.then((count) => {
				console.log(count);
				assert(count === 0);
				done();
			})
	});
});