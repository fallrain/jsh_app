export default class OrderSplitCompose {
  constructor(props) {
    // ?:string 是否有信用模式(0没有1有)
    this.creditModel = props.creditModel;
    // ?:string 是否有远周次(0没有1有)
    this.farWeek = props.farWeek;
    // ?:string 远周次时间
    this.farWeekDate = props.farWeekDate;
    // ?:string 是否选中信用模式(0没有1有)
    this.isCheckCreditModel = props.isCheckCreditModel;
    // ?:string 是否选中远周次(0没有1有)
    this.isCheckFarWeek = props.isCheckFarWeek;
    // ?:string 是否选中款先模式(0没有1有)
    this.isCheckKuanXian = props.isCheckKuanXian;
    // ?:string 是否开库存单 0 不开 其他 开
    this.isStock = props.isStock;
    // ?:string 是否版本调货(0:否1:是)
    this.isTransferVersion = props.isTransferVersion;
    // ?:string 传统渠道是否有款先(0没有1有)
    this.kuanXian = props.kuanXian;
    // :number 产品购买的数量
    this.number = props.number;
    // ?:string 价格类型(PT:普通价格,TJ:特价,GC:工程,YJCY:样机出样(折扣样机),MFJK:免费机壳,MFYJ:免费样机,MFYJJS:免费样机结算,YPJ:样品机,CTYJ:成套样机)
    this.priceType = props.priceType;
    // ?:string 价格版本号
    this.priceVersion = props.priceVersion;
    // ?:string 产品编码
    this.productCode = props.productCode;
    // ?:string 产品系列
    this.productSeries = props.productSeries;
    // ?:string 版本调货的版本号
    this.transferVersion = props.transferVersion;
    // ?:string 易理货编码
    this.ylhCode = props.ylhCode;
  }
}
