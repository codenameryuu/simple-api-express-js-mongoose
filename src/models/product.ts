import { Schema, Document, Model, PaginateModel, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import path from "path";
import fs from "fs";
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
  return (
    process.env.APP_BASE_URL + "/public/storage/images/product/" + this.image
  );
});

ProductSchema.virtual("product_category", {
  ref: "ProductCategory",
  localField: "product_category_id",
  foreignField: "_id",
  justOne: true,
});

ProductSchema.pre("find", function () {
  this.populate({
    path: "product_category",
    options: { withDeleted: true },
  });
});

ProductSchema.pre("findOne", function () {
  this.populate({
    path: "product_category",
    options: { withDeleted: true },
  });
});

ProductSchema.post("save", function (data, next) {
  if (!data.created_at) {
    data.created_at = Date.now();
  }

  data.updated_at = Date.now();
  data.save();
  next();
});

ProductSchema.method("saveImage", function saveImage(req: any) {
  if (req.files && Object.keys(req.files).length !== 0) {
    const file = req.files.image;
    const rootPath = path.dirname(require!.main!.filename);

    const extName = path.extname(file.name);
    const fileName =
      Date.now() + Math.random().toString(10).slice(2, 7) + extName;
    const filePath = rootPath + "/public/storage/images/product/";

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    fs.copyFile(file.path, filePath + fileName, function (err) {
      return null;
    });

    return fileName;
  }

  return null;
});

ProductSchema.method("deleteImage", function deleteImage() {
  const rootPath = path.dirname(require!.main!.filename);
  const filePath = rootPath + "/public/storage/images/product/" + this.image;

  fs.unlink(filePath, (err) => {
    console.log(err);
  });

  return null;
});

ProductSchema.methods.saveImage = function (req: any) {
  if (req.files && Object.keys(req.files).length !== 0) {
    const file = req.files.image;
    const rootPath = path.dirname(require!.main!.filename);

    const extName = path.extname(file.name);
    const fileName =
      Date.now() + Math.random().toString(10).slice(2, 7) + extName;
    const filePath = rootPath + "/public/storage/images/product/";

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    fs.copyFile(file.path, filePath + fileName, function (err) {
      return null;
    });

    return fileName;
  }
};

ProductSchema.methods.deleteImage = function () {
  const rootPath = path.dirname(require!.main!.filename);
  const filePath = rootPath + "/public/storage/images/product/" + this.image;

  fs.unlink(filePath, (err) => {});
};

ProductSchema.plugin(mongoosePaginate);
ProductSchema.plugin(toJSON);

type ProductModel = Model<iProduct, {}, iProductDocument>;

const Product = model<
  iProductDocument,
  PaginateModel<iProductDocument> & ProductModel
>("Product", ProductSchema, "products");

export default Product;
