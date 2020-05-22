<template>
  <a-card :bordered="false">
    <div>
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="12" :xs="24">
              <span
                class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.definitionTable.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="restQuery()">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd()">新建</a-button>
      </div>
    </div>
    <s-table
      ref="definitionTable"
      size="default"
      :rowKey="(recordActive) => recordActive.id"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
    >
      <span slot="sequence" slot-scope="text, record, index">
        {{ index+1 }}
      </span>
      <span slot="suspended" slot-scope="text">
        {{ text?'挂起':'活动' }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleUpdate(record)">修改</a>
        </template>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import { queryList } from '@/api/process/definition'
import { STable } from '@/components'

export default {
  name: 'Definition',
  components: {
    STable
  },
  data () {
    return {
      // 查询参数
      queryParam: {},
      // 列表表头
      columns: [
        {
          title: '序列',
          dataIndex: 'sequence',
          key: 'sequence',
          scopedSlots: { customRender: 'sequence' }
        },
        {
          title: '流程名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '流程key',
          dataIndex: 'key',
          key: 'key'
        },
        {
          title: '版本',
          dataIndex: 'version',
          key: 'version'
        },
        {
          title: '状态',
          dataIndex: 'suspended',
          key: 'suspended',
          scopedSlots: { customRender: 'suspended' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '320px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        return queryList(Object.assign(parameter, this.queryParam))
          .then(res => {
            if (res.code === 10000) {
              return res.result
            }
          })
      },
      // 单个记录行
      recordActive: {}
    }
  },
  created () {

  },
  computed: {},
  methods: {
    // 重置查询
    restQuery () {
      this.queryParam = {}
      this.$refs.definitionTable.refresh(true)
    },
    // 刷新列表
    refresh () {
      this.$refs.definitionTable.refresh()
    },
    // 打开新增
    handleAdd (type, disabled) {
      this.recordActive = { type: type || '', disabled: disabled || false }
      // this.$refs.definitionAdd.show()
    },
    // 打开更新
    handleUpdate (record) {
      // get(record).then(res => {
      //   if (res.code === 10000) {
      //     this.recordActive = res.result
      //     this.$refs.definitionAdd.show()
      //   }
      // })
    }
  }
}
</script>

<style scoped>

</style>
