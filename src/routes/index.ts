import express, { Router } from "express";

const router: Router = express.Router();

import authenticationRoute from "./authentication-route";
router.use("", authenticationRoute.export());

import productCategoryRoute from "./product-category-route";
router.use("", productCategoryRoute.export());

import productRoute from "./product-route";
router.use("", productRoute.export());

export default router;
