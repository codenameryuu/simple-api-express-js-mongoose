import { Request, Response } from "express";

import ProductCategoryValidation from "../validations/product-category-validation";
const productCategoryValidation = new ProductCategoryValidation();

import ProductCategoryService from "../services/product-category-service";
const productCategoryService = new ProductCategoryService();

import FormatResponse from "../traits/format-response";
const formatResponse = new FormatResponse();

class ProductCategoryConntroller {
  // * Get Data
  getData = async (req: Request, res: Response) => {
    const validation = await productCategoryValidation.getData(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productCategoryService.getData(req);

    formatResponse.sendResponse(result, res);
  };

  // * Detail data
  detailData = async (req: Request, res: Response) => {
    const validation = await productCategoryValidation.detailData(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productCategoryService.detailData(req);

    formatResponse.sendResponse(result, res);
  };

  // * Create data
  createData = async (req: Request, res: Response) => {
    const validation = await productCategoryValidation.createData(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productCategoryService.createData(req);

    formatResponse.sendResponse(result, res);
  };

  // * Update data
  updateData = async (req: Request, res: Response) => {
    const validation = await productCategoryValidation.updateData(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productCategoryService.updateData(req);

    formatResponse.sendResponse(result, res);
  };

  // * Delete data
  deleteData = async (req: Request, res: Response) => {
    const validation = await productCategoryValidation.deleteData(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productCategoryService.deleteData(req);

    formatResponse.sendResponse(result, res);
  };
}

export default ProductCategoryConntroller;
