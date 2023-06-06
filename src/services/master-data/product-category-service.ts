import isset from "../../helpers/isset";

import ProductCategory from "../../models/product-category";

class ProductCategoryService {
  // * Index service
  index = async (req: any) => {
    try {
      let setting = {
        page: 1,
        limit: 10,
        sort: { name: "asc" },
      };

      let conditional: any = {};

      if (isset(() => req.query.page) && req.query.page) {
        setting.page = parseInt(req.query.page);
      }

      if (isset(() => req.query.limit) && req.query.limit) {
        setting.limit = parseInt(req.query.limit);
      }

      if (isset(() => req.query.search) && req.query.search) {
        conditional.name = req.query.search;
      }

      const productCategory = await ProductCategory.paginate(
        conditional,
        setting
      );

      const result = {
        status: true,
        message: "Data retrivied successfully !",
        data: productCategory,
      };

      return result;
    } catch (error) {
      const result = {
        status: false,
        message: "Fail to create data !",
      };

      return result;
    }
  };

  // * Show service
  show = async (req: any) => {
    try {
      const productCategory = await ProductCategory.findOne({
        _id: req.params.product_category_id,
      });

      const result = {
        status: true,
        message: "Data retrivied successfully !",
        data: productCategory,
      };

      return result;
    } catch (error) {
      const result = {
        status: false,
        message: "Fail to create data !",
      };

      return result;
    }
  };

  // * Store service
  store = async (req: any) => {
    try {
      const productCategory = new ProductCategory();

      productCategory.name = req.fields.name;

      await productCategory.save();

      const result = {
        status: true,
        message: "Data created successfully !",
        data: productCategory,
      };

      return result;
    } catch (error) {
      const result = {
        status: false,
        message: "Fail to create data !",
      };

      return result;
    }
  };

  // * Update service
  update = async (req: any) => {
    try {
      const productCategory = await ProductCategory.findOne({
        _id: req.params.product_category_id,
      });

      productCategory!.name = req.fields.name;

      await productCategory!.save();

      const result = {
        status: true,
        message: "Data updated successfully !",
        data: productCategory,
      };

      return result;
    } catch (error) {
      const result = {
        status: false,
        message: "Fail to create data !",
      };

      return result;
    }
  };

  // * Destroy service
  destroy = async (req: any) => {
    try {
      await ProductCategory.softDelete({
        _id: req.params.product_category_id,
      });

      const result = {
        status: true,
        message: "Data deleted successfully !",
      };

      return result;
    } catch (error) {
      const result = {
        status: false,
        message: "Fail to create data !",
      };

      return result;
    }
  };
}

export default ProductCategoryService;
