const assert = require('assert');
const User = require('../src/user');

describe('validation test', () => {
	xit('validate if name is empty', () => {
		const user = new User({name: undefined, likes: 0});
		const validationResult = user.validateSync();

		assert(validationResult.errors.name.message === 'name field should not be empty.');
	});

	xit('validate if name is in proper length', () => {
		const user = new User({name: "HJ", likes: 0});
		const validationResult = user.validateSync();
		assert(validationResult.errors.name.message === 'Not a good name.');
	});

	xit('disallow invalid record from being save', (done) => {
		const user = new User({name: "HJ"});
		user.save()
			.catch((validationResult) => {
				console.log('not record');
				assert(validationResult.errors.name.message === 'Not a good name.');
				done();
			});
	})
});