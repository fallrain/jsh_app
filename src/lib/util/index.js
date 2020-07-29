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
};

export default util;
