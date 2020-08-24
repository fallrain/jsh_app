import urls from '../url/activity.url';
import {
  jGet
} from '@/lib/request';

export default {
  xinPin(data) {
    /* 新品推荐 */
    return jGet(urls.xinpin, data);
  },
  baoKuan(data) {
    /* 爆款推荐 */
    return jGet(urls.baokuan, data);
  },
  ziYuanJi(data) {
    /* 聚划算 */
    return jGet(urls.ziyuanji, data);
  },
  zhuanGong(data) {
      /* 我的专供 */
    return jGet(urls.zhuangong, data);
  }
};
