import { Document, Schema, Model, model, HookDoneFunction } from "mongoose";
import { IUser } from "./interfaces/IUser";
import { hashSync, compareSync } from "bcrypt-nodejs";

export interface IUserDocument extends IUser, Document {
  comparePassword: (password: string) => boolean;
}
export interface IUserModel extends Model<IUserDocument> {}

const UserSchema = new Schema(
  {
    email: String,
    password: String
  },
  {
    timestamps: true
  }
);

UserSchema.pre<IUserDocument>("save", function(next: HookDoneFunction) {
  if (this.isModified("password")) {
    this.password = hashSync(this.password);
    return next();
  }
  return next();
});

UserSchema.methods.comparePassword = function(
  this: IUserDocument,
  password: string
) {
  return compareSync(password, this.password);
};

export const User = model<IUserDocument, IUserModel>("User", UserSchema);
