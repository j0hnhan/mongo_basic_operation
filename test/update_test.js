const User = require('../src/user');
const assert = require('assert');

describe('update test', () => {
	let john;
	beforeEach((done) => {
		john = new User({name: "John", likes: 0});
		john.save().then(() => done());
	});

	function assertHelper(update, done) {
		update.then(() => {
				return User.find({})
			}).then((users) => {
				assert(users.length === 1);
				assert(users[0].name === "Jiong");
				done();
			});
	}

	xit('instance set n update',(done) => {
		john.set('name', 'Jiong');
		assertHelper(john.save(), done);
	});

	xit('instance update', (done) => {
		assertHelper(john.update({name: "Jiong"}), done);
	});

	xit('model update', (done) => {
		assertHelper(User.update({name: "John"}, {name: "Jiong"}), done);
	});

	xit('find one and update', (done) => {
		assertHelper(User.findOneAndUpdate({name: "John"}, {name: "Jiong"}), done);
	});

	xit('find by id and update', (done) => {
		assertHelper(User.findByIdAndUpdate(john._id, {name: "Jiong"}), done);
	});

	// it('update using $inc', (done) => {
	// 	User.update({name: "John"}, {$inc: {likes: 10}})
	// 		.then(() => User.findOne({name: "John"}))
	// 		.then((user) => {
	// 			assert(user.likes === 10);
	// 			done();
	// 		});
	// });
});