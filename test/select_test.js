const User = require('../src/user');
const assert = require('assert');

describe('Select user test', () => {
	let john, alex, bob, dan;

	beforeEach((done) => {
		john = new User({name: "John"});
		alex = new User({name: "Alex"});
		bob = new User({name: "Bob"});
		dan = new User({name: "Dan"});
		Promise.all([john.save(), dan.save(), alex.save(), bob.save()])
			.then(() => done());
	});

	xit('find test', (done) => {
		User.find({name: "John"}).
			then((users) => {
				assert(users.length === 1);
				assert(users[0]._id.toString()=== john._id.toString());
				done();
			});
	});

	xit("findOne test", (done) => {
		User.findOne({_id: john._id})
			.then((user) => {
				assert(user.name === john.name);
				done();
			});
	});


	it.only("skip and limit query",(done) => {
		User.find({}).sort({name: 1}).skip(1).limit(2)
			.then((users) => {
				assert(users.length === 2);
				assert(users[0].name === "Bob");
				assert(users[1].name === "Dan");
				done();
			})
	})
})