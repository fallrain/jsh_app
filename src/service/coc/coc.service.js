import urls from '../url/coc.url';
import {
  jPostJson
} from '@/lib/request';

export default {
  getValueSync(data) {
    /* 区域代码？ */
    const {
      parentValueLow,
      // type:Array
      value,
      valueSetId
    } = data;
    return jPostJson(urls.getValueSync, {
      parentValueLow,
      value,
      valueSetId
    });
  },
  getValueSyncValue(data) {
    /* 区域代码？ */
    const {
      valueSetId
    } = data;
    return jPostJson(urls.getValueSync, {
      valueSetId
    });
  },
};
