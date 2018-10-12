export interface IUserType {
  email: string;
  name: string;
  password?: string;
}

export interface IUser extends IUserType {
    _id: string;
}
