import url from '../url/product.url';
import {
  jPostJson,
  jGet
} from '@/lib/request';

export default {
  getDictionaryByWhere(dictionaryType) {
    console.log(url.getDictionaryByWhere)
    return jPostJson(url.getDictionaryByWhere, dictionaryType);
  },
};
