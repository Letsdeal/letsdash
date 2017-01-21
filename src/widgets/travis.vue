<template>
  <Card :class="cardClass">
    <h1>
      <i class="fa fa-spinner fa-spin-slow fa-fw" v-if="status.state == 'started'"></i>
      {{ name }}

      <i class="text-muted pull-right fa" :class="['fa-' + icon]" v-if="icon"></i>
    </h1>

    #{{ status.buildNumber }} {{ status.state }}
    {{ status.startedAt | moment("from") }}
  </Card>
</template>

<script>
  import Card from 'components/card.vue'
  import Chart from 'chart.js'

  export default {
    mounted () {
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
    components: {
      Card
    },
    data: () => {
      return {
        repo: null,
        builds: null,
        status: {
          buildNumber: null,
          state: null,
          startedAt: null
        }
      }
    },
    props: {
      travis: {
        type: Object
      },
      name: {
        type: String,
        required: true
      },
      icon: {
        type: String
      },
      project: {
        type: String,
        required: true
      },
      refresh: Number
    },
    methods: {
      load: function() {
        this.travis.getRepo(this.project).then((repo) => {
          this.repo = repo

          this.travis.subscribe(repo)
        })

        this.travis.getBuilds(this.project).then((builds) => {
          this.builds = builds

          this.status.buildNumber = this.builds[0].number
          this.status.state = this.builds[0].state
          this.status.startedAt = this.builds[0].started_at
          this.status.finishedAt = this.builds[0].finished_at
          this.status.duration = this.builds[0].duration

          this.$forceUpdate()
        })
      }
    },
    computed: {
      cardClass: function () {
        const mapping = {
          passed: 'card-success',
          created: 'card-warning',
          started: 'card-warning',
          failed: 'card-danger',
          errored: 'card-danger'
        }

        return mapping[this.status.state]
      }
    }
  }
</script>

<style lang="sass">
  .passed
    background-color: green
  .failed
    background-color: red
  .started
    background-color: orange
  .errored
    background-color: red
  .fa-spin-slow
    animation: fa-spin 10s infinite linear
</style>
