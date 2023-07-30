import { Schema, Document, Model, PaginateModel, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

import isset from "../helpers/isset";
import toJSON from "../helpers/to-json";

import softDeletePlugin from "../libraries/soft-delete/soft-delete-plugin";
import SoftDeleteModel from "../libraries/soft-delete/soft-delete-model";

interface iProductCategory extends Document {
  name: string;

  created_at: any;
  updated_at: any;
}

interface iProductCategoryDocument extends iProductCategory, Document {}

const ProductCategorySchema: Schema<iProductCategoryDocument> = new Schema({
  _id: {
    type: String,
    required: true,
    default: () => uuidv4(),
  },

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
  const options = this.getOptions();

  if (isset(options.options)) {
    if (isset(options.options.withDeleted)) {
      const withDeleted = options.options.withDeleted;

      if (withDeleted) {
        delete this.getFilter().isDeleted;
      }
    }
  }
});

ProductCategorySchema.pre("findOne", function () {
  const options = this.getOptions();

  if (isset(options.options)) {
    if (isset(options.options.withDeleted)) {
      const withDeleted = options.options.withDeleted;

      if (withDeleted) {
        delete this.getFilter().isDeleted;
      }
    }
  }
});

ProductCategorySchema.pre("save", function (next) {
  const now = moment().format("YYYY-MM-DD HH:mm:ss");

  if (!this.created_at) {
    this.created_at = new Date(now);
  } else {
    this.updated_at = new Date(now);
  }

  next();
});

ProductCategorySchema.plugin(mongoosePaginate);
ProductCategorySchema.plugin(softDeletePlugin);
ProductCategorySchema.plugin(toJSON);

type ProductCategoryModel = Model<iProductCategory, {}, iProductCategoryDocument>;

const ProductCategory = model<
  iProductCategoryDocument,
  PaginateModel<iProductCategoryDocument> & SoftDeleteModel<iProductCategory> & ProductCategoryModel
>("ProductCategory", ProductCategorySchema, "product_categories");

export default ProductCategory;
