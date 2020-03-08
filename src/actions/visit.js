import { get, post } from "@service/api";
import { HOTELAPI, USERAPI } from "@constants/api";

const request = (method, url, data) => {
  return method(HOTELAPI + url, data);
};

/**
 * 获取酒店列表
 */
export function getHotelsList() {
  const url = "/visit/hotels_info";
  const req = {};

  return request(post, url, req).then(res => {
    let data = res.data;
    if (!data || data.code != 200) return Promise.reject(data);
    return data.results;
  });
}

/**
 * 模糊搜索房间
 * @param {{ hotel_id:String, inp:String }} param
 */
export function getVagueRoomInfo(param) {
  const { hotel_id, inp } = param;
  const url = "/visit/room_info";
  const req = { hotel_id, inp };

  return request(post, url, req).then(res => {
    let data = res.data;
    if (!data || data.code != 200) return Promise.reject(data);
    return data.rooms;
  });
}

/**
 * 发送访问申请
 * @param {{ uid, room_Id, note, beginDate, endDate }} param
 */
export function applyVisit(param) {
  let { uid, room_Id, note, beginDate, endDate } = param;

  beginDate = Math.floor(beginDate / 1000);
  endDate = Math.floor(endDate / 1000);

  const url = "/visit/send_visit";
  const req = { uid, room_Id, note, beginDate, endDate };

  return request(post, url, req).then(res => {
    let data = res.data;
    if (!data || data.code != 200) return Promise.reject(data);
    return data;
  });
}

/**
 * 搜索用户
 * 用户名 | 手机号
 */
export function searchLodger(v) {
  const url = USERAPI + "/api/user/search/";
  const req = { keywords: v };
  return get(url, req).then(res => {
    if (res.data.status == 0) return res.data.data;
    else return Promise.reject(res);
  });
}

/**
 * 获取访问申请详情
 * @param {number} visitId 访问申请id
 */
export function getVisitInfo(visitId) {
  const url = "/visit/visit_info";
  const req = { visit_id: visitId };

  return request(post, url, req).then(res => {
    if (res.data.code == 200) {
      res.data.res.apply_time = res.data.res.apply_time * 1000;
      res.data.res.end_time = res.data.res.end_time * 1000;
      res.data.res.start_time = res.data.res.start_time * 1000;
      return res.data.res;
    } else {
      return Promise.reject(res.data);
    }
  });
}

/**
 * 接受访问申请
 * @param {number} visitId 访问申请id
 */
export function acceptVisit(visitId) {
  const url = "/visit/refuse_in";
  const req = { visit_id: visitId };

  return request(post, url, req).then(res => {
    if (res.data.code == 200) return res.data;
    else return Promise.reject(res.data);
  });
}

/**
 * 拒绝访问申请
 * @param {number} visitId 访问申请id
 */
export function refuseVisit(visitId) {
  const url = "/visit/accept_in";
  const req = { visit_id: visitId };

  return request(post, url, req).then(res => {
    if (res.data.code == 200) return res.data;
    else return Promise.reject(res.data);
  });
}
