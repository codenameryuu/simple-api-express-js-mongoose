const loopCheck = (array: any, prop: any, value: any) => {
  let result = [];

  for (let i = 0; i < array.length; i++) {
    let obj = array[i];
    let item = obj[prop];

    if (item == value) {
      result.push(item);
    }
  }

  return result;
};

export default loopCheck;
