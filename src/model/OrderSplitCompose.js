export default class OrderSplitCompose {
  constructor(props) {
    // 组合和抢购商品填写营销活动的id
    // ?:number
    this.activityId = props.activityId;
    // 活动名称
    // :string
    this.activityName = props.activityName;
    // 活动类型(1单品2组合3抢购4套餐5成套)
    this.activityType = props.activityType;
    // 组合是否可用(0否 1是）
    this.composeEnable = props.composeEnable;
    // 组合是否失效原因
    this.composeEnableMsg = props.composeEnableMsg;
    // 购买的数量(组合就是组合的数量)
    this.number = props.number;
    // 购物车里的组合id
    this.composeId = props.composeId;
    // 拆单之后的分组订单号
    this.composeOrderNo = props.composeOrderNo;
    // 是否支持包销
    //     0：不支持
    //     1：支持
    this.crowdFundingFlag = props.crowdFundingFlag;
    // 反向定制 - 意向金占比
    // this.intentionMoney = props.intentionMoney;
    this.productList = props.productList;
    // 产品比例
    this.productRatio = props.productRatio;
    this.splitOrderDetailList = props.splitOrderDetailList;
    this.splitProductDtoList = props.splitProductDtoList;
    // 每组的合计金额
    this.totalMoney = props.totalMoney;
    // 反向定制 - 每组的预定金合计金额
    this.totalPreAmount = props.totalPreAmount;
    // 成套样机大版本号, 成套样机时传
    this.yjBigVersion = props.yjBigVersion;
    // 云仓code
    this.yunCangCode = props.yunCangCode;
    // 云仓类型(yc:  云仓, ydyc:异地云仓)
    this.yunCangType = props.yunCangType;
  }
}
