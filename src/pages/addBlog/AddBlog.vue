<template>
  <section class="add-blog">
    <section class="header">
      <Header />
    </section>
    <NewBlog />
  </section>
</template>

<script>
import Header from '../public/Header'
import NewBlog from './components/NewBlog'
export default {
  name: 'AddBlog',
  components: {
    Header,
    NewBlog
  }
}
</script>

<style lang="scss" scoped>
  .add-blog{
    min-width: 950px;
    .header{
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      z-index: 9;
    }
  }
</style>
