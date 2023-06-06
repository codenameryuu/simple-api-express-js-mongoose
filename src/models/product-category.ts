import { Schema, Document, Model, PaginateModel, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import softDeletePlugin from "../libraries/soft-delete/soft-delete-plugin";
import SoftDeleteModel from "../libraries/soft-delete/soft-delete-model";
import toJSON from "../helpers/to-json";

interface iProductCategory extends Document {
  name: string;
  created_at: any;
  updated_at: any;
}

interface iProductCategoryDocument extends iProductCategory, Document {}

const ProductCategorySchema: Schema<iProductCategoryDocument> = new Schema({
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: false,
  },
  updated_at: {
    type: Date,
    required: false,
  },
});

ProductCategorySchema.virtual("product", {
  ref: "Product",
  localField: "_id",
  foreignField: "product_category_id",
  justOne: false,
});

ProductCategorySchema.pre("find", function () {
  const { withDeleted } = this.getOptions();

  if (withDeleted) {
    delete this.getFilter().isDeleted;
  }
});

ProductCategorySchema.pre("findOne", function () {
  const { withDeleted } = this.getOptions();

  if (withDeleted) {
    delete this.getFilter().isDeleted;
  }
});

ProductCategorySchema.post("save", function (data, next) {
  if (!data.created_at) {
    data.created_at = Date.now();
  }

  data.updated_at = Date.now();
  data.save();
  next();
});

ProductCategorySchema.plugin(mongoosePaginate);
ProductCategorySchema.plugin(softDeletePlugin);
ProductCategorySchema.plugin(toJSON);

type ProductCategoryModel = Model<
  iProductCategory,
  {},
  iProductCategoryDocument
>;

const ProductCategory = model<
  iProductCategoryDocument,
  PaginateModel<iProductCategoryDocument> &
    SoftDeleteModel<iProductCategory> &
    ProductCategoryModel
>("ProductCategory", ProductCategorySchema, "product_categories");

export default ProductCategory;
