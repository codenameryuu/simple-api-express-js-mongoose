import ProductCategory from "../models/product-category";
import Product from "../models/product";
import User from "../models/user";

const register = () => {
  new ProductCategory();
  new Product();
  new User();
};

export default register;
