<template>
  <div class="dashboard-container">
<!--    <div class="dashboard-text">welcome: {{ name }}</div>-->
    <div class="dashboard-text">欢迎您使用基于人脸识别的考勤系统管理后台</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
