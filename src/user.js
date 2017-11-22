const mongoose = require('mongoose');
const PostSchema = require('./post_schema');


const Schema = mongoose.Schema;
const UserSchema = new Schema({
	name: {
		type: String,
		validate: {
			validator: (name) => name.length > 2,
			message: 'Not a good name.'
		},
		required: [true, 'name field should not be empty.']
	},
	likes: Number,
	posts: [PostSchema],
	blogPosts: [{
		type: Schema.Types.ObjectId,
		ref: 'blogpost'
	}]
});

UserSchema.virtual('postCount').get(function() {
	return this.posts.length;
});

UserSchema.pre('remove', function(next) {
	const BlogPost = mongoose.model('blogpost');
	BlogPost.remove({ _id: { $in: this.blogPosts } })
		.then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;