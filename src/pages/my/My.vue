<template>
  <section class="my">
    <section class="header">
      <Header />
    </section>
    <About @getBlogs="getBlogByType" :blogList="blogList" :myCount="myCount" :likeCount="likeCount" />
  </section>
</template>

<script>
import Header from '../public/Header.vue'
import About from './components/About'
import { mapState } from 'vuex'
export default {
  name: 'My',
  components: {
    Header,
    About
  },
  data () {
    return {
      blogList: [],
      myCount: null,
      likeCount: null
    }
  },
  computed: {
    ...mapState([
      'username'
    ])
  },
  methods: {
    getMyBlog () {
      if (!this.username) {
        this.$message({
          message: '您还没有登录，无法获取相关数据',
          type: 'error'
        })
        return
      }
      this.getAxios('/v1/user/my')
        .then(res => {
          this.blogList = res.data
          this.myCount = res.data.length
        })
    },
    /**
     * get favor
     */
    getLikeBlog () {
      if (!this.username) {
        this.$message({
          message: '您还没有登录，无法获取相关数据',
          type: 'error'
        })
        return
      }
      this.getAxios('/v1/user/like')
        .then(res => {
          this.blogList = res.data
          this.likeCount = res.data.length
        })
    },
    getBlogByType (val) {
      if (val === 'my') {
        this.getMyBlog()
      }
      if (val === 'like') {
        this.getLikeBlog()
      }
    }
  },
  created () {
    this.getMyBlog()
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
