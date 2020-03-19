import { get, post } from "@service/api";
import { USERAPI } from "@constants/api";

/**
 * originApi --- MAPAPI
 */
const request = (method, url, data) => {
  return method(USERAPI + url, data);
};

/**
 * 获取地区信息
 */
export const getDistrict = () => {
  const url = `/api/map/district/?keywords=中国&subdistrict=3`;

  return request(get, url);
};
