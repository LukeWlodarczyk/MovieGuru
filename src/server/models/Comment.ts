import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    movieId: {
        type: String,
        required: true,
    },
}, 
{ 
    timestamps: {},
});

export default mongoose.model('comments', CommentSchema);