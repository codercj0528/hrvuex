<template>
  <div>
    <el-upload
      list-type="picture-card"
      action="#"
      :http-request="upload"
      :on-preview="preview"
      :file-list="fileList"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :class="{ disabled: fileComputed}"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showProgress" :percentage="percent" style="width:180px;" />
    <el-dialog title="图片" :visible.sync="showDialog">
      <img :src="imgUrl" style="width:100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDtZy6sOfO0OUJuEJ8itmPkoc9OAgvtZx4', // 身份识别 ID
  SecretKey: 'sSlmZ5PRBeqlPmre8MK1SbT9X3NPBhxv' // 身份密钥
})
export default {
  data() {
    return {
      fileList: [],
      showDialog: false,
      imgUrl: '',
      currentFileId: null,
      percent: 0,
      showProgress: false
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    changeFile(file, fileList) {
      // this.fileList = [...fileList]
      this.fileList = fileList.map(item => item)
    },
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      this.showProgress = true
      this.currentFileId = file.uid
      return true
    },
    upload(params) {
      if (params.file) {
        cos.putObject({
          Bucket: 'chj-itheima-1256908968', // 存储桶
          Region: 'ap-nanjing', // 地域
          Key: params.file.name, // 文件名
          Body: params.file, // 要上传的文件对象
          StorageClass: 'STANDARD',
          onProgress: (params) => {
            this.percent = params.percent * 100
          }
          // 上传的模式类型 直接默认 标准模式即可
          // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
        },
        (err, data) => {
          console.log(err || data)
          if (!err && data.statusCode === 200) {
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileId) {
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })
          }
          setTimeout(() => {
            this.showProgress = false
            this.percent = 0
          }, 1000)
        }
        )
      }
    }
  }
}
</script>
<style>
.disabled .el-upload--picture-card {
  display: none
}
</style>
