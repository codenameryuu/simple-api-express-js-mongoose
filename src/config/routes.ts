import express, { Router } from "express";
import RouteGroup from "express-route-grouping";
import auth from "../middleware/auth";

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
  // * Index
  router.get("", auth, productCategoryController.index);

  // * Show
  router.get("/:product_category_id", auth, productCategoryController.show);

  // * Store
  router.post("", auth, productCategoryController.store);

  // * Update
  router.put("/:product_category_id", auth, productCategoryController.update);

  // * Delete
  router.delete(
    "/:product_category_id",
    auth,
    productCategoryController.destroy
  );
});

// * Master Data -> Product
import ProductController from "../controllers/master-data/product-controller";
const productController = new ProductController();

router.group("/product", (router) => {
  // * Index
  router.get("", auth, productController.index);

  // * Show
  router.get("/:product_id", auth, productController.show);

  // * Store
  router.post("", auth, productController.store);

  // * Update
  router.put("/:product_id", auth, productController.update);

  // * Delete
  router.delete("/:product_id", auth, productController.destroy);
});

export default router;
