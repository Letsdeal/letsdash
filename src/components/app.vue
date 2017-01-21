<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <slider animation="fade" :interval="20000" :speed="1000"
          :control-btn="false" :indicators="false" height="220px" class="logo">
          <slider-item>
            <Card>
              <img class="logo" src="../assets/images/logo.png" alt="">
            </Card>
          </slider-item>
          <slider-item>
            <Card>
              <img class="logo" src="../assets/images/logo.png" alt="">
            </Card>
          </slider-item>
        </slider>
      </div>
      <div class="col-3">
        <JSON url="https://google.com" :id="config.api.id"
          :secret="config.api.secret" :refresh=600 inline-template>
          <Card>
            <h1>{{ $('$.metadata.total') }} deals</h1>
          </Card>
        </JSON>
      </div>
      <div class="col-3">
        <Sentry name="Web" organization="orgname" project="web"
          :token="config.sentry.token" :refresh="60" />
      </div>
      <div class="col-3">
        <Sentry name="Web" organization="orgname" project="web"
          :token="config.sentry.token" :refresh="60" />
      </div>
    </div>
    <div class="row">
      <div class="col-3">

      </div>
      <div class="col-3">

      </div>
      <div class="col-3">
        <Clock format="HH:mm" />
      </div>
      <div class="col-3">
        <Travis name="Web" icon="docker" project="some/project"
          :travis="travis" :refresh="60" />
      </div>
    </div>
    <div class="row">
      <div class="col-3">

      </div>
      <div class="col-3">
      </div>
      <div class="col-3">
        <Travis name="Web" icon="symfony" project="some/project"
          :travis="travis" :refresh="60" />
      </div>
      <div class="col-3">
        <Travis name="Web" icon="javascript-alt" project="some/project"
          :travis="travis" :refresh="60" />
      </div>
    </div>
    <div class="row">
      <div class="col-3">

      </div>
      <div class="col-3">
        <Status name="Web" url="https://google.com"
          :username="config.status.username" :password="config.status.password" />
      </div>
      <div class="col-3">
        <Travis name="Android" icon="android" project="some/project"
          :travis="travis" :refresh="60" />
      </div>
      <div class="col-3">
        <Travis name="iOS" icon="apple" project="some/project"
          :travis="travis" :refresh="60" />
      </div>
    </div>

    <VideoPlayer src="http://some.url/to.mp4" />
  </div>
</template>

<script>
  import Config from 'config'
  import TravisService from 'services/travis'

  import Card from 'components/card'
  import Clock from 'widgets/clock'
  import JSON from 'widgets/json'
  import Sentry from 'widgets/sentry'
  import { Slider, SliderItem } from 'vue-easy-slider'
  import Status from 'widgets/status'
  import Travis from 'widgets/travis'
  import VideoPlayer from 'widgets/video'

  export default {
    mounted() {},
    components: {
      Card,
      Clock,
      JSON,
      Sentry,
      Slider,
      SliderItem,
      Status,
      Travis,
      VideoPlayer
    },
    data: () => {
      return {
        config: Config,
        travis: new TravisService(Config.travis.token)
      }
    }
  }
</script>

<style lang="sass">
  $fa-font-path: "~font-awesome/fonts";
  @import "~font-awesome/scss/font-awesome";

  $roboto-font-path: "~roboto-fontface/fonts";
  @import "~roboto-fontface/css/roboto/sass/roboto-fontface"

  @import "../assets/sass/font-mfizz"

  @import "~bootstrap/scss/_variables"

  $body-bg:    $gray-dark;
  $body-color: $white;

  $font-family-base: "Roboto";
  $font-size-base: 2rem;
  $text-muted: $gray-lighter;

  $card-bg: $gray;

  @import "~bootstrap/scss/bootstrap";

  body
    -webkit-font-smoothing: antialiased
    overflow: hidden
    text-shadow: #000 0 0 1px

  .row
    margin-top: 6px

  .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl
    padding-left: 3px
    padding-right: 3px

  .logo
    .card-block
      display: flex
      justify-content: center
      align-items: center
    img
      max-width: 100%
      max-height: 150px
</style>
