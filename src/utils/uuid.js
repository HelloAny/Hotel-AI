import { hex_md5 } from "./md5";
export default class UUID {
  /**
   * 生成唯一标识
   * 16进制时间戳-版本8-标识8-随机数4
   * @param {string} version 版本
   * @param {string} identify 自定义标识
   * @returns {UUID} UUID
   */
  static generate(version, identify) {
    let hashV = UUID._md5(version);
    let hashID = UUID._md5(identify);
    let timestamp = Date.now().toString(16);
    let random = Math.floor(Math.random() * (9999 - 1000) + 1000).toString();
    return new UUID(`${timestamp}-${hashV}-${hashID}-${random}`);
  }

  static _md5(msg) {
    let md5 = hex_md5(msg).split("");
    let res = "";
    for (let i = 0; i < md5.length / 4; i++) res += md5[i * 4];
    return res;
  }

  uuid = "";
  timestamp = "";
  version = "";
  identify = "";

  /**
   *
   * @param {String} uuid
   */
  constructor(uuid) {
    if (!uuid) throw "no uuid provided!";
    if (typeof uuid == "object") uuid = uuid.uuid
    let uuidArr = uuid.split("-");
    this.uuid = uuid;
    this.timestamp = uuidArr[0];
    this.version = uuidArr[1];
    this.identify = uuidArr[2];
  }

  /**
   *
   * @param {UUID} u2 目标对象
   * 若比目标对象生成早则返回true
   */
  compareTime(u2) {
    let time1 = this.getTime();
    let time2 = u2.getTime();
    return time1 < time2;
  }

  compareVersion(u2) {
    return u2.getVersion() == this.getVersion();
  }

  compareIdentify(u2) {
    return u2.getIdentify() == this.getIdentify();
  }

  equal() {
    return u2.toString() == this.toString();
  }

  /**
   * @returns {Number} 时间戳
   */
  getTime() {
    return parseInt(this.timestamp, 16);
  }

  getVersion() {
    return this.version;
  }

  getIdentify() {
    return this.identify;
  }

  toString() {
    return this.uuid;
  }
}
