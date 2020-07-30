import urls from '../url/transferprice.url';
import {
    jPostJson,
} from '@/lib/request';
export default {
    transferPriceList(data){
         /* 消息列表 */
        return jPostJson(urls.transferPriceList,data)
    }
}