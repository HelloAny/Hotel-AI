import { overloadFn } from "../../../../utils";
import { UUID, dateFormat } from "../../../../utils";

/**
 * 所有消息类型
 * 素质加上
 */
const TYPES = ["TEXT", "IMAGE", "VOICE", "EMOJI", "TIME"];

/**
 * 消息体 UUID 标识
 */
const MESSAGE_VERSION = "0.0.1";
const MESSAGE_FLAG = "MESSAGE";

/**
 * 静态资源 UUID 标识
 */
const IMAGE_VERSION = "0.0.1";
const IMAGE_FLAG = "IMAGE";
const VOICE_VERSION = "0.0.1";
const VOICE_FLAG = "VOICE";

/**
 * 各类消息UI所需结构体
 */
const Structs = {
  TIME: time => {
    if (time instanceof Date) {
      return { time: dateFormat("HH:MM", time) };
    }
    return { time };
  },
  TEXT: content => {
    return { content };
  },
  IMAGE: obj => {
    return Object.assign(
      {
        width: 20,
        height: 20,
        path: ""
      },
      obj
    );
  },
  VOICE: obj => {
    return Object.assign(
      {
        path: "",
        duration: 0,
        text: ""
      },
      obj
    );
  },
  EMOJI: obj => {
    return Object.assign(
      {
        width: 20,
        height: 20,
        path: ""
      },
      obj
    );
  }
};

/**
 * 单条消息对象
 */
export default class MessageBody {
  static get TYPES() {
    return TYPES;
  }
  static get MESSAGE_VERSION() {
    return MESSAGE_VERSION;
  }
  static get MESSAGE_FLAG() {
    return MESSAGE_FLAG;
  }
  static get IMAGE_VERSION() {
    return IMAGE_VERSION;
  }
  static get IMAGE_FLAG() {
    return IMAGE_FLAG;
  }
  static get VOICE_VERSION() {
    return VOICE_VERSION;
  }
  static get VOICE_FLAG() {
    return VOICE_FLAG;
  }

  /**
   * 设置 uuid
   * 提取description、info、sender属性
   */
  static parse = (uuid, str) => {
    let msg = new MessageBody().parse(str);
    msg.uuid = new UUID(uuid);
    return msg;
  };

  /**
   * 消息体唯一UUID
   * @type {UUID}
   */
  uuid = null;

  /**
   * UI 描述,
   * 默认TEXT
   */
  description = {
    type: "TEXT",
    content: "未初始化"
  };

  /**
   * 发送者信息
   */
  sender = null;

  /**
   * 消息额外信息
   */
  info = {
    timestamp: Date.now()
  };

  constructor() {
    this.uuid = UUID.generate(
      MessageBody.MESSAGE_VERSION,
      MessageBody.MESSAGE_FLAG
    );
    overloadFn(this, "init", text => {
      let creator = Structs["TEXT"];
      this.description = creator ? creator(text) : null;
      this.description.type = "TEXT";
    });
    overloadFn(this, "init", (type, obj) => {
      let creator = Structs[type];
      this.description = creator ? creator(obj) : null;
      this.description.type = type;
    });
    overloadFn(this, "init", (uuid, str, sender) => {
      this.uuid = new UUID(uuid);
      this.parse(str);
      this.sender = sender;
    });
    this.init(...Array.prototype.slice.apply(arguments));
  }

  init() {
    return this;
  }

  /**
   * 提取description、info、sender属性
   * @param {string} str
   */
  parse(str) {
    let obj = JSON.parse(str);
    this.description = obj.description;
    this.info = obj.info;
    this.sender = obj.sender;
    return this;
  }

  /**
   * uuid对象转字符,
   * 返回包含uuid，description，sender，info对象JSON字符
   */
  stringify() {
    return JSON.stringify({
      uuid: this.uuid.toString(),
      description: this.description,
      sender: this.sender,
      info: this.info
    });
  }
}
