<template>
  <a-row :gutter="16">
    <a-col :lg="24" :md="24">
      <span class="detail-label">普通</span><span class="detail-content"><base-uploader/></span>
    </a-col>
    <a-col :lg="24" :md="24">
      <br/>
    </a-col>
    <a-col :lg="24" :md="24">
      <span class="detail-label">自定义</span>
      <span class="detail-content">
        <base-uploader>
          <uploader-unsupport></uploader-unsupport>
          <uploader-btn :attrs="attrs">选择视频</uploader-btn>
          <uploader-list></uploader-list>
        </base-uploader>
      </span>
    </a-col>
  </a-row>
</template>

<script>
import BaseUploader from '@/components/BaseUploader'

export default {
  data () {
    return {
      attrs: {
        accept: 'video/*'
      }
    }
  },
  components: {
    BaseUploader
  },
  methods: {},
  mounted () {
  }
}
</script>

<style>
</style>
