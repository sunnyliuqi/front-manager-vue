<template>
  <a-layout>
    <a-layout-sider>SiderSiderSiderSiderSiderSiderSiderSiderSiderSiderSiderSiderSiderSider</a-layout-sider>
    <a-layout-content>Content
    </a-layout-content>
    <a-layout-sider>SiderSiderSiderSiderSiderSiderSiderSiderSiderSiderSiderSiderSiderSider</a-layout-sider>
  </a-layout>
</template>

<script>
export default {
  name: 'FormDesign'
}
</script>

<style scoped>
  /deep/ .ant-layout-sider {
    background-color: rgb(240, 242, 245);
    overflow-x: hidden;
    min-height: 0;
    word-break: break-all;
  }

  /deep/ .ant-layout-content {
    word-break: break-all;
  }
</style>
