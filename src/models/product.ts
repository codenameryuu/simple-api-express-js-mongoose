import { Schema, Document, Model, PaginateModel, model, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

import isset from "../helpers/isset";
import toJSON from "../helpers/to-json";

interface iProduct extends Document {
  product_category_id: string;

  name: string;
  price: number;
  image: string;

  created_at: any;
  updated_at: any;
}

interface iProductDocument extends iProduct, Document {
  saveImage: (req: any) => any;
  deleteImage: () => any;
}

const ProductSchema: Schema<iProductDocument> = new Schema({
  _id: {
    type: String,
    required: true,
    default: () => uuidv4(),
  },

  product_category_id: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    required: false,
    default: null,
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

ProductSchema.virtual("image_url").get(function () {
  return process.env.APP_BASE_URL + "/public/storage/images/product/" + this.image;
});

ProductSchema.virtual("product_category", {
  ref: "ProductCategory",
  localField: "product_category_id",
  foreignField: "_id",
  justOne: true,
});

ProductSchema.pre("find", function () {
  this.populate([
    {
      path: "product_category",
      options: {
        options: {
          withDeleted: true,
        },
      },
    },
  ]);

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

ProductSchema.pre("findOne", function () {
  this.populate([
    {
      path: "product_category",
      options: {
        options: {
          withDeleted: true,
        },
      },
    },
  ]);

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

ProductSchema.pre("save", function (next) {
  const now = moment().format("YYYY-MM-DD HH:mm:ss");

  if (!this.created_at) {
    this.created_at = new Date(now);
  } else {
    this.updated_at = new Date(now);
  }

  next();
});

ProductSchema.method("saveImage", function saveImage(req: any) {
  if (isset(req.files.image)) {
    const file = req.files.image;
    const rootPath = path.dirname(require!.main!.filename);

    const filePath = rootPath + "/public/storage/products/";
    const fileName = file.newFilename;

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    fs.copyFile(file.filepath, filePath + fileName, function (err) {});

    return fileName;
  }

  return null;
});

ProductSchema.method("deleteImage", function deleteImage() {
  if (this.image) {
    const rootPath = path.dirname(require!.main!.filename);
    const filePath = rootPath + "/public/storage/products/" + this.image;

    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {});
    }
  }

  return null;
});

ProductSchema.plugin(mongoosePaginate);
ProductSchema.plugin(toJSON);

type ProductModel = Model<iProduct, {}, iProductDocument>;

const Product = model<iProductDocument, PaginateModel<iProductDocument> & ProductModel>("Product", ProductSchema, "products");

export default Product;
