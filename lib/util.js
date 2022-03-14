module.exports = {
  generateText: function (length) {
    let text = "";
    let chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let charLength = chars.length;
    for (let i = 0; i < length; i++) {
      text += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return text;
  },
};
