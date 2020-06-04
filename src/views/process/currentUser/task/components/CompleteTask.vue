<template>
  <a-drawer
    wrapClassName="custom-drawer custom-drawer-3"
    :maskClosable="false"
    title="完成任务"
    @close="onClose"
    :visible="visible"
    :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
  >
    <a-form
      :form="form"
    >
      <a-row :gutter="16">
        <a-divider orientation="left">任务信息</a-divider>
      </a-row>
      <a-divider v-if="formVariableVisible" orientation="left">表单变量</a-divider>
<!--      <dynamic-form :form-info="formInfo" v-if="formVariableVisible" />-->
      <div
        :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
      >
        <a-button
          :style="{marginRight: '8px'}"
          @click="onClose"
        >
          取消
        </a-button>
        <a-button @click="handleSubmit" type="primary" :loading="formLoading">保存</a-button>
      </div>

    </a-form>
  </a-drawer>
</template>

<script>
import { setActivitiFormDateFormat } from '@/utils/common'
export default {
  name: 'CompleteTask',
  components: {
  },
  props: {
    refresh: {
      type: Function,
      default: undefined
    },
    record: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
      formLoading: false,
      formVariableVisible: false,
      formInfo: {}
    }
  },
  methods: {
    handleSubmit (e) {
      this.formLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = setActivitiFormDateFormat(values, this.formInfo.fields)
          console.info(JSON.stringify(params))
          // startProcessInstance(params).then(res => {
          //   if (res.code === 10000) {
          //     this.$message.info(res.msg)
          //     this.onClose()
          //     this.refresh()
          //   }
          // })
          //   .finally(() => {
          //     this.formLoading = false
          //   })
        } else {
          setTimeout(() => {
            this.formLoading = false
          }, 600)
        }
      })
    },
    show () {
      this.visible = true
    },
    onClose () {
      this.visible = false
      this.formVariableVisible = false
      this.formInfo = {}
      this.formLoading = false
      this.form.resetFields()
    }
  }
}
</script>

<style scoped>
  /deep/ .ant-divider-horizontal .ant-divider-with-text-left{
    font-size: 14px;
  }
</style>
