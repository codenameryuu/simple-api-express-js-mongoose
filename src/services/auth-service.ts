import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/user";

const jwtSecretKey = process.env.JWT_SECRET_KEY ?? "";

class AuthService {
  // * Login service
  login = async (req: any) => {
    try {
      const user = await User.findOne({
        email: req.fields.email,
      });

      const token = jwt.sign(
        {
          userId: user!.id,
          email: user!.email,
        },
        jwtSecretKey!,
        {}
      );

      const result = {
        status: true,
        message: "Data berhasil diambil !",
        data: user,
        token: token,
      };

      return result;
    } catch (err: any) {
      const result = {
        status: false,
        message: "Data gagal diambil !",
      };

      return result;
    }
  };

  // * Register service
  register = async (req: any) => {
    try {
      const user = new User();

      user.name = req.fields.name;
      user.email = req.fields.email;
      user.password = await bcrypt.hash(req.fields.password, 10);

      const filename = user.saveImage(req);

      if (filename) {
        user.image = filename;
      }

      await user.save();

      const data = await User.findOne({
        _id: user.id,
      });

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        jwtSecretKey,
        {}
      );

      const result = {
        status: true,
        message: "Data berhasil disimpan !",
        data: data,
        token: token,
      };

      return result;
    } catch (err: any) {
      const result = {
        status: false,
        message: "Data gagal disimpan !",
      };

      return result;
    }
  };
}

export default AuthService;
