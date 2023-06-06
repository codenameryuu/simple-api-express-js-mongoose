import { Response } from "express";

class FormatResponse {
  sendResponse = (req: any, res: Response) => {
    let data = null;
    let statusCode = 200;

    if (req.data) {
      data = req.data;
    }

    if (!req.status) {
      statusCode = 422;
    }

    let result: any = {
      status: req.status,
      message: req.message,
      data: data,
    };

    if (req.token) {
      result.token = req.token;
    }

    res.status(statusCode).send(result);
  };
}

export default FormatResponse;
