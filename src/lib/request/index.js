import Vue from 'vue';
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
Vue.prototype.$jConfig = curConfig;
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

function showError(msg, status, url, params) {
  /* 统一提示错误 */
  let message;
  if (msg) {
    message = msg;
  } else {
    const errorMap = {
      401: '没有权限',
      403: '登录已过期',
      404: '资源不存在'
    };
    message = errorMap[status] || '请求失败';
  }
  const str = JSON.stringify(params);
  if (VUE_APP_MODE === 'prod') {
    showModal(message);
  } else {
    showModal(message + url + str);
  }
}

const loadingAy = [];

function hideLoading() {
  // 关闭遮罩
  if (loadingAy.length === 1) {
    uni.hideLoading();
  }
  loadingAy.length--;
}

function showLoading() {
  /* 打开遮罩 */
  uni.showLoading({
    mask: true
  });
  return new Date().getTime();
}
function toLogin() {
  try {
    AlipayJSBridge && AlipayJSBridge.call('popWindow');
  } catch (e) {
    // eslint-disable-next-line no-empty
  }

  try {
    my && my.call('popWindow');
  } catch (e) {
    // eslint-disable-next-line no-empty
  }
}
function jSend(option) {
  const selfOptions = JSON.parse(JSON.stringify(option));
  const cfg = selfOptions.cfg || {};
  delete selfOptions.cfg;
  let token;
  // url前缀
  if (cfg.cJsh) {
    // c.jsh.com的接口前缀
    selfOptions.url = `${curConfig.cBaseUrl}/${selfOptions.url}`;
    token = uni.getStorageSync('jwtToken') || '';
  } else {
    selfOptions.url = `${curConfig.baseUrl}/new/api/${selfOptions.url}`;
    token = uni.getStorageSync('token') || '';
  }
  // 自定义方法
  if (cfg.method) {
    selfOptions.method = cfg.methodl;
  }
  const header = {
    Authorization: `Bearer ${token}`,
    ...cfg.headers
  };
  return new Promise((resolve) => {
    if (!cfg.noLoading) {
      loadingAy.push(showLoading());
    }
    const requestOptions = {
      ...selfOptions,
      header,
      success(response) {
        const {
          data,
          statusCode
        } = response;
        if (data && data.code === '070') {
          uni.showModal({
            title: '提示',
            content: data.msg,
            showCancel: false,
            success: (res) => {
              if (res.confirm) {
                toLogin();
              }
            }
          });
          if (!cfg.noLoading) {
            hideLoading();
          }
          return resolve(false);
        }
        if (data === 'SECURITY_INVALID_TOKEN') {
          uni.showModal({
            title: '提示',
            content: '登录已经过期，请重新登录',
            showCancel: false,
            success: (res) => {
              if (res.confirm) {
                toLogin();
              }
            }
          });
          if (!cfg.noLoading) {
            hideLoading();
          }
          return resolve(false);
        }
        if (!cfg.noLoading) {
          hideLoading();
        }
        resolve(data);
        if (cfg.noToast) {
          return;
        }
        if (data.code !== '1' && data.code !== '200') {
          showError(data.msg, statusCode, selfOptions.url, header);
        }
      },
      fail(e) {
        if (!cfg.noLoading) {
          hideLoading();
        }
        let msg = '请求失败';
        if (e && e.errMsg && e.errMsg === 'request:fail timeout') {
          msg = '请求超时';
        }
        showError(msg, '', selfOptions.url, header);
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
