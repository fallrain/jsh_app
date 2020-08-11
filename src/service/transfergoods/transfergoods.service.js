import urls from '../url/transfergoods.url';
import {
    jGet,
    jPostJson
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
    },
    shoppingCartNum(data) {
        /* 购物车商品数量 */
        return jGet(urls.shoppingCartNum, data)
    },
    allOrderList(data) {
         /* 购物车订单详情 */
         return jGet(urls.allOrderList, data)
    },
    updateOrderQty(data) {
        /* 商品修改列表 */
        return jGet(urls.updateOrderQty, data)
    },
    
    deleteOrderForm(data) {
        /* 商品删除列表 */
        return jGet(urls.deleteOrderForm, data)
    },
    insertOrder(data) {
        /* 加入调货 */
        return jPostJson(urls.insertOrder, data)
    },
    upDHPayMoney(data) {
        /* 切换付款方 */
        return jGet(urls.upDHPayMoney, data)
    }

}