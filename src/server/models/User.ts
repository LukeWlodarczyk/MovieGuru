import { Document, Schema, Model, model } from "mongoose";
import * as bcrypt from "bcryptjs";

import { IUserType } from "../../universal/models";

export interface IUserDocument extends IUserType, Document {}

export interface IUser extends IUserDocument {
  comparePassword(password: string): boolean;
}

export interface IUserModel extends Model<IUser> {}

const UserSchema: Schema = new Schema({
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
    (err, hash: string): void => {
      if (err) return next(err);
      this.password = hash;
      next();
    }
  );
});

UserSchema.methods.comparePassword = async function comparePassword(
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};


export const User: IUserModel = model<IUser, IUserModel>("users", UserSchema);

export default User;
