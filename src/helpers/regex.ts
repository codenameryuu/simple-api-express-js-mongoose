const containAlphabet = (params: any) => {
  var regExp = /[a-zA-Z]/g;

  if (regExp.test(params)) {
    return true;
  }

  return false;
};

const containNumber = (params: any) => {
  var regExp = /[0-9]/;

  if (regExp.test(params)) {
    return true;
  }

  return false;
};

const containSpecialCharacter = (params: any) => {
  var regExp = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (regExp.test(params)) {
    return true;
  }

  return false;
};

const alphabetOnly = (params: any) => {
  var regExp = /^[A-Z]+$/i;

  if (regExp.test(params)) {
    return true;
  }

  return false;
};

const numberOnly = (params: any) => {
  var regExp = /^[0-9]+$/;

  if (regExp.test(params)) {
    return true;
  }

  return false;
};

export default {
  containAlphabet,
  containNumber,
  containSpecialCharacter,
  alphabetOnly,
  numberOnly,
};
