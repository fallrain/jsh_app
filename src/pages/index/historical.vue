<template>
  <view>
    <view class="transfer-search">
      1111
      <j-search-input
          v-model="filterForm.name"
          @search="silentReSearch"
      ></j-search-input>
      <button
          type="button"
          class="transfer-btn"
          @tap="silentReSearch"
      >搜索
      </button>
    </view>
  </view>
</template>
<script>
import JSearchInput from '../../components/form/JSearchInput';

export default {
  name: 'historical',
  componts: {
    JSearchInput
  },
  data() {
    return {
      name: '',
    };
  },
  methods: {
    silentReSearch() {
      /* 静默搜索 */
      this.mescroll.resetUpScroll(true);
    },
  }


};
</script>

<style scoped>

</style>
