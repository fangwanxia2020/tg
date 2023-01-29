<template>
  <div id="app">

    <router-view />

  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      isLoading: true,
      loading: null
    }
  },
  computed: {},
  watch: {
    isLoading(val) {
      if (val) {
        this.showLoading();
      }
      else {
        this.$nextTick(() => {
          // this.loading&&this.loading.close();
        })
      }
    }
  },
  components: {},
  methods: {
    showLoading() {
      // this.loading = this.$loading({
      //   lock: true,
      //   text: '加载中',
      //   spinner: 'el-icon-loading',
      //   // target: document.querySelector('#subapp-viewport'),
      //   background: 'rgba(255, 255, 255, 0.7)'
      // });
    }
  },
  created() {
    this.showLoading();
  },
  mounted() {}
}

</script>
