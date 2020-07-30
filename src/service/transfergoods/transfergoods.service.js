import urls from '../url/transfergoods.url';
import {
    jGet,
} from '@/lib/request';
export default {
    transferList(data){
         /* 消息列表 */
        return jGet(urls.transferList,data)
    }
}