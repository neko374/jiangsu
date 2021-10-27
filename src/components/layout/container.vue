<template>
  <div class="container">
    <current-head></current-head>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="elFooter">
      <p>
        <span style="margin-right:50px">版本所有：江苏教育集团宣传部</span>
      </p>
    </div>
  </div>
</template>

<script>
import currentHead from './header.vue'

export default {
  name: 'currcontainer',
  data() {
    return {
      data: []
    }
  },
  components: {
    'current-head': currentHead
  },
  methods: {},
  mounted() {}
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.content {
  width: 100%;
  height: calc(100% - 116px);

  background: #f2f2f2;
}
</style>
