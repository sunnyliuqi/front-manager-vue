<template>
  <a-card :bordered="false">
    <div>
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="实例名称">
                <a-input v-model="queryParam.nameLike" placeholder="请输入实例名称"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="业务key">
                <a-input v-model="queryParam.businessKey" placeholder="请输入业务key"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="状态">
                <a-select :options="allStatus" v-model="queryParam.finished" placeholder="全部"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <span
                class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.instanceTable.refresh(true)">查询</a-button>
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
      ref="instanceTable"
      size="default"
      :rowKey="(recordActive) => recordActive.id"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
    >
      <span slot="sequence" slot-scope="text, record, index">
        {{ index+1 }}
      </span>
      <span slot="startTime" slot-scope="text">
        {{ formatDate(text) }}
      </span>
      <span slot="endTime" slot-scope="text">
        {{ formatDate(text) }}
      </span>
      <span slot="durationInMillis" slot-scope="text">
        {{ duration(text) }}
      </span>
      <span slot="status" slot-scope="text">
        {{ text?'结束':'进行' }}
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
import { queryList } from '@/api/process/instance'
import { STable } from '@/components'
import { formatDate, duration } from '@/utils/common'
export default {
  name: 'Instance',
  components: {
    STable
  },
  data () {
    return {
      formatDate: formatDate,
      duration: duration,
      allStatus: [{ label: '全部', value: '' }, { label: '进行', value: 'false' }, { label: '结束', value: 'true' }],
      // 查询参数
      queryParam: { },
      // 列表表头
      columns: [
        {
          title: '序列',
          dataIndex: 'sequence',
          key: 'sequence',
          scopedSlots: { customRender: 'sequence' }
        },
        {
          title: '实例名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'businessKey',
          dataIndex: 'businessKey',
          key: 'businessKey'
        },
        {
          title: '发起人',
          dataIndex: 'startUserId',
          key: 'startUserId'
        },
        {
          title: '发起时间',
          dataIndex: 'startTime',
          key: 'startTime',
          width: '150px',
          scopedSlots: { customRender: 'startTime' }
        },
        {
          title: '结束时间',
          dataIndex: 'endTime',
          key: 'endTime',
          width: '150px',
          scopedSlots: { customRender: 'endTime' }
        },
        {
          title: '耗时',
          dataIndex: 'durationInMillis',
          key: 'durationInMillis',
          scopedSlots: { customRender: 'durationInMillis' }
        },
        {
          title: '状态',
          dataIndex: 'endTime',
          key: 'status',
          scopedSlots: { customRender: 'status' }
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
      this.$refs.instanceTable.refresh(true)
    },
    // 刷新列表
    refresh () {
      this.$refs.instanceTable.refresh()
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
      //     this.$refs.instanceAdd.show()
      //   }
      // })
    }
  }
}
</script>

<style scoped>

</style>
