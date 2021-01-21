exports.guid = () => {
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

exports.comparePlainObject = function (a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
};

['String', 'Function', 'Array', 'Number', 'RegExp', 'Object'].forEach(function (
  v
) {
  var toString = Object.prototype.toString;
  exports['is' + v] = function (obj) {
    return toString.apply(obj) === '[object ' + v + ']';
  };
});

exports.ClearBr = function (key) {
  // 匹配<foo> or </foo>
  key = key.replace(/<\/?.+?>/g, '');
  // 匹配 \n 换行
  key = key.replace(/[\r\n]/g, '');
  return key;
};


exports.isJsonString = function (str) {
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
