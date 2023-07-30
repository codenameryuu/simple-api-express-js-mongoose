import express, { Router } from "express";
import RouteGroup from "express-route-grouping";
import auth from "../middleware/auth";

const router = new RouteGroup("/", Router());

// * Product
import ProductController from "../controllers/product-controller";
const productController = new ProductController();

router.group("/product", (router) => {
  // * Get data
  router.get("", auth, productController.getData);

  // * Detail data
  router.get("/:product_id", auth, productController.detailData);

  // * Create data
  router.post("", auth, productController.createData);

  // * Update data
  router.put("/:product_id", auth, productController.updateData);

  // * Delete data
  router.delete("/:product_id", auth, productController.deleteData);
});

export default router;
