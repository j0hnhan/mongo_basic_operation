const User = require('../src/user');
const assert = require('assert');

describe('remove item test', () => {
	let john;
	beforeEach((done) => {
		john = new User({name: "John"});
		john.save().then(() => done());
	});

	xit('instance remove', (done) => {
		john.remove().then(() => {
			return User.findOne({name: "John"});
		}).then((user) => {
			assert(user === null);
			done();
		});
	});

	xit('class remove', (done) => {
		User.remove({name: "John"}).then(() => {
			return User.findOne({name: "John"});
		}).then((user) => {
			assert(user === null);
			done();
		});
	});

	xit('findOne and remove', (done) => {
		User.findOneAndRemove({name: "John"}).then(() => {
			return User.findOne({name: "John"});
		}).then((user) => {
			assert(user === null);
			done();
		});
	});

	xit('find by id and remove', (done) => {
		User.findByIdAndRemove(john._id).then(() => {
			return User.findOne({name: "John"});
		}).then((user) => {
			assert(user === null);
			done();
		});
	});
})