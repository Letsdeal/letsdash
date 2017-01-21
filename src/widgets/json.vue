<script>
  import Card from 'components/card.vue'

  import axios from 'axios'
  import jsonpath from 'jsonpath'

  export default {
    components: {
      Card
    },
    mounted() {
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
    data: () => {
      return {
        data: null,
        timer: null
      }
    },
    props: {
      url: {
        type: String,
        required: true
      },
      refresh: Number,
      username: String,
      password: String
    },
    watch: {
      url: (url) => {
        this.load()
      }
    },
    methods: {
      load: function () {
        let options = {}

        if (this.username && this.password) {
          options.auth = {
            username: this.username,
            password: this.password
          }
        }

        axios.get(this.url, options).then((response) => {
          this.data = response.data
        })
      },
      $: function(path) {
        if (!this.data) return ''

        return jsonpath.query(this.data, path)[0]
      }
    }
  }
</script>
