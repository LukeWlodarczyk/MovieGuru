import * as mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies',
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    }
},
{
    timestamps: {},
});

export default mongoose.model('comments', CommentSchema);
