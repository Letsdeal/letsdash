<template>
  <Card :class="{ up: isUp, down: !isUp }">
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
        timer: null
      }
    },
    props: {
      name: {
        type: String,
        required: true
      },
      refresh: {
        type: Number,
        default: 60
      },
      username: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      }
    },
    methods: {
      check: function () {
        let options = {
          auth: {
            username: this.username,
            password: this.password
          }
        }

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

<style lang="sass">

</style>
