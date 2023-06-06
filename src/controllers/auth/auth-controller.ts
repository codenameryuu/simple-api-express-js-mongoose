import { Request, Response } from "express";

import AuthValidation from "../../validations/auth/auth-validation";
const authValidation = new AuthValidation();

import AuthService from "../../services/auth/auth-service";
const authService = new AuthService();

import FormatResponse from "../../traits/format-response";
const formatResponse = new FormatResponse();

class AuthController {
  // * Login
  login = async (req: Request, res: Response) => {
    const validation = await authValidation.login(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await authService.login(req);

    formatResponse.sendResponse(result, res);
  };

  // * Register
  register = async (req: Request, res: Response) => {
    const validation = await authValidation.register(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await authService.register(req);

    formatResponse.sendResponse(result, res);
  };
}

export default AuthController;
