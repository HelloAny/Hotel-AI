import { get, post } from "@service/api";
import { HOTELAPI } from "@constants/api";

const request = (method, url, data) => {
  return method(HOTELAPI + url, data);
};

/**
 * 获取所有行程列表
 * @param {{uid: String}} param
 */
export function getJourneyList(param) {
  const { uid } = param;
  const url = "/visit/user_info";
  const req = {
    uid
  };

  return request(post, url, req).then(res => {
    let data = res.data;
    if (!data || data.code != 200) return data;
    data.records.forEach(r => {
      if (r.check_in_time) r.check_in_time *= 1000;
      if (r.check_out_time) r.check_out_time *= 1000;
      if (r.start_time)
        r.start_time = r.start_time * 1000 + 16 * 60 * 60 * 1000;
      if (r.add_time) r.add_time *= 1000;
      if (r.end_time) r.end_time = r.end_time * 1000 + 16 * 60 * 60 * 1000;
    });
    return data;
  });
}

/**
 * 获取指定行程详情
 * @param {{journey_id: String}} param
 */
export function getJourneyDetails(param) {
  const { journey_id } = param;
  const url = "/visit/journey_info";
  const req = {
    journey_id
  };

  return request(post, url, req).then(res => {
    let data = res.data;
    if (!data || data.code != 200) return data;
    data.journey_info.check_in_time *= 1000;
    data.journey_info.check_out_time *= 1000;
    data.journey_info.order_time *= 1000;
    data.journey_info.out_back_time *= 1000;
    return data;
  });
}
