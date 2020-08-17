export default class OrderInfoModelForm {
  constructor(props) {
    // 带字母订单号
    this.bstnk = props.bstnk;
    // 是否信用模式
    this.credit_model_all = props.credit_model_all;
    // 是否远周次
    this.far_weekly_all = props.far_weekly_all;
    // 产业字段判断
    this.industry = props.industry;
    // 是否版本调货
    this.is_transfer_version_all = props.is_transfer_version_all;
    // 创建时间 结束
    this.jshi_created_end_time = props.jshi_created_end_time;
    // 创建时间 开始
    this.jshi_created_start_time = props.jshi_created_start_time;
    // 配送方式(1:自提2配送6直发)
    this.jshi_delivery_type = props.jshi_delivery_type;
    // 组合号
    this.jshi_grouping_no = props.jshi_grouping_no;
    // GVS订单类型(需要把类型转换成gvs的)
    this.jshi_gvs_order_type = props.jshi_gvs_order_type;
    // CT：传统 B2B，ZY：自有 365
    this.jshi_order_channel = props.jshi_order_channel;
    // 订单流水号
    this.jshi_order_flow_no = props.jshi_order_flow_no;
    // 订单号
    this.jshi_order_no = props.jshi_order_no;
    // 订单来源(1:巨商汇,2:整车)
    this.jshi_order_source = props.jshi_order_source;
    // 支付时间 结束
    this.jshi_pay_end_time = props.jshi_pay_end_time;
    // 支付时间 开始
    this.jshi_pay_start_time = props.jshi_pay_start_time;
    // 付款方编码
    this.jshi_payto_code = props.jshi_payto_code;
    // 售达方编码
    this.jshi_saleto_code = props.jshi_saleto_code;
    // 送达方编码
    this.jshi_sendto_code = props.jshi_sendto_code;
    // 云仓类型(YC:云仓,YDYC:异地云仓,TCTP:统仓统配)
    this.jshi_yuncang_type = props.jshi_yuncang_type;
    // 操作 defaultExport 默认导出
    this.operate = props.operate;
    // 自用订单区分状态
    this.orderStatusSelf = props.orderStatusSelf;
    // 价格类型判断入参自用
    this.priceTypeJudgment = props.priceTypeJudgment;
    // 价格类型（所有
    this.price_type_all = props.price_type_all;
    // 品牌（所有
    this.product_brand_all = props.product_brand_all;
    // 产品编号（所有
    this.product_code_all = props.product_code_all;
    // 产品组（所有
    this.product_group_all = props.product_group_all;
    // 型号（所有
    this.product_model_all = props.product_model_all;
    // 产品名称（所有
    this.product_name_all = props.product_name_all;
    // 产品类型
    this.product_type_all = props.product_type_all;
    // 二次发货
    this.sap_dn5 = props.sap_dn5;
    // 评审状态
    this.sap_judge_status = props.sap_judge_status;
    // 系统发票时间 结束
    this.sap_sys_invoice_end_time = props.sap_sys_invoice_end_time;
    // 系统发票时间 开始
    this.sap_sys_invoice_start_time = props.sap_sys_invoice_start_time;
    // 金税发票时间 结束
    this.sap_tax_invoice_end_time = props.sap_tax_invoice_end_time;
    // 金税发票时间 开始
    this.sap_tax_invoice_start_time = props.sap_tax_invoice_start_time;
    // 版本调货号
    this.transfer_version_all = props.transfer_version_all;
    // 购买方式自用 作为查询条件
    this.waysOfPurchasing = props.waysOfPurchasing;
    // 免费样机待结算
    this.yjPay = props.yjPay;
  }
}
