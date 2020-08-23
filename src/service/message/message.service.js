import urls from '../url/message.url';
import {
  jPostJson,
  jGet
} from '@/lib/request';

export default {
  messageList(data) {
    /* 消息列表 */
    return jPostJson(urls.messageList, data);
  },
  indexList(data) {
    return jGet(urls.indexList, data);
  }

};
