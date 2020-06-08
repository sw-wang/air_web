<!--
    文件批量上传组件 By winslow, 2020-05-29
    参数：
        btnText:    按钮名称
        orc:    是否使用ORC识别
        autoSave:   是否自动保存至票据中心
    事件：
        @change
 -->
<template>
    <div class="el-upload el-upload--text">
        <el-button type="primary" size="mini">{{ btnText || '选择文件' }}</el-button>
        <input class="el-upload__input" multiple="multiple" accept="image/*,.pdf" type="file" @change="getFile($event)" />
    </div>
</template>
<style scoped>
.el-upload {
    position: relative;
    cursor: pointer;
}
.el-upload__input {
    cursor: pointer;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    bottom: 0;
    opacity: 0;
}
</style>
<script>
import { uploadFile, multipleInvoice } from '@/services/orc'
export default {
    props: {
        btnText: {
            type: String,
            defulat: '选择文件'
        },
        orc: {
            type: Boolean,
            defulat: false
        },
        autoSave: {
            type: Boolean,
            defulat: false
        }
    },
    data() {
        return {}
    },
    methods: {
        getFile(e) {
            // 解决取消选择附件框带来的BUG
            if (e.target.files.length <= 0) return false
            const loading = this.$loading()
            let formData = new FormData()
            e.target.files.forEach((item, index) => {
                formData.append(`file${index}`, item)
            })
            formData.append('autoSave', this.autoSave || false)
            let config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            }
            if (this.orc) {
                multipleInvoice(formData, config).then(data => {
                    loading.close()
                    this.$emit('change', data)
                })
            } else {
                uploadFile(formData, config).then(data => {
                    loading.close()
                    this.$emit('change', data)
                })
            }
        }
    }
}
</script>
