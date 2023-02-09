<template>
  <div class="upload-box">
    <el-upload
      :before-upload="beforeUpload"
      :class="{disabled :fileNum}"
      :file-list="fileList"
      :http-request="upload"
      :limit="limitNum"
      :on-change="handleChange"
      :on-preview="preview"
      :on-remove="handleImage"
      action="#"
      list-type="picture-card"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="showDialog" title="图片预览" top="8vh" width="600px">
      <img v-imageError="defaultImg" :src="imgUrl" alt="" width="100%">
    </el-dialog>
    <div v-if="showProgress">
      <div>上传进度：
        <el-progress :percentage="progress" style="width: 180px;" />
      </div>
    </div>
  </div>
</template>

<script>
import defaultImg from '@/assets/common/head.jpg'
import upload from '@/utils/upload'

export default {
  name: 'ImageUpload',
  props: {
    limitNum: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      defaultImg,
      fileList: [],
      showProgress: false,
      showDialog: false, // 控制显示弹层
      imgUrl: '',
      progress: 0
    }
  },
  computed: {
    fileNum() {
      return this.fileList.length >= this.limitNum
    },
    isSuccess() {
      return this.fileList.every(i => i.status === 'success')
    }
  },
  methods: {
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleImage(file) {
      this.fileList = this.fileList.filter(i => i.uid !== file.uid)
    },
    progressFn(p) {
      const progress = p.loaded / p.total
      this.progress = progress * 100
    },
    upload(params) {
      this.showProgress = true
      upload(params, this.progressFn).then(data => {
        const file = this.fileList.find(i => i.uid === params.file.uid)
        file.status = 'success'
        file.url = `https://${data.Location}`
        setTimeout(() => {
          this.showProgress = false
          this.progress = 0
        }, 500)
      })
    },
    handleChange(file, fileList) {
      this.fileList = [...fileList]
    },
    beforeUpload(file) {
      const fileType = ['image/jpeg', 'image/gif', 'image/png', 'image/bmp']
      if (!fileType.includes(file.type)) {
        this.$message.error('图片必须是jepg,gif,png,bmp格式')
        return false
      }
      if (file.size > 1024 * 1024 >= 5) {
        this.$message.error('文件过大，不可超过5MB')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled {
  ::v-deep {
    .el-upload--picture-card {
      display: none;
    }
  }
}

</style>
