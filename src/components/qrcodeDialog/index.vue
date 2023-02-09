<template>
  <el-dialog :visible="showCodeDialog" title="二维码" width="300px" @close="closeDialog">
    <el-row justify="center" type="flex">
      <canvas ref="CodeCanvas" />
    </el-row>
  </el-dialog>
</template>

<script>
import QRCode from 'qrcode'

export default {
  name: 'QrcodeDialog',
  props: {
    showCodeDialog: {
      type: Boolean,
      required: true
    },
    UrlData: {
      type: String,
      required: true
    }
  },
  watch: {
    UrlData: {
      handler(newVal) {
        if (!newVal) return
        this.drawCode(newVal)
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:showCodeDialog', false)
    },
    drawCode(url = '') {
      this.$nextTick(() => {
        console.log(this.$refs.CodeCanvas)
        QRCode.toCanvas(this.$refs.CodeCanvas, url, { width: 200, margin: 0 }, (error) => {
          if (error) console.error(error)
          console.log('success!')
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
