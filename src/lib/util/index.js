const util = {
  // 日期格式化
  formatDate(date, pattern) {
    if (!date) {
      return '';
    }
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const numToStr = function (num) {
      if (num < 10) {
        num = `0${num}`;
      } else {
        num = `${num}`;
      }
      return num;
    };
    const obj = {
      year: date.getFullYear(),
      month: numToStr(date.getMonth() + 1),
      date: numToStr(date.getDate()),
      hours: numToStr(date.getHours()),
      minutes: numToStr(date.getMinutes()),
      seconds: numToStr(date.getSeconds())
    };
    let res = pattern || 'yyyy-MM-dd';
    res = res.replace(/yyyy/g, obj.year);
    res = res.replace(/MM/g, obj.month);
    res = res.replace(/dd/g, obj.date);
    res = res.replace(/HH/g, obj.hours);
    res = res.replace(/mm/g, obj.minutes);
    res = res.replace(/ss/g, obj.seconds);
    return res;
  },
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

export default util;
