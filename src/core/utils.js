
export const guid = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
};

export const comparePlainObject =  (a, b) =>  {
  return JSON.stringify(a) === JSON.stringify(b);
};

export const ClearBr = value =>  {
  // 匹配<foo> or </foo>
  value = value.replace(/<\/?.+?>/g, '');
  // 匹配 \n 换行
  value = value.replace(/[\r\n]/g, '');
  return value;
};

export const isJsonString = str => {
  try {
    if (Object.prototype.toString.call(JSON.parse(str)) === '[object Array]') {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

const tempTypeMap = {};

['String', 'Function', 'Array', 'Number', 'RegExp', 'Object'].forEach(item => {
  var toString = Object.prototype.toString;
  tempTypeMap['is' + item] = (obj) => {
    return toString.apply(obj) === '[object ' + item + ']';
  };
});

export const type = tempTypeMap;
