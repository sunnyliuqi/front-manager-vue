<template>
  <div>
    <a-modal
      title="终止流程"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form
        :form="form"
      >
        <a-form-item
          label="终止原因"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            type="deleteReason"
            v-decorator="[
              'deleteReason',
              {rules: [{ required: true, message: '原因不能为空!' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          :wrapper-col="{ span: 12, offset: 5 }"
        >
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'Cancel',
  props: {
    record: {
      type: Object,
      default: undefined
    },
    deleteProcessInstance: {
      type: Function,
      default: undefined
    },
    refresh: {
      type: Function,
      default: undefined
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false
    }
  },
  methods: {
    show () {
      this.visible = true
    },
    handleOk (e) {
      this.confirmLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = { 'deleteReason': this.form.getFieldValue('deleteReason'), 'id': this.record.id }
          this.deleteProcessInstance(params).then(res => {
            if (res.code === 10000) {
              this.$message.info('终止成功')
              this.handleCancel()
              this.refresh()
            }
          })
            .finally(() => {
              this.confirmLoading = false
            })
        } else {
          setTimeout(() => {
            this.confirmLoading = false
          }, 600)
        }
      })
    },
    handleCancel (e) {
      this.visible = false
      this.form.resetFields()
    }
  }
}
</script>
