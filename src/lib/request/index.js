const config = require('../../config/config.env.js');
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
        // 当遇到不规范的接口，没有isSuccess
        if (cfg.irregular) {
          return resolve(data);
        }
        if (
          (isSuccessKey === 'code' && data[isSuccessKey] === 1)
          || (isSuccessKey === 'isSuccess' && data[isSuccessKey])
        ) {
          return resolve(data.data);
        }
        resolve(false);
        if (cfg.version2) {
          // 1.0维持原样，2.0统一提示错误
          if (!option.cfg.noToast) {
            console.log(data);
            let status; let
              errorCode;
            if (data.status !== undefined) {
              status = data.status;
            }
            if (data.code !== undefined) {
              errorCode = data.code;
            }
            showToast(data.msg, status, errorCode);
            return;
          }
        }

        showModal(data.msg);
      },
      fail(res) {
        uni.hideLoading();
        if (cfg.version2) {
          showModal('请求失败');
        }
        resolve(false);
      }
    });
  });
}

function showToast(msg, status, errorCode) {
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
  if (errorCode == '7111' || errorCode == '7112') {
    const that = this;
    uni.showModal({
      title: '登录过期',
      content: message,
      showCancel: false,
      confirmText: '去登录',
      success(res) {
        if (res.confirm) {
          // 删除缓存token，防止自动登录进入循环
          uni.removeStorageSync('token2.0');
          uni.reLaunch({
            url: '/pages/login/login'
          });
        }
      }
    });
  } else {
    showModal(message);
  }
}

function hGet(...args) {
  return hSend({
    url: args[0],
    data: args[1],
    method: 'get',
    cfg: args[2]
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

function h2Get(...args) {
  return hSend({
    url: args[0],
    data: args[1],
    method: 'get',
    cfg: {
      version2: true,
      ...args[2]
    }
  });
}
function h2GetImage(...args) {
  return hSend({
    url: args[0],
    data: args[1],
    method: 'get',
    responseType: 'arraybuffer',
    cfg: {
      version2: true,
      irregular: true,
      ...args[2]
    }
  });
}

function h2Post(...args) {
  return hSend({
    url: args[0],
    data: args[1],
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    cfg: {
      version2: true,
      ...args[2]
    }
  });
}

function h2PostJson(...args) {
  return hSend({
    url: args[0],
    data: args[1],
    method: 'post',
    cfg: {
      version2: true,
      ...args[2]
    }
  });
}

module.exports = {
  hSend,
  hGet,
  hPost,
  hPostJson,
  h2Get,
  h2GetImage,
  h2Post,
  h2PostJson
};
