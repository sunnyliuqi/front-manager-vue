<template>
  <a-row :gutter="16">
    <a-col :lg="24" :md="24">
      <base-uploader
        ref="uploader"
      />
    </a-col>
  </a-row>
</template>

<script>
import BaseUploader from '@/components/BaseUploader'

export default {
  data () {
    return {
    }
  },
  components: {
    BaseUploader
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style>
</style>
