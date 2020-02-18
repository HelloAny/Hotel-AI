/**
 * 根据参数数量进行函数重载
 * @param {object} object 重载方法所属对象
 * @param {String} name 方法名
 * @param {function} fn 方法实现
 */
export default function(object, name, fn) {
  var old = object[name];
  object[name] = function() {
    if (fn.length === arguments.length) return fn.apply(this, arguments);
    else if (typeof old === "function") return old.apply(this, arguments);
  };
}
