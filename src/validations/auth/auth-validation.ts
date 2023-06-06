import Joi, { ValidationErrorItem } from "joi";

import User from "../../models/user";

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
      email: Joi.string()
        .email()
        .required()
        .external(async (value) => {
          let statusError = false;
          const user = await User.findOne({ email: value });

          if (!user) {
            statusError = true;
            error.message = `"email" is not exists`;
          }

          if (statusError) {
            throw new Joi.ValidationError("Error", [error], value);
          }

          return true;
        }),

      password: Joi.string().required(),
    });

    try {
      const validate = {
        email: req.fields.email,
        password: req.fields.password,
      };

      await schema.validateAsync(validate);

      status = true;
      message = "Validation successfully !";
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
      name: Joi.string().required(),

      email: Joi.string()
        .email()
        .required()
        .external(async (value) => {
          let statusError = false;
          const user = await User.findOne({ email: value });

          if (user) {
            statusError = true;
            error.message = `"email" is already exists`;
          }

          if (statusError) {
            throw new Joi.ValidationError("Error", [error], value);
          }

          return true;
        }),

      password: Joi.string().required(),
      image: Joi.optional(),
    });

    try {
      const validate = {
        name: req.fields.name,
        email: req.fields.email,
        password: req.fields.password,
        image: req.fields.image,
      };

      await schema.validateAsync(validate);

      status = true;
      message = "Validation successfully !";
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
