import { Schema, Document, Model, PaginateModel, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

import isset from "../helpers/isset";
import toJSON from "../helpers/to-json";

import softDeletePlugin from "../libraries/soft-delete/soft-delete-plugin";
import SoftDeleteModel from "../libraries/soft-delete/soft-delete-model";

interface iUser extends Document {
  name: string;
  email: string;
  password: string;
  image: string;

  created_at: any;
  updated_at: any;
}

interface iUserDocument extends iUser, Document {
  saveImage: (req: any) => any;
  deleteImage: () => any;
}

const UserSchema: Schema<iUserDocument> = new Schema({
  _id: {
    type: String,
    required: true,
    default: () => uuidv4(),
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: true,
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

UserSchema.virtual("image_url").get(function () {
  return process.env.APP_BASE_URL + "/public/storage/images/users/" + this.image;
});

UserSchema.pre("find", function () {
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

UserSchema.pre("findOne", function () {
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

UserSchema.pre("save", function (next) {
  const now = moment().format("YYYY-MM-DD HH:mm:ss");

  if (!this.created_at) {
    this.created_at = new Date(now);
  } else {
    this.updated_at = new Date(now);
  }

  next();
});

UserSchema.method("saveImage", function saveImage(req: any) {
  if (isset(req.files.image)) {
    const file = req.files.image;
    const rootPath = path.dirname(require!.main!.filename);

    const filePath = rootPath + "/public/storage/users/";
    const fileName = file.newFilename;

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    fs.copyFile(file.filepath, filePath + fileName, function (err) {});

    return fileName;
  }

  return null;
});

UserSchema.method("deleteImage", function deleteImage() {
  if (this.image) {
    const rootPath = path.dirname(require!.main!.filename);
    const filePath = rootPath + "/public/storage/users/" + this.image;

    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {});
    }
  }

  return null;
});

UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(softDeletePlugin);
UserSchema.plugin(toJSON);

type UserModel = Model<iUser, {}, iUserDocument>;

const user = model<iUserDocument, PaginateModel<iUserDocument> & SoftDeleteModel<iUser> & UserModel>("User", UserSchema, "users");

export default user;
