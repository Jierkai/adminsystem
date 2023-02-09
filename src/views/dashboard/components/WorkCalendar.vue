<template>
  <div>
    <!-- 工作日历, 年和月 -->
    <div class="select-box">
      <el-select v-model="currentYear" size="small" style="width: 120px; margin-right: 10px">
        <!-- 年份取给定年份的, 前五年 + 后五年 -->
        <el-option v-for="item in getYearList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="currentMonth" size="small" style="width: 120px;">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
  </div>
</template>

<script>

export default {
  name: 'WorkCalendar',
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      currentYear: null, // 当前年份
      currentMonth: null, // 当前月份
      yearList: new Array(11) // 要遍历的年的数组

    }
  },
  computed: {
    getYearList() {
      return Array.from(this.yearList).map((i, index) => new Date().getFullYear() - 5 + index)
    },
    selectDate() {
      return `${this.currentYear}-${this.currentMonth}`
    }
  },
  watch: {
    selectDate(newVal) {
      this.$emit('update:startDate', new Date(newVal))
    }
  },
  created() {
    this.currentMonth = this.startDate.getMonth() + 1
    this.currentYear = this.startDate.getFullYear()
  }
}
</script>

<style scoped>

</style>
