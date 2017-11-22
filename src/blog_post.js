const mongoose = require('mongoose');
const Comment = require('./comment');
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
	title: String,
	content: String,
	comments: [{
		type: Schema.Types.ObjectId,
	    ref: 'comment'
	}]
});

const BlogPost = mongoose.model('blogpost', blogPostSchema);

module.exports = BlogPost;