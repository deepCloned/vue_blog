<template>
  <section class="detail">
    <section class="header">
      <Header />
    </section>
    <section class="content">
      <Article :content="content" />
      <Loading v-show="isLoading"></Loading>
      <Comment />
    </section>
    <Btn :likeStatus="likeStatus" />
  </section>
</template>

<script>
import Header from '../public/Header'
import Article from './components/Article'
import Comment from './components/Comment'
import Btn from './components/Btn'
import Loading from '../public/Loading'
import { mapState } from 'vuex'
export default {
  name: 'Detail',
  components: {
    Header,
    Article,
    Comment,
    Btn,
    Loading
  },
  data () {
    return {
      content: {},
      isLoading: true,
      likeStatus: false
    }
  },
  computed: {
    ...mapState([
      'username'
    ])
  },
  methods: {
    getBlogById (id) {
      var data = {}
      if (!this.username) {
        data = {
          id: id
        }
      } else {
        data = {
          id: id,
          username: this.username
        }
      }
      this.postAxios('v1/blog/detail', data)
        .then(res => {
          this.content = res.data
          this.isLoading = false
          if (res.data.like_status) {
            this.likeStatus = res.data.like_status
          }
        })
    }
  },
  created () {
    this.getBlogById(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
  .detail{
    min-width: 950px;
    .header{
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      min-width: 800px;
      z-index: 9;
    }
    .content{
      position: relative;
      margin: 80px auto 0px;
      width: 800px;
      min-height: 800px;
      background-color: #fff;
      border-radius: 4px;
    }
  }
</style>

<style>
  .loadEffect{
    top: 50px!important;
    left: 300px!important;
  }
</style>
