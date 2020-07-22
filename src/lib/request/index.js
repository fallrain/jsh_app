// const config = require('../../config/config.env.js');
// 是否已经提示错误，同时间只显示一个
let isShowModal = false;
function showModal(params, showCancel = false, confirmText = '关闭', cb) {
  if (isShowModal) {
    return;
  }
  isShowModal = true;
  uni.showModal({
    title: '',
    content: params,
    showCancel,
    confirmText,
    confirmColor: '#2f86f6',
    success(res) {
      isShowModal = false;
      if (res.confirm) {
        if (cb && typeof cb === 'function') {
          cb();
        }
      } else if (res.cancel) {
      }
    },
    fail() {
      isShowModal = false;
    }
  });
}

function showToast(msg, status) {
  /* 统一提示错误 */
  let message;
  if (msg) {
    message = msg;
  } else {
    const errorMap = {
      401: '没有权限',
      403: '没有权限',
      404: '资源不存在'
    };
    message = errorMap[status] || '请求失败';
  }
  showModal(message);
}
function hSend(option) {
  const cfg = option.cfg || {};
  const header = {};

  return new Promise((resolve) => {
    uni.showLoading({
      mask: true
    });
    uni.request({
      ...option,
      header,
      success({ data }) {
        uni.hideLoading();
        resolve(data);
        if (!option.cfg.noToast) {
          let status;
          if (data.status !== undefined) {
            status = data.status;
          }
          showToast(data.msg, status);
        }

        showModal(data.msg);
      },
      fail() {
        uni.hideLoading();
        showModal('请求失败');
        return resolve(false);
      }
    });
  });
}

function hPost(...args) {
  return hSend({
    url: args[0],
    data: args[1],
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    cfg: args[2]
  });
}

function hPostJson(...args) {
  return hSend({
    url: args[0],
    data: args[1],
    method: 'post',
    cfg: args[2]
  });
}

function hGet(...args) {
  return hSend({
    url: args[0],
    data: args[1],
    method: 'get',
    cfg: {
      ...args[2]
    }
  });
}
function hGetImage(...args) {
  return hSend({
    url: args[0],
    data: args[1],
    method: 'get',
    responseType: 'arraybuffer',
    cfg: {
      irregular: true,
      ...args[2]
    }
  });
}

module.exports = {
  hSend,
  hGet,
  hPost,
  hPostJson,
  hGetImage
};
