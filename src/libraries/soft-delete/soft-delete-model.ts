import { Document, SaveOptions } from "mongoose";
import * as mongoose from "mongoose";

interface SoftDeleteModel<T extends Document> extends mongoose.Model<T> {
  findWithDeleted(query: Record<string, any>): Promise<{ result: any }>;
  restore(query: Record<string, any>): Promise<{ restored: number }>;
  softDelete(
    query: Record<string, any>,
    options?: SaveOptions
  ): Promise<{ deleted: number }>;
}

export default SoftDeleteModel;
