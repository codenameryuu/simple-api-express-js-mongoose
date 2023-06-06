import { Request, Response } from "express";

import ProductValidation from "../../validations/master-data/product-validation";
const productValidation = new ProductValidation();

import ProductService from "../../services/master-data/product-service";
const productService = new ProductService();

import FormatResponse from "../../traits/format-response";
const formatResponse = new FormatResponse();

class ProductConntroller {
  // * Index
  index = async (req: Request, res: Response) => {
    const validation = await productValidation.index(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productService.index(req);

    formatResponse.sendResponse(result, res);
  };

  // * Show
  show = async (req: Request, res: Response) => {
    const validation = await productValidation.show(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productService.show(req);

    formatResponse.sendResponse(result, res);
  };

  // * Store
  store = async (req: Request, res: Response) => {
    const validation = await productValidation.store(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productService.store(req);

    formatResponse.sendResponse(result, res);
  };

  // * Update
  update = async (req: Request, res: Response) => {
    const validation = await productValidation.update(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productService.update(req);

    formatResponse.sendResponse(result, res);
  };

  // * Destroy
  destroy = async (req: Request, res: Response) => {
    const validation = await productValidation.destroy(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productService.destroy(req);

    formatResponse.sendResponse(result, res);
  };
}

export default ProductConntroller;
