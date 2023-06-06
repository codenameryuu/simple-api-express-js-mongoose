import isset from "../../helpers/isset";

import Product from "../../models/product";

class ProductService {
  // * Index service
  index = async (req: any) => {
    try {
      let setting = {
        page: 1,
        limit: 1,
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

      const product = await Product.paginate(conditional, setting);

      const result = {
        status: true,
        message: "Data retrivied successfully !",
        data: product,
      };

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // * Show service
  show = async (req: any) => {
    try {
      const product = await Product.findOne({
        _id: req.params.product_id,
      });

      const result = {
        status: true,
        message: "Data retrivied successfully !",
        data: product,
      };

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // * Store service
  store = async (req: any) => {
    try {
      const product = new Product();

      product.product_category_id = req.fields.product_category_id;
      product.name = req.fields.name;
      product.price = req.fields.price;

      const filename = product.saveImage(req);

      if (filename) {
        product.image = filename;
      }

      await product.save();

      const productResult = await Product.findOne({
        _id: product.id,
      });

      const result = {
        status: true,
        message: "Data created successfully !",
        data: productResult,
      };

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // * Update service
  update = async (req: any) => {
    try {
      const product = await Product.findOne({
        _id: req.params.product_id,
      });

      product!.product_category_id = req.fields.product_category_id;
      product!.name = req.fields.name;
      product!.price = req.fields.price;

      const filename = await product!.saveImage(req);

      if (filename) {
        await product!.deleteImage();
        product!.image = filename;
      }

      await product!.save();

      const result = {
        status: true,
        message: "Data updated successfully !",
        data: product,
      };

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // * Destroy service
  destroy = async (req: any) => {
    try {
      const product = await Product.findOne({
        _id: req.params.product_id,
      });

      await product!.deleteImage();

      await Product.deleteOne({
        _id: req.params.product_id,
      });

      const result = {
        status: true,
        message: "Data deleted successfully !",
      };

      return result;
    } catch (error) {
      console.log(error);
    }
  };
}

export default ProductService;
