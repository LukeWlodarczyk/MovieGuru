import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";

import { Document, Schema, Model } from "mongoose";

export interface IUserDocument extends Document {
  email: string;
  username: string;
  password: string;
}

export interface IUser extends IUserDocument {
  comparePassword(password: string): boolean;
}

export interface IUserModel extends Model<IUser> {}

const UserSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre<IUserDocument>("save", function(next): any {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(
    this.password,
    10,
    (err, hash): void => {
      if (err) return next(err);
      this.password = hash;
      next();
    }
  );
});

UserSchema.methods.comparePassword = async function comparePassword(
  candidatePassword
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User: IUserModel = mongoose.model<IUser, IUserModel>(
  "users",
  UserSchema
);

export default User;
