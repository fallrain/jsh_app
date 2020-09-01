import {
  getPriceKeyFromAllPrice
} from '@/lib/dataDictionary';

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
  formatNumber(number, digit) {
    /* 把一个数字四舍五入为一个指定精度的数字 */
    const m = Math.pow(10, digit);
    const resetNum = `${Math.round(number * m) / m}`;
    const newNum = `${resetNum}.${new Array(digit).fill(0).join('')}`;
    return newNum.replace(/([\s\S]*)(\.)([\s\S]*)(\.)([\s\S]*)/g, (match, $1, $2, $3) => {
      let $3Temp = $3;
      if ($3Temp.length < digit) {
        $3Temp += new Array(digit - $3Temp.length).fill(0).join('');
      }
      return $1 + $2 + $3Temp;
    });
  },
  formatFloat(f, digit) {
    const m = Math.pow(10, digit);
    return Math.round(f * m) / m;
  },
  arithmetic(val1, val2, arithmetic = 1, floatNum = 2) {
    /* 避免损失精度 */
    if (!val1) {
      val1 = 0;
    }
    if (!val2) {
      val2 = 0;
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
  },
  multiArithmetic(numbers, ...args) {
    /* n个数值的计算 */
    return numbers.reduce((pre, cur) => this.arithmetic(pre, cur, ...args), 0);
  },
  genQueryStringByObj(obj, isFirst = true) {
    /* 根据一个对象组合查询字符串 */
    const args = [];
    for (const p in obj) {
      obj[p] !== undefined && (args.push(`${p}=${obj[p]}`));
    }
    let returnStr = '';
    if (args.length) {
      returnStr = (isFirst ? '?' : '') + args.join('&');
    }
    return returnStr;
  },
  findDifKey(obj1, obj2) {
    /* 查找不同的属性 */
    const map = {
      obj1,
      obj2
    };
    const keys = [];
    let keyName;
    let anotherKeyName;
    if (Object.keys(obj1).length > Object.keys(obj2).length) {
      keyName = 'obj1';
      anotherKeyName = 'obj2';
    } else {
      keyName = 'obj2';
      anotherKeyName = 'obj1';
    }
    Object.keys(map[keyName]).forEach((key) => {
      if (map[keyName][key] !== map[anotherKeyName][key]) {
        keys.push({
          key,
          value1: map[keyName][key],
          value2: map[anotherKeyName][key]
        });
      }
    });
    return keys;
  },
  getPriceType(type) {
    /* 获取价格类型 */
    const typeTemp = type.toUpperCase();
    return getPriceKeyFromAllPrice()[typeTemp];
  },
};

export default util;
