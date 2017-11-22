const User = require('../src/user');
const assert = require('assert');

describe('Create user test', () => {
	xit('save a user', (done) => {
		const john = new User({name: "John"});
		john.save().then(() => {
			assert(!john.isNew);
			done();
		});
	});
});