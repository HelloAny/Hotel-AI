import { get, post } from "@service/api";
import { HOTELAPI } from "@constants/api";

/**
 * originApi --- USERAPI
 */
const request = (method, url, data) => {
  return method(HOTELAPI + url, data);
};

/**
 * 用户曾经住过，或者已入住，或者已经预订的酒店
 * @param {object} param
 */
export const userHotelInfo = param => {
  const { id } = param;
  const url = "/order/order_home";
  const data = {
    uid: id
  };
  return request(post, url, data);
};
