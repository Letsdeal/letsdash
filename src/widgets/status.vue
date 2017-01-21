<template>
  <Card :class="{ 'card-success': isUp, 'card-danger': !isUp }">
    <h1>
      {{ name }}
      <i class="fa fa-thumbs-o-up pull-right" v-if="isUp"></i>
      <i class="fa fa-thumbs-o-down pull-right" v-if="!isUp"></i>
    </h1>

    {{ responseTime }} ms
  </Card>
</template>

<script>
  import Card from 'components/card.vue'

  import axios from 'axios'

  export default {
    components: {
      Card
    },
    mounted () {
      this.check()

      this.timer = setInterval(this.check, this.refresh * 1000)
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    data: () => {
      return {
        client: null,
        isUp: false,
        timer: null,
        responseTime: 0
      }
    },
    props: {
      name: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      refresh: {
        type: Number,
        default: 60
      },
      username: String,
      password: String
    },
    methods: {
      check: function () {
        let options = {}

        if (this.username && this.password) {
          options.auth = {
            username: this.username,
            password: this.password
          }
        }

        let startTime = performance.now()

        axios.head(this.url, options).then((response) => {
          this.isUp = true
          this.responseTime = Math.round(performance.now() - startTime)
        }).catch(() => {
          this.isUp = false
          this.responseTime = 0
        })
      }
    }
  }
</script>
