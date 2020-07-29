import configJs from '@/config';

let curConfig;
const {
  VUE_APP_PLATFORM,
  VUE_APP_MODE
} = process.env;
if (VUE_APP_PLATFORM === 'h5') {
  curConfig = configJs.h5[VUE_APP_MODE];
} else {
  curConfig = configJs['mp-alipay'][VUE_APP_MODE];
}
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

function showError(msg, status) {
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

function jSend(option) {
  const selfOptions = JSON.parse(JSON.stringify(option));
  const cfg = selfOptions.cfg || {};
  delete selfOptions.cfg;
  const token = uni.getStorageSync('token') || '';
  const header = {
    Authorization: `Bearer ${token}`,
    ...cfg.headers
  };
  // url前缀
  selfOptions.url = `${curConfig.baseUrl}/new/api/${selfOptions.url}`;
  return new Promise((resolve) => {
    if (!cfg.noLoading) {
      uni.showLoading({
        mask: true
      });
    }
    const requestOptions = {
      ...selfOptions,
      header,
      success(response) {
        const {
          data,
          statusCode
        } = response;
        if (!cfg.noLoading) {
          uni.hideLoading();
        }
        resolve(data);
        if (cfg.noToast) {
          return;
        }
        if (data.code !== '1') {
          showError(data.msg, statusCode);
        }
      },
      fail() {
        if (!cfg.noLoading) {
          uni.hideLoading();
        }
        showError('请求失败');
        return resolve({
          code: '-1'
        });
      }
    };
    uni.request(requestOptions);
  });
}

function jPost(...args) {
  return jSend({
    url: args[0],
    data: args[1],
    method: 'POST',
    cfg: {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      ...args[2]
    }
  });
}

function jPostJson(...args) {
  return jSend({
    url: args[0],
    data: args[1],
    method: 'post',
    cfg: args[2]
  });
}

function jGet(...args) {
  return jSend({
    url: args[0],
    data: args[1],
    method: 'get',
    cfg: {
      ...args[2]
    }
  });
}

function jGetImage(...args) {
  return jSend({
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
export {
  jSend,
  jGet,
  jPost,
  jPostJson,
  jGetImage
};
module.exports = {
  jSend,
  jGet,
  jPost,
  jPostJson,
  jGetImage
};
