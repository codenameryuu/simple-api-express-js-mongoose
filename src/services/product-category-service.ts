import isset from "../helpers/isset";

import ProductCategory from "../models/product-category";

class ProductCategoryService {
  // * Get data service
  getData = async (req: any) => {
    try {
      let setting = {
        page: 1,
        limit: 10,
        sort: { name: "asc" },
      };

      let conditional: any = {};

      if (isset(req.query.page)) {
        setting.page = parseInt(req.query.page);
      }

      if (isset(req.query.limit)) {
        setting.limit = parseInt(req.query.limit);
      }

      if (isset(req.query.search)) {
        conditional.name = req.query.search;
      }

      const data = await ProductCategory.paginate(conditional, setting);

      const result = {
        status: true,
        message: "Data behasil diambil !",
        data: data,
      };

      return result;
    } catch (err: any) {
      const result = {
        status: false,
        message: "Data gagal diambil !",
      };

      return result;
    }
  };

  // * Detail data service
  detailData = async (req: any) => {
    try {
      const data = await ProductCategory.findOne({
        _id: req.params.product_category_id,
      });

      const result = {
        status: true,
        message: "Data berhasil diambil !",
        data: data,
      };

      return result;
    } catch (err: any) {
      const result = {
        status: false,
        message: "Data gagal diambil !",
      };

      return result;
    }
  };

  // * Create data service
  createData = async (req: any) => {
    try {
      const productCategory = new ProductCategory();

      productCategory.name = req.fields.name;

      await productCategory.save();

      const data = ProductCategory.findOne({
        _id: productCategory._id,
      });

      const result = {
        status: true,
        message: "Data berhasil disimpan !",
        data: data,
      };

      return result;
    } catch (err: any) {
      const result = {
        status: false,
        message: "Data gagal disimpan !",
      };

      return result;
    }
  };

  // * Update data service
  updateData = async (req: any) => {
    try {
      const productCategory = await ProductCategory.findOne({
        _id: req.params.product_category_id,
      });

      productCategory!.name = req.fields.name;

      await productCategory!.save();

      const data = ProductCategory.findOne({
        _id: productCategory!._id,
      });

      const result = {
        status: true,
        message: "Data berhasil disimpann !",
        data: data,
      };

      return result;
    } catch (err: any) {
      const result = {
        status: false,
        message: "Data gagal disimpan !",
      };

      return result;
    }
  };

  // * Delete data service
  deleteData = async (req: any) => {
    try {
      await ProductCategory.softDelete({
        _id: req.params.product_category_id,
      });

      const result = {
        status: true,
        message: "Data berhasil dihapus !",
      };

      return result;
    } catch (err: any) {
      const result = {
        status: false,
        message: "Data gagal dihapus !",
      };

      return result;
    }
  };
}

export default ProductCategoryService;
