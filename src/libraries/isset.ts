const isset = (params: any) => {
  if (typeof params == "undefined" || params == null) {
    return false;
  }

  return true;
};

export default isset;
