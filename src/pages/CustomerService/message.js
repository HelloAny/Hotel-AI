import { overloadFn, isJson } from "../../utils/index";

export default class Message {
  static TYPES = ["TEXT", "IMAGE", "EMOJI"];
  static home = null; //用户身份 酒店人员标记hotel_编号

  /**[ 未初始化, 未读, 已读, 未发送, 已发送 ] */
  status = 0;
  type = "TEXT";
  content = "";
  from = Message.home || "me";
  date = Date.now();

  constructor() {
    overloadFn(this, "init", text => {
      this.content = text;
    });
    overloadFn(this, "init", (type, content) => {
      this.type = type;
      this.content = content;
    });
    overloadFn(this, "init", (type, date, jsonc) => {
      if (type.charAt(0) == "-") this.status = 1;
      else this.status = 2;

      if (type == "b")
        return this.msgFromRobot(jsonc, new Date(date).getTime());

      if (type == "a")
        if (this.isMsgToRobot(jsonc)) return this.msgToRobot(jsonc, date);

      this.toObject(jsonc);
    });
    this.init(...Array.prototype.slice.apply(arguments));
  }

  init() {
    return this;
  }

  msgFromRobot(text, date) {
    this.status = 2;
    this.content = text;
    this.date = new Date(date).getTime() || this.date;
    this.from = "hotel_0";
    return this;
  }

  isMsgToRobot(jsonc) {
    return !isJson(jsonc) || (typeof jsonc == "object" && !jsonc.type);
  }

  msgToRobot(ctx, date) {
    if(typeof ctx == "object" && ctx.path) this.type = "IMAGE"
    this.status = 4;
    this.content = ctx;
    this.date = new Date(date).getTime();
  }

  toObject(jsonc) {
    let { type, content, from, date } = JSON.parse(jsonc);
    this.type = type;
    this.content = content;
    this.from = from;
    this.date = new Date(date).getTime();
  }

  toMinMsg() {
    return {
      type: this.type,
      content: this.content,
      from: String(this.from),
      date: this.date
    };
  }

  toString() {
    return JSON.stringify({
      type: this.type,
      from: this.from,
      content: this.content,
      date: this.date
    });
  }
}
