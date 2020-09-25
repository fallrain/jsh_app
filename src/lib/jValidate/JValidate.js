import jValidateRules from './JValidateRules';

export default class {
  constructor(option) {
    this.option = option;
    this.jValidateRules = jValidateRules;
  }

  valid() {
    const vdtMap = this.option.rules;
    for (const p in vdtMap) {
      const regs = vdtMap[p];
      for (const i in regs) {
        if (regs[i] !== 0 && !regs[i]) {
          continue;
        }
        if (!this.jValidateRules.rules[i](this.option.formData[p], regs[i])) {
          uni.showToast({
            title: this.option.messages[p][i] || this.jValidateRules.messages[i],
          });
          return false;
        }
      }
    }
    return true;
  }

  validOne(name) {
    const regs = this.option.rules[name];
    for (const i in regs) {
      if (!this.jValidateRules.rules[i](this.option.formData[name], regs[i])) {
        uni.showToast({
          title: this.option.messages[name][i] || this.jValidateRules.messages[i],
        });
        return false;
      }
    }
    return true;
  }
}
