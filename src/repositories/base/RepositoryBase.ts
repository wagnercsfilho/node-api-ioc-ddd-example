import * as mongoose from "mongoose";
import { injectable, unmanaged } from "inversify";
import { IRepository } from "../interfaces/IRepository";

@injectable()
export class RepositoryBase<T extends mongoose.Document>
  implements IRepository<T> {
  private _model: mongoose.Model<T>;

  constructor(@unmanaged() schemaModel: mongoose.Model<T>) {
    this._model = schemaModel;
  }

  find(cond?: Object, fields?: Object): Promise<T[]> {
    return this._model.find(cond, fields).exec();
  }

  findById(id: string): Promise<T | null> {
    return this._model.findById(id).exec();
  }

  findOne(cond?: Object): Promise<T | null> {
    return this._model.findOne(cond).exec();
  }

  create(item: T): Promise<T> {
    return this._model.create(item);
  }
}
