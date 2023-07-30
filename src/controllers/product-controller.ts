import { Request, Response } from "express";

import ProductValidation from "../validations/product-validation";
const productValidation = new ProductValidation();

import ProductService from "../services/product-service";
const productService = new ProductService();

import FormatResponse from "../traits/format-response";
const formatResponse = new FormatResponse();

class ProductConntroller {
  // * Get data
  getData = async (req: Request, res: Response) => {
    const validation = await productValidation.getData(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productService.getData(req);

    formatResponse.sendResponse(result, res);
  };

  // * Detail data
  detailData = async (req: Request, res: Response) => {
    const validation = await productValidation.detailData(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productService.detailData(req);

    formatResponse.sendResponse(result, res);
  };

  // * Create data
  createData = async (req: Request, res: Response) => {
    const validation = await productValidation.createData(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productService.createData(req);

    formatResponse.sendResponse(result, res);
  };

  // * Update data
  updateData = async (req: Request, res: Response) => {
    const validation = await productValidation.updateData(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productService.updateData(req);

    formatResponse.sendResponse(result, res);
  };

  // * Delete data
  deleteData = async (req: Request, res: Response) => {
    const validation = await productValidation.deleteData(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productService.deleteData(req);

    formatResponse.sendResponse(result, res);
  };
}

export default ProductConntroller;
