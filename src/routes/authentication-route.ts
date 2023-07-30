import express, { Router } from "express";
import RouteGroup from "express-route-grouping";

const router = new RouteGroup("/", Router());

// * Auth
import AuthController from "../controllers/auth-controller";
const authController = new AuthController();

router.group("", (router) => {
  // * Login
  router.post("/login", authController.login);

  // * Register
  router.post("/register", authController.register);
});

export default router;
