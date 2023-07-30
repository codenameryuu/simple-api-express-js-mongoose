import isset from "../helpers/isset";

import Product from "../models/product";

class ProductService {
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

      const data = await Product.paginate(conditional, setting);

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

  // * Detail data service
  detailData = async (req: any) => {
    try {
      const data = await Product.findOne({
        _id: req.params.product_id,
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
      const product = new Product();

      product.product_category_id = req.fields.product_category_id;
      product.name = req.fields.name;
      product.price = req.fields.price;

      const filename = product.saveImage(req);

      if (filename) {
        product.image = filename;
      }

      await product.save();

      const data = await Product.findOne({
        _id: product.id,
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

      const data = await Product.findOne({
        _id: product!._id,
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

  // * Detele data service
  deleteData = async (req: any) => {
    try {
      const product = await Product.findOne({
        _id: req.params.product_id,
      });

      await product!.deleteImage();

      await Product.deleteMany({
        _id: req.params.product_id,
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

export default ProductService;
