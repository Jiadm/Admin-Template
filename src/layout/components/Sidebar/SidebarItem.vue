<template>
  <div v-if="!item.hidden">
    <!-- 当没有children时, 匹配sso返回的permissions结构 -->
    <template v-if="hasNoChildren(item.children, item) && !item.isViewFunc && item.parentId>=0">
      <app-link
        v-if="item.title && !item.isViewFunc"
        :to="resolvePath(item.path)"
      >
        <el-menu-item
          :index="resolvePath(item.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            :icon="item.icon "
            :title="$t(`menu.` + item.title)"
          />
        </el-menu-item>
      </app-link>
    </template>

<!-- 当只有一个children时 -->
    <template
      v-else-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <!-- <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)"> -->
      <app-link
        v-if="onlyOneChild.title && !onlyOneChild.isViewFunc"
        :to="resolvePath(onlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <!-- <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" /> -->
          <!-- <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="$t(`menu.`+onlyOneChild.meta.title)" /> -->
          <item
            :icon="onlyOneChild.icon || item.icon"
            :title="$t(`menu.` + onlyOneChild.title)"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <!-- <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="$t(`menu.`+item.meta.title)" /> -->
        <item
          v-if="item.title"
          :icon="item.icon"
          :title="$t(`menu.` + item.title)"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.id"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import { isExternal, guid } from "@/utils/validate";
import Item from "./Item";
import AppLink from "./Link";
import FixiOSBug from "./FixiOSBug";

export default {
  name: "SidebarItem",
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    hasNoChildren(children = [], parent) {
      if (!children || children.length == 0) return true;
      return false;
    },
    hasOneShowingChild(children = [], parent) {
      if (!children) return false;

      const showingChildren = children.filter((item) => {
        if (item.hidden || item.isViewFunc) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }

      // console.log(path.resolve(this.basePath, routePath));
      //when path is null, set radom uuid to path/ to key to avoid to expand multiple at the same time
      if (path.resolve(this.basePath, routePath) == "/") return "/" + guid();

      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>
