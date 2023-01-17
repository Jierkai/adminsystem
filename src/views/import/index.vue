<template>
  <Excel :before-upload="beforeUpload" :on-success="handleSuccess" />
</template>

<script>
import Excel from '@/components/Excel/index.vue'
import { batchAdd } from '@/api/employee'

/**
 * @param size { Number }  最大尺寸
 * @param
 */
export default {
  name: 'Import',
  components: { Excel },
  data() {
    return {
      size: 1
    }
  },
  methods: {
    async handleSuccess({ header, results }) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const params = results.map(i => {
        return Object.keys(i).reduce((obj, item) => {
          const key = userRelations[item]
          if (['timeOfEntry', 'correctionTime'].includes(key)) {
            obj[key] = this.formatExcelDate(i[item], '-')
          } else {
            obj[key] = i[item]
          }
          return obj
        }, {})
      })
      await batchAdd(params)
      this.$router.back()
    },
    beforeUpload(file) {
      const fileSize = file.size
      const maxSize = 1024 * 1024 * 1
      if (fileSize > maxSize) {
        this.$message.error('上传文件大于1Mb')
        return false
      } else {
        return true
      }
    },
    formatExcelDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1) // 毫秒
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + (month < 10 ? '0' + month : month) + format + (date < 10 ? '0' + date : date)
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style scoped>

</style>
