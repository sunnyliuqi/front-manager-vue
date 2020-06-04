<template>
  <a-drawer
    wrapClassName="custom-drawer custom-drawer-3"
    :maskClosable="false"
    title="启动流程"
    @close="onClose"
    :visible="visible"
    :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
  >
    <a-form
      :form="form"
    >
      <a-row :gutter="16">
        <a-divider orientation="left">流程定义</a-divider>
        <a-col :span="24">
          <a-form-item
            label="流程"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-select @select="getStartForm" :options="getProcessDefinitions" v-decorator="['processDefinitionId',{ rules: [{required: true, message: '流程不能为空'}] } ]" placeholder="请选择流程"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider v-if="startFormVisible" orientation="left">表单变量</a-divider>
      <dynamic-form :form-info="formInfo" v-if="startFormVisible"  />
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
import { startForm } from '@/api/process/instance'
import DynamicForm from '@/components/Activiti/WorkFlow/DynamicForm'
export default {
  name: 'StartProcessInstance',
  components: {
    DynamicForm
  },
  props: {
    getProcessDefinitions: {
      type: Array,
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
      formLoading: false,
      startFormVisible: false,
      formInfo: {}
    }
  },
  methods: {
    getStartForm (value, option) {
      const props = option.data.props
      if (props.hasStartForm === 'true') {
        this.startFormVisible = true
        startForm(value).then(res => {
          if (res.code === 10000) {
            this.formInfo = res.result
          }
        }
        )
      } else {
        this.startFormVisible = false
        this.formInfo = {}
      }
    },
    handleSubmit (e) {
      this.formLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = { 'assignee': this.form.getFieldValue('assignee'), 'action': 'claim' }
          this.taskAssign(this.record.id, params).then(res => {
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
    show () {
      this.visible = true
    },
    onClose () {
      this.visible = false
      this.startFormVisible = false
      this.formInfo = {}
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
