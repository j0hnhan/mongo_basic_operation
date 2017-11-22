const assert = require('assert');
const User = require('../src/user');

describe('subdocument test', (done) => {
	it('create a post', () => {
		const john = new User({name: "John", posts:[{title: "post1"}]});
		john.save()
			.then(() => User.findOne({name: "John"}))
			.then((user) => {
				assert(user.posts[0].title === "post1");
				done();
			});
	});

	it('add post', (done) => {
		const john = new User({name: "John", posts:[{title: "post1"}]});
		john.save()
			.then(() => User.findOne({name: "John"}))
			.then((user) => {
				user.posts.push({title:"post2"});
				return user.save();
			})
			.then(() => User.findOne({name: "John"}))
			.then((user) => {
				assert(user.posts.length === 2);
				assert(user.posts[1].title === "post2");
				done();
			})
	});

	it('remove post', (done) => {
		const john = new User({name: "John", posts:[{title: "post1"}]});
		john.save()
			.then(() => User.findOne({name: "John"}))
			.then((user) => {
				user.posts[0].remove();
				return user.save();
			})
			.then(() => User.findOne({name: "John"}))
			.then((user) => {
				assert(user.posts.length === 0);
				done();
			})
	})
});