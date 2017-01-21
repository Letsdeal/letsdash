<template>
  <div class="card">
    <div class="card-block">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="sass">
  $card-opacity: 0.8;

  .card
    height: 100%
    background-color: rgba(70, 74, 76, $card-opacity)
    backdrop-filter: blur(3px)
    border: none !important
    position: relative
  .card-success
    background-color: rgba(25, 99, 25, $card-opacity)
  .card-warning
    background-color: rgba(152, 122, 37, $card-opacity)
  .card-danger
    background-color: rgba(147, 30, 30, $card-opacity)
</style>
