const ajax = (url, params, method) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: params ? params : {},
      method: method ? method: 'GET',
      success: function (res) {
        resolve(res);
      },
      fail: function(error){
        reject(error);
      }
    });
  });
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  ajax, formatTime, formatNumber
}
