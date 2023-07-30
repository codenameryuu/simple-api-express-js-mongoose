import Joi, { ValidationErrorItem } from "joi";
import bcrypt from "bcrypt";

import fileUploadCheck from "../helpers/file-upload-check";
import isset from "../helpers/isset";

import User from "../models/user";

let error: ValidationErrorItem = {
  message: "",
  path: [""],
  type: "",
};

class AuthValidation {
  // * Login validation
  login = async (req: any) => {
    let status, message;

    const schema = Joi.object({
      // * Wajib diisikan
      // * Berupa string
      // * Harus ada di database sebagai email user
      email: Joi.string()
        .email()
        .required()
        .messages({
          "string.base": "Email harus berupa string !",
          "string.empty": "Email tidak boleh kosong !",
          "any.required": "Email tidak boleh kosong !",
          "string.email": "Format email tidak valid !",
        })
        .external(async (value) => {
          const user = await User.findOne({
            email: value,
          });

          if (!user) {
            error.path[0] = "";
            error.message = "Email tidak tersedia !";

            throw new Joi.ValidationError("Error", [error], value);
          }

          return true;
        }),

      // * Wajib diisikan
      // * Berupa string
      password: Joi.string()
        .required()
        .messages({
          "string.base": "Password harus berupa string !",
          "string.empty": "Password tidak boleh kosong !",
          "any.required": "Password tidak boleh kosong !",
        })
        .external(async (value) => {
          const user = await User.findOne({
            email: value,
          });

          const statusCompare = await bcrypt.compare(req.fields.password, user!.password);

          if (!statusCompare) {
            error.path[0] = "";
            error.message = "Password salah !";

            throw new Joi.ValidationError("Error", [error], value);
          }

          return true;
        }),
    });

    try {
      const validate = {
        email: req.fields.email,
        password: req.fields.password,
      };

      await schema.validateAsync(validate);

      status = true;
      message = "Validasi berhasil !";
    } catch (err: any) {
      status = false;
      message = err.details[0].message;
    }

    const result = {
      status: status,
      message: message,
    };

    return result;
  };

  // * Register validation
  register = async (req: any) => {
    let status, message;

    const schema = Joi.object({
      // * Wajib diisikan
      // * Berupa string
      name: Joi.string().required().messages({
        "string.base": "Nama harus berupa string !",
        "string.empty": "Nama tidak boleh kosong !",
        "any.required": "Nama tidak boleh kosong !",
      }),

      // * Wajib diisikan
      // * Berupa string
      // * Harus tidak ada di database sebagai email user
      email: Joi.string()
        .email()
        .required()
        .messages({
          "string.base": "Email harus berupa string !",
          "string.empty": "Email tidak boleh kosong !",
          "any.required": "Email tidak boleh kosong !",
          "string.email": "Format email tidak valid !",
        })
        .external(async (value) => {
          const user = await User.findOne({
            email: value,
          });

          if (user) {
            error.path[0] = "";
            error.message = "Email sudah terdaftar !";

            throw new Joi.ValidationError("Error", [error], value);
          }

          return true;
        }),

      // * Wajib diisikan
      // * Berupa string
      password: Joi.string().required().messages({
        "string.base": "Password harus berupa string !",
        "string.empty": "Password tidak boleh kosong !",
        "any.required": "Password tidak boleh kosong !",
      }),
    });

    try {
      const validate = {
        name: req.fields.name,
        email: req.fields.email,
        password: req.fields.password,
      };

      await schema.validateAsync(validate);

      status = true;
      message = "Validasi sukses !";

      // * Validasi image
      // * Tidak Wajib diisikan
      // * Berupa file jpg, jpeg atau png
      // * Maximal 10 MB
      if (isset(req.files.image)) {
        let file = req.files.image;

        if (!fileUploadCheck.isImage(file)) {
          error.path[0] = "";
          error.message = "Format gambar harus jpg, jpeg atau png !";

          throw new Joi.ValidationError("Error", [error], "");
        }

        if (!fileUploadCheck.isFileSizeAccepted(file)) {
          error.path[0] = "";
          error.message = "Gambar maximal 10 MB !";

          throw new Joi.ValidationError("Error", [error], "");
        }
      }
    } catch (err: any) {
      status = false;
      message = err.details[0].message;
    }

    const result = {
      status: status,
      message: message,
    };

    return result;
  };
}

export default AuthValidation;
