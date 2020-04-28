import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

// base library
import '@/core/lazy_lib/components_use'
import Viser from 'viser-vue'

// ext library
import VueClipboard from 'vue-clipboard2'
import PermissionHelper from '@/utils/helper/permission'
import uploader from 'vue-simple-uploader'
// import './directives/action'
import './directives/authorize'
import UUID from 'vue-uuid'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
VueClipboard.config.autoSetContainer = true
Vue.use(UUID)
Vue.use(Viser)
Vue.use(uploader)
Vue.use(VueStorage, config.storageOptions)
Vue.use(VueClipboard)
Vue.use(PermissionHelper)
