<template>
  <div id="app">
    <keep-alive>
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #efefef;
  .fade-enter-active, .fade-leave-active{
    transition: opacity .5s;
  }
  .fade-leave-to, .fade-enter{
    opacity: 0;
  }
}
</style>
