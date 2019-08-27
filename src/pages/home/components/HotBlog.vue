<template>
  <section class="hot-blog">
    <header>
      <span class="iconfont fire-icon">&#xe729;</span>
      <h3>热门博客</h3>
    </header>
    <ul class="hot-list">
      <router-link
        tag="li"
        :to="{name: 'Detail', params: {id: item.id}}"
        v-for="item of hotList"
        :key="item.id"
        class="hot-item"
      >
      {{ item.title }}
      </router-link>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'HotBlog',
  props: {
    hotList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    // getToDetail (value) {
    //   // this.$router.push({path: `blog/detail/${value}`})
    //   this.$router.push({name: 'Detail', params: {id: value}})
    // }
  }
}
</script>

<style lang="scss" scoped>
  .hot-blog{
    position: fixed;
    top: 80px;
    left: 1100px;
    width: 300px;
    height: 800px;
    margin-left: 20px;
    background-color: #fff;
    header{
      position: relative;
      margin-left: 10px;
      height: 60px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .fire-icon{
        color: #f50;
        font-size: 20px;
      }
      h3{
        margin-left: 4px;
      }
      &::after{
        content: "";
        display: block;
        width: 300px;
        height: 1px;
        background-color: #dfdfdf;
        position: absolute;
        left: -20px;
        top: 60px;
      }
    }
    .hot-list{
      margin-top: 20px;
      .hot-item{
        width: 260px;
        height: 20px;
        margin: 5px 20px;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }
    }
  }
  @media screen and (max-width: 1100px) {
    .hot-blog{
      display: none;
    }
  }
</style>
