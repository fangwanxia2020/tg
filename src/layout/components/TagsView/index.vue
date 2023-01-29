<template>
  <div
    id="tags-view-container"
    class="tags-view-container"
  >
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag) && !isHome(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        <template v-if="tag.title != 'no-name'">{{ tag.title }}</template>
        <template v-else>{{ user && user.tagTitleObj && user.tagTitleObj[tag.path]
        }}</template>
        <span
          v-if="!isAffix(tag) && !isHome(tag)"
          class="el-icon-error"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <!-- <li @click="refreshSelectedTag(selectedTag)">刷新</li> -->
      <li
        v-if="!isAffix(selectedTag) && !isHome(selectedTag)"
        @click="closeSelectedTag(selectedTag)"
      > 关闭该窗口 </li>
      <li @click="closeOthersTags">关闭其他窗口</li>
      <li @click="closeAllTags(selectedTag)">关闭所有窗口</li>
    </ul>
  </div>
</template>
<script>
import ScrollPane from "./ScrollPane";
import path from "path";
export default {
  components: {
    ScrollPane,
  },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
    };
  },
  computed: {
    user() {
      return this.$globalState.getGlobalState("user");
    },
    visitedViews() {
      return this.$store.state.tagsView.visitedViews;
    },
    routes() {
      return this.$store.state.permission.routes;
    },
  },
  watch: {
    $route() {
      this.addTags();
      this.moveToCurrentTag();
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      }
      else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
  },
  mounted() {
    this.initTags();
    this.addTags();
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path;
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix;
    },
    isHome(tag) {
      return tag.meta && tag.meta.home;
    },
    filterAffixTags(routes, basePath = "/") {
      let tags = [];
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: {
              ...route.meta,
            },
          });
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });
      return tags;
    },
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes));
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch("tagsView/addVisitedView", tag);
        }
      }
    },
    addTags() {
      const {
        name
      } = this.$route;
      if (name) {
        this.$store.dispatch("tagsView/addView", this.$route);
      }
      return false;
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag);
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch("tagsView/updateVisitedView", this.$route);
            }
            break;
          }
        }
      });
    },
    refreshSelectedTag(view) {
      this.$store.dispatch("tagsView/delCachedView", view).then(() => {
        const {
          fullPath
        } = view;
        this.$nextTick(() => {
          this.$router.replace({
            path: fullPath,
          });
        });
      });
    },
    closeSelectedTag(view) {
      this.$store.dispatch("tagsView/delView", view).then(({
        visitedViews
      }) => {
        // console.log("34------------", visitedViews);
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view);
        }
      });
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag);
      this.$store.dispatch("tagsView/delOthersViews", this.selectedTag).then(() => {
        this.moveToCurrentTag();
      });
    },
    closeAllTags(view) {
      this.$store.dispatch("tagsView/delAllViews").then(({
        visitedViews
      }) => {
        if (this.affixTags.some((tag) => tag.path === view.path)) {
          return;
        }
        this.toLastView(visitedViews, view);
      });
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView.fullPath);
      }
      else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === "Dashboard") {
          // to reload home page
          this.$router.replace({
            path: "/redirect" + view.fullPath,
          });
        }
        else {
          this.$router.push("/home");
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft + 15; // 15: margin right
      if (left > maxLeft) {
        this.left = maxLeft;
      }
      else {
        this.left = left;
      }
      this.top = e.clientY - 60;
      this.visible = true;
      this.selectedTag = tag;
    },
    closeMenu() {
      this.visible = false;
    },
    handleScroll() {
      this.closeMenu();
    },
  },
};

</script>
<style
  lang="scss"
  scoped
>
.tags-view-container {
  user-select: none;
  height: 44px;
  width: 100%;
  background: #fff;
  /* border-bottom: 1px solid rgba(228, 228, 228, 1); */
  /* 2021-07-22 */
  border-bottom: 1px solid #d8d8d8;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  z-index: 9;

  /* end */
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 44px;
      line-height: 44px;
      /* border: 1px solid #e4e4e4; */
      /* 2021-07-21 */
      border-left: 1px solid #e4e4e4;
      border-right: 1px solid #e4e4e4;
      /* end */
      margin-left: -1px;
      color: #757575;
      background: #fff;
      padding: 0 30px;
      font-size: 14px;

      .el-icon-error {
        color: #ccc;
      }
      
      &.active {
        /* background: rgba(53, 110, 223, 0.05); */
        color: $primaryColor-ie !important;
        color: $primaryColor !important;
        /* 2021-07-22 */
        border-left: solid 1px #8bb2ff;
        border-right: solid 1px #8bb2ff;
        background: #e8f0ff;
        z-index: 8;
        /* box-shadow: 0 0 10px rgba(0, 0, 0, .1); */
        /* end */
      }
    }
  }
  
  /* 2021-07-22 */
  ::v-deep {
    .el-scrollbar__view {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 2px;
    }
  }
  
  /* end */
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}

</style>
<style lang="scss">
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}

</style>
