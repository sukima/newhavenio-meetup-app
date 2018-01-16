function paramGetter(obj) {
  return function(param, defaultValue) {
    return obj[param] == null ? defaultValue : obj[param];
  };
}

module.exports = paramGetter
