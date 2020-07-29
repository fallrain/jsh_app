export default {
  formatFloat(f, digit) {
    const m = Math.pow(10, digit);
    return Math.round(f * m, 10) / m;
  },
  arithmetic(val1, val2, arithmetic = 1, floatNum = 2) {
    /* 避免损失精度 */
    if ((!val1 && val1 !== 0) || (!val2 && val2 !== 0)) {
      return '';
    }
    val1 += '';
    val2 += '';
    const val1Split = val1.split('.');
    const val2Split = val2.split('.');
    const val1Len = val1Split[1] ? val1Split[1].length : 0;
    const val2Len = val2Split[1] ? val2Split[1].length : 0;
    const multiple = Math.pow(10, val1Len > val2Len ? val1Len : val2Len);
    val1 = val1.replace('.', '') * (val1Len ? 1 : multiple);
    val2 = val2.replace('.', '') * (val2Len ? 1 : multiple);
    let returnValue;
    switch (arithmetic) {
      case 1:
        returnValue = (val1 + val2) / multiple;
        break;
      case 2:
        returnValue = (val1 - val2) / multiple;
        break;
      case 3:
        returnValue = (val1 * val2) / multiple / multiple;
        break;
      case 4:
        returnValue = val1 / val2;
        break;
    }
    return this.formatFloat(returnValue, floatNum);
  }
};
