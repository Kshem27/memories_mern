import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
	title: String,
	message: String,
	creator: String,
	tags: [ String ],
	name: String,
	selectedFile: String,
	likes: { type: [ String ], default: [] },
	createdAt: {
		type: Date,
		default: new Date()
	},
	comments: {
		type: [ String ],
		default: []
	}
});

const postMessage = mongoose.model('PostMessage', postSchema);
export default postMessage;
