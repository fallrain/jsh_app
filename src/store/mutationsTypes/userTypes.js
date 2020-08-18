const prefix = 'user';
export default {
  // 获取用户信息
  GET_USER: `${prefix}.getUser`,
  // 更新用户信息
  UPDATE_USER: `${prefix}.updateUser`,
  // 获取售达方信息
  GET_SALE: `${prefix}.getSale`,
  // 更新售达方信息
  UPDATE_SALE: `${prefix}.updateSale`,
  // 异步更新售达方信息
  UPDATE_SALE_ASYNC: `${prefix}.UpdateSaleAsync`,
  // token用户信息
  GET_TOKEN_USER: `${prefix}.getTokenUser`,
  // 更新token用户信息
  UPDATE_TOKEN_USER: `${prefix}.UpdateTokenUser`,
  // 异步更新token用户信息
  UPDATE_TOKEN_USER_ASYNC: `${prefix}.UpdateTokenUserAsync`,
};
