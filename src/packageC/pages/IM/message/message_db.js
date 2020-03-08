import Taro from "@tarojs/taro";
import { autorun } from "mobx";
import { userStore } from "../../../../store";
import { UUID, dateFormat } from "../../../../utils";
import Message from "./message_body";

/**
 * 消息穿插时间
 * @param {Array<Message>} target
 * @param {Boolean} add
 * @param {Number} oldest target最旧信息下标
 * @param {Array<UUID>} source
 */
function _addTimer(target, add, oldest, source) {
  // 长度零无效
  if (target.length == 0) return;
  let limitTime = target[target.length - 1].info.timestamp;

  // 穿插时间
  for (let i = target.length - 1; i > -1; i--) {
    const msg = target[i];
    if (limitTime - msg.info.timestamp > 10 * 60 * 1000) {
      target.splice(i, 0, new Message("TIME", _getTipTime(limitTime)));
    }
    limitTime = msg.info.timestamp;
  }
  if (oldest == 0)
    target.splice(0, 0, new Message("TIME", _getTipTime(limitTime)));

  if (!add || oldest == 0) return target;

  // 追加邻近消息
  let num = 0;
  let msgId = source[--oldest];
  let msg = Message.parse(msgId, Taro.getStorageSync(msgId));
  while (
    num < 20 &&
    oldest > 0 &&
    limitTime - msg.info.timestamp < 10 * 60 * 1000
  ) {
    target.unshift(msg);
    num++;
    msgId = source[--oldest];
    msg = Message.parse(msgId, Taro.getStorageSync(msgId));
  }
  target.splice(0, 0, new Message("TIME", _getTipTime(limitTime)));
  return target;
}

/**
 * 获取合适的时间提示
 * @param {Number} timestamp 时间戳
 */
function _getTipTime(timestamp) {
  let date1 = new Date(timestamp);
  let date2 = new Date();
  if (date1.getFullYear() != date2.getFullYear()) {
    return dateFormat("YYYY-mm-dd HH:MM", timestamp);
  }
  if (
    date1.getMonth() != date2.getMonth() ||
    date1.getDate() != date2.getDate()
  ) {
    return dateFormat("mm-dd HH:MM", timestamp);
  }
  return dateFormat("HH:MM", timestamp);
}

class RoomStruct {
  constructor({
    uuid = "",
    master = "",
    members = [],
    messageList = [],
    phone = ""
  }) {
    this.uuid = new UUID(uuid);
    this.master = master;
    this.members = members;
    this.messageList = messageList;
    this.phone = phone;

    this.messageList.push = msgId => {
      Array.prototype.push.call(this.messageList, msgId);
      this.onPush(msgId);
    };
  }

  /**
   * 返回信息List,不包括下标为end.
   * start 0 指向最旧消息.
   * end为 -1 或 "last", 指向最新消息
   * @param {Number | UUID} start 起始消息位置，若为uuid则返回一条
   * @param {Number | String} end 结束消息位置
   * @param {Boolean} timer 是否插入时间
   * @param {Boolean} add 追加末尾时间段临近消息
   * 若追加，则注意start 下标变化
   */
  getMessage(start, end, timer, add) {
    if (typeof start == "string") return MessageDB.getMessage(start);

    let list = [];
    let last = end == -1 || end == "last" ? this.messageList.length : end;
    for (let i = start; i < last; i++) {
      const msgId = this.messageList[i];
      let msg = MessageDB.getMessage(msgId);
      if (msg) list.push(msg);
    }

    if (timer) {
      _addTimer(list, add, start, this.messageList);
    }

    return list;
  }

  getMsgAmount() {
    return this.messageList.length;
  }

  onPush() {}

  setPhone(phone) {
    if (phone) this.phone = phone;
    Taro.setStorageSync(this.uuid.toString(), this);
  }
}

class MessageDB {
  dbInfo = {
    dbName: "",
    master: {
      ID: "",
      uuid: "",
      robotRoom: "",
      info: {}
    },
    rooms: []
  };

  /**
   * 所有房间信息
   */
  rooms = new Map();

  /**
   * 创建或初始化IM数据库
   * @param {object} obj 配置项
   */
  constructor(dbName) {
    this.init(dbName);
    this.disposer = autorun(() => {
      let userInfo = userStore.user;
      if (this.dbInfo.master.ID && userInfo.id != this.dbInfo.master.ID)
        createMessageDB(userInfo.id);
      else this.updateMasterInfo(userInfo);
    });
    db = this;
  }

  /**
   * 初始化db信息
   * @param {*} dbName
   */
  init(dbName) {
    let dbInfo = MessageDB.getDB(dbName);
    this.dbInfo = dbInfo ? dbInfo : this.dbInfo;
    this.dbInfo.dbName = dbName;
    this.loadRoomsInfo();
  }

  /**
   * 初始化所有房间信息
   */
  loadRoomsInfo() {
    this.dbInfo.rooms.forEach(id => {
      this.rooms.set(id, MessageDB.getRoom(id));
    });

    let robotRoomId = this.dbInfo.master.robotRoom;
    if (robotRoomId) {
      let robotRoom = MessageDB.getRoom(robotRoomId);
      if (!robotRoom.master) robotRoom.master = this.dbInfo.master.uuid;
      this.rooms.set(robotRoomId, robotRoom);
    }
  }

  /**
   * 提供 id 或 uuid 或 robotRoom， 设置 db master， 并保存
   */
  setMaster({ ID = "", uuid = "", robotRoom = "" }) {
    if (ID) this.dbInfo.master.ID = ID;
    if (uuid) this.dbInfo.master.uuid = uuid;
    if (robotRoom) this.dbInfo.master.robotRoom = robotRoom;
    this._saveDB();
  }

  updateMasterInfo(info) {
    this.dbInfo.master.info = info;
    this.dbInfo.master.ID = info.id || this.dbInfo.master.ID;
    this._saveDB();
  }

  /**
   * 加入房间
   * @param {UUID} uuid 房间唯一id 服务器生成
   * @param {UUID} master 主人
   * @param {Array<UUID>} members 成员包括主人
   */
  joinRoom(uuid, master, members) {
    this.dbInfo.rooms.push(uuid);
    this.rooms.set(uuid, new RoomStruct({ uuid, master, members }));
    this._saveDB();
    this._saveRoom(uuid);
    return uuid;
  }

  /**
   * 返回对应房间对象
   * @param {UUID} roomId 房间id
   * @returns {RoomStruct}
   */
  in(roomId) {
    return this.rooms.get(roomId);
  }

  /**
   * 向指定房间添加消息,同时消息将保存到本地
   * @param {UUID} roomId 房间id
   * @param {Message | Array<Message>} msgs 消息对象
   */
  pushMessage(roomId, msgs) {
    if (!(msgs instanceof Array)) msgs = [msgs];
    let room = this.getRoom(roomId);
    msgs.forEach(msg => {
      this._saveMessage(msg);
      room.messageList.push(msg.uuid.toString());
    });
    this._saveRoom(roomId);
  }

  /**
   * 更新特殊种类消息记录
   * @param {"IMAGE" | "VOICE"} type 类型
   * @param {UUID} uuid 消息id
   * @param {Object} option 需要更新的key-value集合对象
   */
  updateMessage(type, uuid, option) {
    let msg = null;
    switch (type) {
      case "IMAGE":
        msg = MessageDB.getMessage(uuid);
        msg.description.path = option.url;
        this._saveMessage(msg);
        break;
      case "VOICE":
        msg = MessageDB.getMessage(uuid);
        msg.description.path = option.url;
        if (option.text) msg.description.text = option.text;
        this._saveMessage(msg);
        break;
      default:
        return false;
    }
    return true;
  }

  /**
   * 从Storage获取dbInfo
   * @param {String} dbName
   */
  static getDB(dbName) {
    return Taro.getStorageSync(dbName);
  }
  getDB(dbName) {
    return Taro.getStorageSync(dbName);
  }

  /**
   * 从Storage获取房间对象
   * @param {UUID} uuid
   */
  static getRoom(uuid) {
    if (typeof uuid == "object") uuid = uuid.toString();
    let roomInfo = Taro.getStorageSync(uuid);
    return new RoomStruct(roomInfo ? roomInfo : { uuid });
  }
  getRoom(uuid) {
    if (typeof uuid == "object") uuid = uuid.toString();
    if (!this.rooms.get(uuid)) {
      this.rooms.set(
        uuid,
        new RoomStruct({ uuid, master: this.dbInfo.master.uuid })
      );
      this.dbInfo.rooms.push(uuid);
      this._saveDB();
      this._saveRoom(uuid);
    }
    return this.rooms.get(uuid);
  }

  /**
   * 从Storage获取消息对象
   * @param {UUID} uuid
   */
  static getMessage(uuid) {
    if (typeof uuid == "object") uuid = uuid.toString();
    let info = Taro.getStorageSync(uuid);
    return info ? Message.parse(uuid, info) : null;
  }
  getMessage(uuid) {
    if (typeof uuid == "object") uuid = uuid.toString();
    let info = Taro.getStorageSync(uuid);
    return info ? Message.parse(uuid, info) : null;
  }

  /**
   * 查找房间
   */
  getRoomByPhone(phone) {
    let res = null;
    this.rooms.forEach(room => {
      if (room.phone == phone) res = room;
    });
    return res;
  }

  /**
   * 保存dbInfo到本地
   */
  _saveDB() {
    Taro.setStorageSync(this.dbInfo.dbName, this.dbInfo);
  }

  /**
   * 保存房间信息到本地
   * @param {UUID} uuid 房间id
   */
  _saveRoom(uuid) {
    let room = this.rooms.get(uuid);
    Taro.setStorageSync(uuid, room);
  }

  /**
   * 消息保存到本地
   * @param {Message} msg
   */
  _saveMessage(msg) {
    Taro.setStorageSync(msg.uuid.toString(), msg.stringify());
  }
}

let db = new MessageDB("customer service v0.1 " + userStore.user.id);

/**
 * 切换新的db。 不存在则创建
 * @param {number} id 用户id
 */
export function createMessageDB(id) {
  db = new MessageDB("customer service v0.1 ") + id;
}

export default db;
