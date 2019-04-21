import mongoose from "mongoose";

export interface IRepository<T extends mongoose.Document> {
  find: (cond?: Object, fields?: Object) => Promise<T[]>;
  findOne(cond?: Object): Promise<T | null>;
  findById: (id: string) => Promise<T | null>;
  create: (data: T) => Promise<T>;
}
