import path from "path";

const isImage = (file: any) => {
  const extName = path.extname(file.originalFilename);
  const data = extName.toLowerCase();

  if (data == ".jpg" || data == ".jpeg" || data == ".png") {
    return true;
  }

  return false;
};

const isMsExcel = (file: any) => {
  const extName = path.extname(file.originalFilename);
  const data = extName.toLowerCase();

  if (data == ".xlsx") {
    return true;
  }

  return false;
};

const isMsWord = (file: any) => {
  const extName = path.extname(file.originalFilename);
  const data = extName.toLowerCase();

  if (data == ".docx") {
    return true;
  }

  return false;
};

const isPdf = (file: any) => {
  const extName = path.extname(file.originalFilename);
  const data = extName.toLowerCase();

  if (data == ".pdf") {
    return true;
  }

  return false;
};

const isFileSizeAccepted = (file: any, maxSizeFile: any = null) => {
  if (!maxSizeFile) {
    maxSizeFile = 10000000;
  }

  const fileSize = file.size;

  if (fileSize < maxSizeFile) {
    return true;
  }

  return false;
};

export default {
  isImage,
  isMsExcel,
  isMsWord,
  isPdf,
  isFileSizeAccepted,
};
