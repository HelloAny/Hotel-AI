import Taro from "@tarojs/taro";
/**
 * @param {string} select css选择器
 * @param {string} direction 方向[top,bottom] 默认 bottom
 * @param {number} time 滑动时间
 */
export default function(selector, direction = "bottom", time = 0) {
  if(!selector) return null;
  const query = Taro.createSelectorQuery();
  query.select(selector);
  query.selectViewport().scrollOffset();
  query.exec(function(res) {
    Taro.pageScrollTo({
      scrollTop: direction == "top" ? 0 : res[0].scrollHeight,
      duration: time,
      selector
    });
  });
}
