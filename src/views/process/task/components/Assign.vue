<template>
  <a-drawer
    wrapClassName="custom-drawer"
    :maskClosable="false"
    title="流程指派"
    @close="onClose"
    :visible="visible"
    :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
  >
    <a-form
      :form="form"
    >
      <a-form-item
        label="指派给"
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 16 }">
        <a-select :options="filter(getUsers)" v-decorator="['assignee',{ } ]" placeholder="请选择指派人"/>
      </a-form-item>
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
export default {
  name: 'Assign',
  props: {
    taskAssign: {
      type: Function,
      default: undefined
    },
    getUsers: {
      type: Array,
      default: () => []
    },
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
      formLoading: false
    }
  },
  methods: {
    filter (array) {
      return array.filter(item => {
        return !(this.record.assignee === item.value)
      })
    },
    show () {
      this.visible = true
    },
    handleSubmit (e) {
      this.formLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = { 'assignee': this.form.getFieldValue('assignee'), 'id': this.record.id }
          this.taskAssign(params).then(res => {
            if (res.code === 10000) {
              this.$message.info(res.msg)
              this.onClose()
              this.refresh()
            }
          })
            .finally(() => {
              this.formLoading = false
            })
        } else {
          setTimeout(() => {
            this.formLoading = false
          }, 600)
        }
      })
    },
    onClose (e) {
      this.visible = false
      this.form.resetFields()
    }
  }
}
</script>
