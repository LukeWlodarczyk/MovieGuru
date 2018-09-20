import * as mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
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
