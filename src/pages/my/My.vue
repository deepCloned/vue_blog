<template>
  <section class="my">
    <section class="header">
      <Header />
    </section>
    <About />
  </section>
</template>

<script>
import Header from '../public/Header.vue'
import About from './components/About'
export default {
  name: 'My',
  components: {
    Header,
    About
  }
}
</script>

<style lang="scss" scoped>
.my{
  min-width: 950px;
  padding-left: calc(100vw - 100%);
  .header{
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 9;
  }
}
</style>
