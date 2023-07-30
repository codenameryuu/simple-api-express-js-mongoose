import express, { Router } from "express";
import RouteGroup from "express-route-grouping";
import auth from "../middleware/auth";

const router = new RouteGroup("/", Router());

// * Product Category
import ProductCategoryController from "../controllers/product-category-controller";
const productCategoryController = new ProductCategoryController();

router.group("/product-category", (router) => {
  // * Get data
  router.get("", auth, productCategoryController.getData);

  // * Detail data
  router.get("/:product_category_id", auth, productCategoryController.detailData);

  // * Create data
  router.post("", auth, productCategoryController.createData);

  // * Update data
  router.put("/:product_category_id", auth, productCategoryController.updateData);

  // * Delete data
  router.delete("/:product_category_id", auth, productCategoryController.deleteData);
});

export default router;
