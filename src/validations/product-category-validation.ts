import Joi, { ValidationErrorItem } from "joi";

import ProductCategory from "../models/product-category";

let error: ValidationErrorItem = {
  message: "",
  path: [""],
  type: "",
};

class ProductCategoryValidation {
  // * Get data validation
  getData = async (req: any) => {
    let status, message;

    const schema = Joi.object({
      // * Tidak wajib diisikan
      // * Berupa angka
      // * Minimal 1
      page: Joi.number()
        .optional()
        .messages({
          "number.base": "Halaman harus berupa angka !",
        })
        .external(async (value) => {
          if (value < 1) {
            error.path[0] = "";
            error.message = "Halaman harus minimal 1 !";

            throw new Joi.ValidationError("Error", [error], value);
          }

          return true;
        }),

      // * Tidak wajib diisikan
      // * Berupa angka
      // * Minimal 1
      limit: Joi.number()
        .optional()
        .messages({
          "number.base": "Jumlah data harus berupa angka !",
        })
        .external(async (value) => {
          if (value < 1) {
            error.path[0] = "";
            error.message = "Jumlah data harus minimal 1 !";

            throw new Joi.ValidationError("Error", [error], value);
          }

          return true;
        }),

      search: Joi.string().optional().messages({
        "string.base": "Cari harus berupa string !",
      }),
    });

    try {
      const validate = {
        page: req.query.page,
        limit: req.query.limit,
        search: req.query.search,
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

  // * Detail data validation
  detailData = async (req: any) => {
    let status, message;

    const schema = Joi.object({
      // * Wajib diisikan
      // * Berupa string
      // * Harus ada di database sebagai id product category
      product_category_id: Joi.string()
        .required()
        .messages({
          "string.base": "ID kategori produk harus berupa string !",
          "string.empty": "ID kategori produk tidak boleh kosong !",
          "any.required": "ID kategori produk tidak boleh kosong !",
        })
        .external(async (value) => {
          const productCategory = await ProductCategory.findOne({
            _id: value,
          });

          if (!productCategory) {
            error.path[0] = "";
            error.message = "ID kategori produk tidak tersedia !";

            throw new Joi.ValidationError("Error", [error], value);
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

  // * Create data validation
  createData = async (req: any) => {
    let status, message;

    const schema = Joi.object({
      // * Wajib diisikan
      // * Berupa string
      name: Joi.string().required().messages({
        "string.base": "Nama harus berupa string !",
        "string.empty": "Nama tidak boleh kosong !",
        "any.required": "Nama tidak boleh kosong !",
      }),
    });

    try {
      const validate = {
        name: req.fields.name,
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

  // * Update data validation
  updateData = async (req: any) => {
    let status, message;

    const schema = Joi.object({
      // * Wajib diisikan
      // * Berupa string
      // * Harus ada di database sebagai id product category
      product_category_id: Joi.string()
        .required()
        .messages({
          "string.base": "ID kategori produk harus berupa string !",
          "string.empty": "ID kategori produk tidak boleh kosong !",
          "any.required": "ID kategori produk tidak boleh kosong !",
        })
        .external(async (value) => {
          const productCategory = await ProductCategory.findOne({
            _id: value,
          });

          if (!productCategory) {
            error.path[0] = "";
            error.message = "ID kategori produk tidak tersedia !";

            throw new Joi.ValidationError("Error", [error], value);
          }

          return true;
        }),

      // * Wajib diisikan
      // * Berupa string
      name: Joi.string().required().messages({
        "string.base": "Nama harus berupa string !",
        "string.empty": "Nama tidak boleh kosong !",
        "any.required": "Nama tidak boleh kosong !",
      }),
    });

    try {
      const validate = {
        product_category_id: req.params.product_category_id,

        name: req.fields.name,
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

  // * Delete data validation
  deleteData = async (req: any) => {
    let status, message;

    const schema = Joi.object({
      // * Wajib diisikan
      // * Berupa string
      // * Harus ada di database sebagai id product category
      product_category_id: Joi.string()
        .required()
        .messages({
          "string.base": "ID kategori produk harus berupa string !",
          "string.empty": "ID kategori produk tidak boleh kosong !",
          "any.required": "ID kategori produk tidak boleh kosong !",
        })
        .external(async (value) => {
          const productCategory = await ProductCategory.findOne({
            _id: value,
          });

          if (!productCategory) {
            error.path[0] = "";
            error.message = "ID kategori produk tidak tersedia !";

            throw new Joi.ValidationError("Error", [error], value);
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
      message = "Validasi sukses !";
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
