import * as mongoose from "mongoose";


export interface IUserDocument extends mongoose.Document {
  text: string;
  movie: string;
  author: string;
}

export interface IUserModel extends mongoose.Model<IUserDocument> {}

const CommentSchema: mongoose.Schema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    }
},
{
    timestamps: {},
});

export const Comment = mongoose.model<IUserDocument, IUserModel>('comments', CommentSchema);

export default Comment;
