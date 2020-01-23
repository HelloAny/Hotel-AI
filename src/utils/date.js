/**
 * 
 * @param {string} fmt 格式  
 * @param {string || number} date 时间
 * @example
 * let date = new Date()
 * dateFormat("YYYY-mm-dd HH:MM", date)
 * >>> 2019-06-06 19:45`
 */
export default function(fmt, timestamp) {
  let ret;
  let date = new Date(timestamp)
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}
