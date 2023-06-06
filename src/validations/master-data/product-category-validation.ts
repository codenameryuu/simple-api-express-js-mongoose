import Joi from "joi";
import mongoose from "mongoose";
import isset from "../../libraries/isset";

import ProductCategory from "../../models/product-category";

class ProductCategoryValidation {
  // * Index validation
  index = async (req: any) => {
    let status, message;

    const schema = Joi.object({
      page: Joi.number().optional(),
      limit: Joi.number().optional(),
      search: Joi.string().optional(),
    });

    try {
      let validate: any = {};

      if (isset(req.query.page)) {
        validate.page = req.query.page;
      }

      if (isset(() => req.query.limit) && req.query.limit) {
        validate.limit = req.query.limit;
      }

      if (isset(() => req.query.search) && req.query.search) {
        validate.search = req.query.search;
      }

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

  // * Show validation
  show = async (req: any) => {
    let status, message;

    const schema = Joi.object({
      product_category_id: Joi.string()
        .required()
        .custom(async (value, helper) => {
          const check = mongoose.isValidObjectId(value);

          if (!check) {
            return helper.error(`"product_category_id" is not object id`);
          }

          const productCategory = await ProductCategory.findOne({ _id: value });

          if (!productCategory) {
            return helper.error(`"product_category_id" is not exists`);
          }

          return true;
        }),
    });

    try {
      const validate = {
        product_category_id: req.params.product_category_id,
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

  // * Store validation
  store = async (req: any) => {
    let status, message;

    const schema = Joi.object({
      name: Joi.string().required(),
    });

    try {
      const validate = {
        name: req.fields.name,
      };

      await schema.validateAsync(validate);

      status = true;
      message = "Validation successfully !";
    } catch (err: any) {
      status = false;
      message = err.details[0].message;
      console.log(message);
    }

    const result = {
      status: status,
      message: message,
    };

    return result;
  };

  // * Update validation
  update = async (req: any) => {
    let status, message;

    const schema = Joi.object({
      product_category_id: Joi.string()
        .required()
        .custom(async (value, helper) => {
          const check = mongoose.isValidObjectId(value);

          if (!check) {
            return helper.error(`"product_category_id" is not object id`);
          }

          const productCategory = await ProductCategory.findOne({ _id: value });

          if (!productCategory) {
            return helper.error(`"product_category_id" is not exists`);
          }

          return true;
        }),

      name: Joi.string().required(),
    });

    try {
      const validate = {
        product_category_id: req.params.product_category_id,
        name: req.fields.name,
      };

      await schema.validateAsync(validate);

      status = true;
      message = "Validation successfully !";
    } catch (err: any) {
      status = false;
      message = err.details[0].message;
      console.log(message);
    }

    const result = {
      status: status,
      message: message,
    };

    return result;
  };

  // * Destroy validation
  destroy = async (req: any) => {
    let status, message;

    const schema = Joi.object({
      product_category_id: Joi.string()
        .required()
        .custom(async (value, helper) => {
          const check = mongoose.isValidObjectId(value);

          if (!check) {
            return helper.error(`"product_category_id" is not object id`);
          }

          const productCategory = await ProductCategory.findOne({ _id: value });

          if (!productCategory) {
            return helper.error(`"product_category_id" is not exists`);
          }

          return true;
        }),
    });

    try {
      const validate = {
        product_category_id: req.params.product_category_id,
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

export default ProductCategoryValidation;
