import urls from '../url/message.url';
import {
    jPostJson,
} from '@/lib/request'
export default {
    messageList(data){
         /* 消息列表 */
        return jPostJson(urls.messageList,data)
    }
}