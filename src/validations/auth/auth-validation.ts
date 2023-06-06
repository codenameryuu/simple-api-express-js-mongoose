import Joi from "joi";
import User from "../../models/user";

class AuthValidation {
  // * Login validation
  login = async (req: any) => {
    let status, message;

    const schema = Joi.object({
      email: Joi.string()
        .email()
        .required()
        .custom(async (value, helper) => {
          const user = await User.findOne({ email: value });

          if (!user) {
            return helper.error(`"email" is not exists`);
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
        .custom(async (value, helper) => {
          const user = await User.findOne({ email: value });

          if (user) {
            return helper.error(`"email" is already exists`);
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
