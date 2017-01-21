<template>
  <Card class="sentry">
    <h1>
      {{ name }}
      <i class="fa fa-bug pull-right"></i>
    </h1>
    {{ _.get(data, '[0][1]', '') }} events

    <canvas ref="chart" width="100%" height="100%"></canvas>
  </Card>
</template>

<script>
  import Card from 'components/card.vue'

  import _ from 'lodash'
  import axios from 'axios'
  import Chart from 'chart.js'

  export default {
    components: {
      Card
    },
    mounted() {
      this.chart = new Chart(this.$refs.chart, {
        type: 'line',
        data: {
          datasets: [{
            backgroundColor: "rgba(0,0,50,0.2)",
            data: []
          }]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: false
            }],
            yAxes: [{
              display: false
            }],
          }
        }
      })

      this.client = axios.create({
        baseURL: 'https://sentry.io/api/0/',
        headers: {
          'Authorization': `Bearer ${ this.token }`
        }
      })

      this.load()

      if (this.refresh) {
        this.timer = setInterval(this.load, this.refresh * 1000)
      }
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    computed: {
      _() {
        return _
      }
    },
    data: () => {
      return {
        data: []
      }
    },
    props: {
      name: {
        type: String,
        required: true,
      },
      organization: {
        type: String,
        required: true
      },
      project: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      },
      refresh: Number
    },
    watch: {
      url: (url) => {
        this.load()
      }
    },
    methods: {
      load: function () {
        let url = `/projects/${ this.organization }/${ this.project }/stats/`

        this.client.get(url).then((response) => {
          this.data = response.data

          this.chart.data.datasets[0].data = _.map(this.data, (entry) => {
            return { x: entry[0], y: entry[1] }
          })
          this.chart.update()
        })
      }
    }
  }
</script>

<style lang="sass">
  .sentry canvas
    width: 100% !important
    height: 100% !important
    position: absolute
    top: 0
    left: 0
</style>
