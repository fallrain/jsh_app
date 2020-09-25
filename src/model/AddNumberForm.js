export default class AddNumberForm {
  constructor(props) {
    // (组合ID):string
    this.composeId = props.composeId;
    // (要更新的数量):number
    this.number = props.number;
    // 更新的商品id
    this.productId = props.productId;
    // 售达方id
    this.saletoCode = props.saletoCode;
    // 送达方id
    this.sendtoCode = props.sendtoCode;
  }
}
