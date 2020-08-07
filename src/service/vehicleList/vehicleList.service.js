import {
  jGet
} from '@/lib/request';
import url from '../url/traffic.url';

export default {
  carLoadType(timestamp, JDCODE, SendWay, MKTID, longfeiMFID) { // 整车列表-车型
    return jGet(url.carLoadType(timestamp, JDCODE, SendWay, MKTID, longfeiMFID));
  },
  querySendWay(timestamp, YDPS_JIDI, longfeiUSERID, sendtoMktid, sendtoCode) { // 整车列表-配送类型
    return jGet(url.querySendWay(timestamp, YDPS_JIDI, longfeiUSERID, sendtoMktid, sendtoCode));
  }
};
