import md5 from "blueimp-md5";

/**
 * MD5加密
 * @param {number} code 验证码*
 * @param {string} rand 加密值*
 */
let setMd5 = (code, rand) => {
  return code && rand ? md5(code + rand) : -1;
};

export { setMd5 };
