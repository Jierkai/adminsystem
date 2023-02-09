<template>
  <el-row>
    <el-col :span="24" class="breadcrumb-col">
      <transition-group name="el-fade-in-linear">
        <el-tag
          v-for="tag in tags"
          :key="tag.name"
          :class="{isActive}"
          :effect="isActive(tag.name)?'dark' : 'plain'"
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
        const isHave = this.tags.findIndex(i => i.name === newVal.meta.title)
        if (isHave !== -1 || !newVal.meta?.title) return
        this.tags.push({
          name: newVal.meta.title,
          routeName: newVal.name,
          path: newVal.path
        })
        this.$store.commit('app/getRouteName', this.tags)
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
      return this.$route.meta.title === name
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb-col {
  padding: 5px 8px;
  background: white;
  box-shadow: 0 2px 3px 0 #ccc;
}

.el-tag {
  padding: 0 10px 0 15px;
}

.breadcrumb-item {
  position: relative;
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

.isActive::before {
  content: '';
  display: block;
  position: absolute;
  background: white;
  width: 10px;
  height: 10px;
  left: 3px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 100%;
}
</style>
