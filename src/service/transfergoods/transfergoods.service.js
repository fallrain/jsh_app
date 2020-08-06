import urls from '../url/transfergoods.url';
import {
    jGet,
} from '@/lib/request';
export default {
    transferList(data) {
        /* 消息列表 */
        return jGet(urls.transferList, data, { noLoading: true })
    },
    cargoWareHome(data) {
        /* 调货库位 */
        return jGet(urls.cargoWareHome, data)
    },
    cargoSendWay(data) {
        /* 调货配送类型 */
        return jGet(urls.cargoSendWay, data)
    }
}