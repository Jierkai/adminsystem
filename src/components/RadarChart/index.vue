<template>
  <div>
    <div id="main" style="width: 600px;height: 600px" />
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'RadarChart',
  data() {
    return {
      option: {
        legend: {
          data: ['Allocated Budget', 'Actual Spending']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: 'Sales', max: 6500, min: 0 },
            { name: 'Administration', max: 16000, min: 0 },
            { name: 'Information Technology', max: 30000, min: 0 },
            { name: 'Customer Support', max: 38000, min: 0 },
            { name: 'Development', max: 52000, min: 0 },
            { name: 'Marketing', max: 25000, min: 0 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: 'Allocated Budget'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: 'Actual Spending'
              }
            ]
          }
        ]
      }
    }
  },
  mounted() {
    const RadarEcharts = echarts.init(document.getElementById('main'))
    RadarEcharts.setOption(this.option)
  }
}
</script>

<style scoped>

</style>
