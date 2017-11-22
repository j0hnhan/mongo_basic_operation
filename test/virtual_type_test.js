const User = require('../src/user');
const assert = require('assert');

describe('Virtual type test', () => {
	it('test', (done) => {
		const john = new User({name: "John", posts:[{title: "post1"}]});
		john.save()
			.then(() => User.findOne({name: "John"}))
			.then((user) => {
				console.log(user.postCount);
				assert(user.postCount === 1);
				done();
			});
	});
});