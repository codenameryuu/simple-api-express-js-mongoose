import { Schema, Document, Model, PaginateModel, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import path from "path";
import fs from "fs";
import softDeletePlugin from "../libraries/soft-delete/soft-delete-plugin";
import SoftDeleteModel from "../libraries/soft-delete/soft-delete-model";
import toJSON from "../helpers/to-json";

interface iUser extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  created_at: any;
  updated_at: any;
}

interface iUserDocument extends iUser, Document {
  toJSON: () => any;
  saveImage: (req: any) => any;
  deleteImage: () => any;
}

const UserSchema: Schema<iUserDocument> = new Schema({
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
  },
  updated_at: {
    type: Date,
  },
});

UserSchema.virtual("image_url").get(function () {
  return (
    process.env.APP_BASE_URL + "/public/storage/images/users/" + this.image
  );
});

UserSchema.pre("find", function () {
  const { withDeleted } = this.getOptions();

  if (withDeleted) {
    delete this.getFilter().isDeleted;
  }
});

UserSchema.pre("findOne", function () {
  const { withDeleted } = this.getOptions();

  if (withDeleted) {
    delete this.getFilter().isDeleted;
  }
});

UserSchema.post("save", function (data, next) {
  if (!data.created_at) {
    data.created_at = Date.now();
  }

  data.updated_at = Date.now();
  data.save();
  next();
});

UserSchema.method("toJSON", function toJSON() {
  let data: any = this.toObject();
  delete data.password;
  return data;
});

UserSchema.method("saveImage", function saveImage(req: any) {
  if (req.files && Object.keys(req.files).length !== 0) {
    const file = req.files.image;
    const rootPath = path.dirname(require!.main!.filename);

    const extName = path.extname(file.name);
    const fileName =
      Date.now() + Math.random().toString(10).slice(2, 7) + extName;
    const filePath = rootPath + "/public/storage/images/user/";

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

UserSchema.method("deleteImage", function deleteImage() {
  const rootPath = path.dirname(require!.main!.filename);
  const filePath = rootPath + "/public/storage/images/user/" + this.image;

  fs.unlink(filePath, (err) => {
    console.log(err);
  });

  return null;
});

UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(softDeletePlugin);
UserSchema.plugin(toJSON);

type UserModel = Model<iUser, {}, iUserDocument>;

const user = model<
  iUserDocument,
  PaginateModel<iUserDocument> & SoftDeleteModel<iUser> & UserModel
>("User", UserSchema, "users");

export default user;
