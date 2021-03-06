/**
 * 返回对相应的数据类型
 */
function getType(data) {
  return Object.prototype.toString
    .call(data)
    .substring(8)
    .split(/]/)[0];
}

/**
 * @param {*} sourceObj
 * @param {*} compareObj
 *
 * 深度比较对象是否相等
 */
let comparisonObject = (sourceObj, compareObj) => {
  if (arguments.length < 2) throw "Incorrect number of parameters";
  let sourceType = getType(sourceObj);
  if (sourceType !== getType(compareObj)) return false;
  // Not objects and arrays
  if (
    sourceType !== "Array" &&
    sourceType !== "Object" &&
    sourceType !== "Set" &&
    sourceType !== "Map"
  ) {
    if (sourceType === "Number" && sourceObj.toString() === "NaN") {
      return compareObj.toString() === "NaN";
    }
    if (sourceType === "Date" || sourceType === "RegExp") {
      return sourceObj.toString() === compareObj.toString();
    }
    return sourceObj === compareObj;
  } else if (sourceType === "Array") {
    if (sourceObj.length !== compareObj.length) return false;
    if (sourceObj.length === 0) return true;
    for (let i = 0; i < sourceObj.length; i++) {
      if (!comparisonObject(sourceObj[i], compareObj[i])) return false;
    }
  } else if (sourceType === "Object") {
    let sourceKeyList = Reflect.ownKeys(sourceObj);
    let compareKeyList = Reflect.ownKeys(compareObj);
    let key;
    if (sourceKeyList.length !== compareKeyList.length) return false;
    for (let i = 0; i < sourceKeyList.length; i++) {
      key = sourceKeyList[i];
      if (key !== compareKeyList[i]) return false;
      if (!comparisonObject(sourceObj[key], compareObj[key])) return false;
    }
  } else if (sourceType === "Set" || sourceType === "Map") {
    // 把 Set Map 转为 Array
    if (!comparisonObject(Array.from(sourceObj), Array.from(compareObj)))
      return false;
  }
  return true;
};

/**
 *
 * @param {*} sourceObj
 * @param {*} compareObj
 * @param {[string]} keys
 *
 * 指定key深度比较对象是否相等
 */
let objectDeepCompare = (sourceObj, compareObj, keys=[]) => {
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const source = sourceObj[key];
    const target = compareObj[key];
    if (typeof source === "undefined" || typeof target === "undefined") console.warn( "compare keys error: " + key );
    else if (!comparisonObject(source, target)) return false;
  }
  return true;
};
export { comparisonObject, objectDeepCompare };
