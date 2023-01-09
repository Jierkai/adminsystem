<template>
  <el-row>
    <el-col :span="24" class="breadcrumb-col">
      <transition-group name="el-fade-in-linear">
        <el-tag
          v-for="tag in tags"
          :key="tag.name"
          :effect="isActive(tag.name)"
          :hit="true"
          :type="tag.type"
          class="breadcrumb-item"
          closable
          size="medium"
          @click="routePush(tag)"
          @close="removeTag(tag)"
        >
          {{ tag.name }}
        </el-tag>
      </transition-group>
    </el-col>
  </el-row>

</template>

<script>
export default {
  name: 'Breadcrumb',
  data() {
    return {
      tags: []
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(newVal) {
        const isHave = this.tags.findIndex(i => i.path === newVal.path)
        if (isHave !== -1) return
        this.tags.push({
          name: newVal.meta.title,
          path: newVal.path
        })
      }
    }
  },
  methods: {
    routePush(tag) {
      this.$router.push(tag.path)
    },
    removeTag(tag) {
      const index = this.tags.findIndex(i => i.path === tag.path)
      this.tags.splice(index, 1)
      if (tag.path === this.$route.path && this.tags.length) {
        const lastItem = this.tags[this.tags.length - 1]
        this.$router.push(lastItem.path)
      } else if (!this.tags.length) {
        this.$router.push('/')
      }
    },
    isActive(name) {
      return this.$route.meta.title === name ? 'dark' : 'plain'
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb-col {
  padding: 5px 8px;
}

.breadcrumb-item {
  margin-left: 3px;
  border-radius: 0;
  cursor: pointer;

  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
}
</style>
