/**
 * 图片转化成base64编码
 * @param {String} img 图片
 */
let image2Base64 = imgUrl => {
  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().readFile({
      filePath: imgUrl,
      encoding: "base64",
      success: function(res) {
        resolve(res.data);
      },
      fail: function(err) {
        console.log("base64转码错误");
      }
    });
  });
};

export { image2Base64 };
