<template>
  <a-row :gutter="16">
    <a-col :span="24">
      <div id="main" :style="{width: '600px', height: '600px'}"></div>
    </a-col>
  </a-row>

</template>

<script>
import Hk from '@/components/Geomap/China/HK'
const option = {
  title: {
    text: '香港18区人口密度 （2011）',
    subtext: '人口密度数据',
    sublink: '/example/geoMapJpn'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}<br/>{c} (p / km2)'
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  },
  visualMap: {
    min: 800,
    max: 50000,
    text: ['High', 'Low'],
    realtime: false,
    calculable: true,
    inRange: {
      color: ['lightskyblue', 'yellow', 'orangered']
    }
  },
  series: [
    {
      name: '香港18区人口密度',
      type: 'map',
      mapType: 'HK', // 自定义扩展图表类型
      label: {
        show: true
      },
      data: [
        { name: '中西区', value: 20057.34 },
        { name: '湾仔', value: 15477.48 },
        { name: '东区', value: 31686.1 },
        { name: '南区', value: 6992.6 },
        { name: '油尖旺', value: 44045.49 },
        { name: '深水埗', value: 40689.64 },
        { name: '九龙城', value: 37659.78 },
        { name: '黄大仙', value: 45180.97 },
        { name: '观塘', value: 55204.26 },
        { name: '葵青', value: 21900.9 },
        { name: '荃湾', value: 4918.26 },
        { name: '屯门', value: 5881.84 },
        { name: '元朗', value: 4178.01 },
        { name: '北区', value: 2227.92 },
        { name: '大埔', value: 2180.98 },
        { name: '沙田', value: 9172.94 },
        { name: '西贡', value: 3368 },
        { name: '离岛', value: 806.98 }
      ],
      // 自定义名称映射
      nameMap: {
        'Central and Western': '中西区',
        'Eastern': '东区',
        'Islands': '离岛',
        'Kowloon City': '九龙城',
        'Kwai Tsing': '葵青',
        'Kwun Tong': '观塘',
        'North': '北区',
        'Sai Kung': '西贡',
        'Sha Tin': '沙田',
        'Sham Shui Po': '深水埗',
        'Southern': '南区',
        'Tai Po': '大埔',
        'Tsuen Wan': '荃湾',
        'Tuen Mun': '屯门',
        'Wan Chai': '湾仔',
        'Wong Tai Sin': '黄大仙',
        'Yau Tsim Mong': '油尖旺',
        'Yuen Long': '元朗'
      }
    }
  ]
}
let timeFn = null

export default {
  name: 'GeoMapJpn',
  data () {
    return {
      echarts: {},
      myChart: {}
    }
  },
  mounted () {
    /**
     * 初始化
     */
    this.echarts = this.$echarts
    this.myChart = this.echarts.init(document.getElementById('main'))
    this.myChart.on('click', this.click)
    this.myChart.on('dblclick', this.doubleClick)
    /**
     * 默认加载
     */
    this.loadMap('HK', Hk, option)
  },
  methods: {
    doubleClick (params) {
      clearTimeout(timeFn)
      console.info('双击了一下')
    },
    click (params) {
      clearTimeout(timeFn)
      timeFn = setTimeout(function () {
        console.info('单击了一下')
      }, 250)
    },
    /**
     * 加载地图报表
     * @param name
     * @param geoJson
     * @param option
     */
    loadMap (name, geoJson, option) {
      this.echarts.registerMap(name, geoJson)
      this.myChart.setOption(option)
    }
  }
}
</script>

<style scoped>
</style>
