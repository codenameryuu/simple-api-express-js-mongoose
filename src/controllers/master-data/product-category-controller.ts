import { Request, Response } from "express";

import ProductCategoryValidation from "../../validations/master-data/product-category-validation";
const productCategoryValidation = new ProductCategoryValidation();

import ProductCategoryService from "../../services/master-data/product-category-service";
const productCategoryService = new ProductCategoryService();

import FormatResponse from "../../traits/format-response";
const formatResponse = new FormatResponse();

class ProductCategoryConntroller {
  // * Index
  index = async (req: Request, res: Response) => {
    const validation = await productCategoryValidation.index(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productCategoryService.index(req);

    formatResponse.sendResponse(result, res);
  };

  // * Show
  show = async (req: Request, res: Response) => {
    const validation = await productCategoryValidation.show(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productCategoryService.show(req);

    formatResponse.sendResponse(result, res);
  };

  // * Store
  store = async (req: Request, res: Response) => {
    const validation = await productCategoryValidation.store(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productCategoryService.store(req);

    formatResponse.sendResponse(result, res);
  };

  // * Update
  update = async (req: Request, res: Response) => {
    const validation = await productCategoryValidation.update(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productCategoryService.update(req);

    formatResponse.sendResponse(result, res);
  };

  // * Destroy
  destroy = async (req: Request, res: Response) => {
    const validation = await productCategoryValidation.destroy(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productCategoryService.destroy(req);

    formatResponse.sendResponse(result, res);
  };
}

export default ProductCategoryConntroller;
