<template>
  <a-row :gutter="16">
    <a-col :span="24">
      <div id="main" :style="{width: '600px', height: '600px'}"></div>
    </a-col>
  </a-row>

</template>

<script>
import { china, hk } from '@/components/Geomap/China'
let timeFn = null
let echarts = null
let myChart = null
// 各省份的数据
const allData = [{
  name: '北京'
}, {
  name: '天津'
}, {
  name: '上海'
}, {
  name: '重庆'
}, {
  name: '河北'
}, {
  name: '河南'
}, {
  name: '云南'
}, {
  name: '辽宁'
}, {
  name: '黑龙江'
}, {
  name: '湖南'
}, {
  name: '安徽'
}, {
  name: '山东'
}, {
  name: '新疆'
}, {
  name: '江苏'
}, {
  name: '浙江'
}, {
  name: '江西'
}, {
  name: '湖北'
}, {
  name: '广西'
}, {
  name: '甘肃'
}, {
  name: '山西'
}, {
  name: '内蒙古'
}, {
  name: '陕西'
}, {
  name: '吉林'
}, {
  name: '福建'
}, {
  name: '贵州'
}, {
  name: '广东'
}, {
  name: '青海'
}, {
  name: '西藏'
}, {
  name: '四川'
}, {
  name: '宁夏'
}, {
  name: '海南'
}, {
  name: '台湾'
}, {
  name: '香港'
}, {
  name: '澳门'
}]
for (var i = 0; i < allData.length; i++) {
  allData[i].value = Math.round(Math.random() * 100)
}
export default {
  name: 'GeoMapJpn',
  data () {
    return {
      echarts: {},
      myChart: {},
      chartData: allData
    }
  },
  mounted () {
    /**
     * 初始化
     */
    echarts = this.$echarts
    myChart = echarts.init(document.getElementById('main'))
    myChart.on('click', this.click)
    myChart.on('dblclick', this.doubleClick)
    /**
     * 默认加载
     */
    loadMap('china', china, this.chartData)
  },
  methods: {
    doubleClick (params) {
      clearTimeout(timeFn)
      console.info('双击了一下')
      loadMap('china', china, this.chartData)
    },
    click (params) {
      clearTimeout(timeFn)
      timeFn = setTimeout(function () {
        console.info('单击了一下')
        loadMap('hk', hk, this.chartData)
      }, 250)
    }
  }
}
/**
 * 加载地图报表
 * @param name
 * @param geoJson
 * @param chartData
 */
function loadMap (name, geoJson, chartData) {
  echarts.registerMap(name, geoJson)
  const option = {
    tooltip: {
      show: true,
      formatter: function (params) {
        if (params.data) return params.name + '：' + params.data['value']
      }
    },
    visualMap: {
      type: 'continuous',
      text: ['', ''],
      showLabel: true,
      left: '50',
      min: 0,
      max: 100,
      inRange: {
        // eslint-disable-next-line standard/array-bracket-even-spacing
        color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096' ]
      },
      splitNumber: 0
    },
    series: [{
      name: 'MAP',
      type: 'map',
      mapType: name,
      selectedMode: 'false', // 是否允许选中多个区域
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      },
      data: chartData
    }]
  }
  myChart.setOption(option)
}
</script>

<style scoped>
</style>
