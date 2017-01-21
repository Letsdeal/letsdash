<template>
  <Card>
    <slot :date=date>
      <h1 class="text-center">{{ date | moment(format) }}</h1>
      <div class="text-center">{{ date | moment("DD MMM YYYY") }}</div>
    </slot>
  </Card>
</template>

<script>
  import Card from 'components/card.vue'

  export default {
    components: {
      Card
    },
    mounted() {
      /*
      var msg = new SpeechSynthesisUtterance('');
      msg.lang = 'pl-PL';
      window.speechSynthesis.speak(msg);
      */

      this.timer = setInterval(this.updateDate, 1000)
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    data: () => {
      return {
        date: new Date,
        timer: null
      }
    },
    props: {
      format: {
        type: String,
        default: "hh:mm:ss"
      }
    },
    methods: {
      updateDate: function() {
        this.date = new Date
      }
    }
  }
</script>

