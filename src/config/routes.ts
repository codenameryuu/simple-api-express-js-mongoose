import express, { Router } from "express";
import RouteGroup from "express-route-grouping";
// const auth = require("../apps/Middleware/Auth");

const router = new RouteGroup("/", Router());

// * Auth
import AuthController from "../controllers/auth/auth-controller";
const authController = new AuthController();

router.group("", (router) => {
  // * Login
  router.post("/login", authController.login);

  // * Register
  router.post("/register", authController.register);
});

// * Master Data -> Product Category
import ProductCategoryController from "../controllers/master-data/product-category-controller";
const productCategoryController = new ProductCategoryController();

router.group("/product-category", (router) => {
  // * User JWT Auth
  // router.use(auth);

  // * Index
  router.get("", productCategoryController.index);

  // * Show
  router.get("/:product_category_id", productCategoryController.show);

  // * Store
  router.post("", productCategoryController.store);

  // * Update
  router.put("/:product_category_id", productCategoryController.update);

  // * Delete
  router.delete("/:product_category_id", productCategoryController.destroy);
});

// * Master Data -> Product
import ProductController from "../controllers/master-data/product-controller";
const productController = new ProductController();

router.group("/product", (router) => {
  // * User JWT Auth
  // router.use(auth);

  // * Index
  router.get("", productController.index);

  // * Show
  router.get("/:product_id", productController.show);

  // * Store
  router.post("", productController.store);

  // * Update
  router.put("/:product_id", productController.update);

  // * Delete
  router.delete("/:product_id", productController.destroy);
});

export default router;
