<template>
  <section class="app-main">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <div class="app-main-wrap">
        <div style="height:10px"> </div>
        <div class="app-main-ctn">
          <keep-alive :include="cachedViews">
            <router-view
              :key="key"
              v-show="!$route.meta.isMicrApp"
            />
          </keep-alive>
          <!-- <router-view /> -->
          <div
            id="subapp-viewport"
            v-show="$route.meta.isMicrApp"
          >
            <div
              v-if="$root.$children[0].isLoading"
              class="loadEffect"
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>
<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    },
    cachetags() {
      let list = []
      for (let item of this.tagList) {
        if (item.keepalive) {
          list.push(item.name)
        }
      }
      return list.join(',')
    }
  },
  created() {},
  mounted() {
    const KAVM = this._vnode.children[0].componentInstance;
    window.KAVM = KAVM
  },
  methods: {
    a() {
      // console.log('window.KAVM.cache',window.KAVM.cache)
      //   console.log('window.KAVM.keys',window.KAVM.keys)
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 30px);
  width: 100%;
  position: relative;
  overflow: hidden;

  .app-main-wrap {
    padding: 0 10px 0;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    flex-direction: column;

    .app-main-ctn {
      flex: 1;
      overflow: auto;
      position: relative;
    }
  }
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 +(20 让底部有一点空间)*/
    min-height: calc(100vh - 104px);
  }
}

.loadEffect {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
  transform: scale(0.3);
}

.loadEffect span {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: $primaryColor-ie;
  background: $primaryColor;
  opacity: 0.5;
  position: absolute;
  -webkit-animation: load 1.04s ease infinite;
}

@-webkit-keyframes load {
  0% {
    opacity: 1;
  }
  
  100% {
    opacity: 0.2;
  }
}

.loadEffect span:nth-child(1) {
  left: 0;
  top: 50%;
  margin-top: -8px;
  -webkit-animation-delay: 0.13s;
}

.loadEffect span:nth-child(2) {
  left: 14px;
  top: 14px;
  -webkit-animation-delay: 0.26s;
}

.loadEffect span:nth-child(3) {
  left: 50%;
  top: 0;
  margin-left: -8px;
  -webkit-animation-delay: 0.39s;
}

.loadEffect span:nth-child(4) {
  top: 14px;
  right: 14px;
  -webkit-animation-delay: 0.52s;
}

.loadEffect span:nth-child(5) {
  right: 0;
  top: 50%;
  margin-top: -8px;
  -webkit-animation-delay: 0.65s;
}

.loadEffect span:nth-child(6) {
  right: 14px;
  bottom: 14px;
  -webkit-animation-delay: 0.78s;
}

.loadEffect span:nth-child(7) {
  bottom: 0;
  left: 50%;
  margin-left: -8px;
  -webkit-animation-delay: 0.91s;
}

.loadEffect span:nth-child(8) {
  bottom: 14px;
  left: 14px;
  -webkit-animation-delay: 1.04s;
}

</style>
