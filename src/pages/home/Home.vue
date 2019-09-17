<template>
  <div class="root">
    <section class="header">
      <Header />
    </section>
    <section class="category">
        <Category @getChangeCategory="getCategoryValue" />
      </section>
    <section class="content">
      <blog-list
        :blogList="latestBlog"
        @clearBlogList="handleClearBlog"
        @getSearchBlog="handleSearchBlog"
      />
      <Loading v-show="isLoading"></Loading>
      <hot-blog :hotList="hotBlog" />
    </section>
  </div>
</template>

<script>
import Header from '../public/Header'
import Category from './components/Category'
import BlogList from './components/BlogList'
import HotBlog from './components/HotBlog'
import Loading from '../public/Loading'
import { Base64 } from 'js-base64'
import { mapMutations } from 'vuex'
import axios from 'axios'
import { configs } from '../../api/config'
export default {
  name: 'Home',
  data () {
    return {
      latestBlog: [],
      hotBlog: [],
      isLoading: true
    }
  },
  components: {
    Header,
    Category,
    BlogList,
    HotBlog,
    Loading
  },
  methods: {
    ...mapMutations([
      'changeUsername',
      'changeToken'
    ]),
    getLatestBlog () {
      this.getAxios('v1/blog/latest')
        .then(res => {
          this.latestBlog = res.data
          this.isLoading = false
        })
    },
    getHotBlog () {
      this.getAxios('v1/blog/hot')
        .then(res => {
          this.hotBlog = res.data
        })
    },
    getBlogsByCategory (category) {
      if (category === 'all') {
        this.getLatestBlog()
      } else {
        this.getAxios('v1/blog/' + category)
          .then(res => {
            this.latestBlog = res.data
          })
      }
    },
    getCategoryValue (category) {
      this.getBlogsByCategory(category)
    },
    verifyToken () {
      const token = this._encodeToken()
      axios.get(configs.baseUrl + 'v1/token/verify', {
        headers: {
          'Authorization': token
        }
      })
        .then(res => {
          if (res.status === 200) {
            // console.log('verifyToken is', res)
          }
        })
        .catch(() => {
          // console.log('verifyToken is error is', err.response)
          /**
           * token不正确，清空缓存和vuex
           */
          localStorage.removeItem('token')
          localStorage.removeItem('username')
          this.changeUsername(null)
          this.changeToken(null)
        })
    },
    // 博客列表置空
    handleClearBlog () {
      this.latestBlog = []
      this.isLoading = true
    },
    // 更换为搜索内容
    handleSearchBlog (value) {
      this.latestBlog = value
      this.isLoading = false
    },
    // base64加密token
    _encodeToken () {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      return 'Basic' + Base64.encode(token + ':')
    }
  },
  created () {
    this.verifyToken()
    this.getLatestBlog()
    this.getHotBlog()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .header{
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 9;
  }
  .category{
    position: fixed;
    top: 80px;
    left: 0px;
  }
  .content{
    position: relative;
    min-width: 1104px;
    margin-top: 80px;
    margin-left: 270px;
    display: flex;
    flex-direction: row;
  }
</style>

<style>
  .loadEffect{
    top: 60px!important;
    left: 300px!important;
  }
</style>
