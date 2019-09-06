<template>
  <section class="btn">
    <ul class="container">
      <li
        @click="backToTop"
        class="item scroll-top"
        :class="[isActive ? activeTop : '']"
      >
        <span class="iconfont common">&#xe608;</span>
      </li>
      <li @click="throttledLikeOrNot" class="item">
        <span v-if="isLike" class="iconfont common like">&#xe60b;</span>
        <span v-else class="iconfont common">&#xe68f;</span>
      </li>
      <li class="item">
        <span class="iconfont common">&#xe62a;</span>
      </li>
    </ul>
  </section>
</template>

<script>
import { CommentValidator } from '@/model/validator'
import { throttle } from '@/utils/utils'
import { mapState } from 'vuex'
export default {
  name: 'Btn',
  data () {
    return {
      isActive: false,
      activeTop: 'scroll-top-active',
      isLike: false
    }
  },
  props: {
    likeStatus: Boolean
  },
  computed: {
    ...mapState([
      'username'
    ])
  },
  watch: {
    likeStatus: function (newValue) {
      this.isLike = this.likeStatus
    }
  },
  methods: {
    getLikeOrNot () {
      let lock = false
      if (!lock) {
        const id = this.$route.params.id
        if (!this.username) {
          this.$message({
            message: '您还没有登录，无法执行相关操作',
            type: 'error'
          })
          return
        }
        if (CommentValidator.checkId(id)) {
          if (!this.isLike) {
            lock = true
            this.postAxios('v1/blog/like', {
              id
            })
              .then(res => {
                this.isLike = true
                lock = false
              })
          }
          if (this.isLike) {
            lock = true
            this.postAxios('v1/blog/like/cancel', {
              id
            })
              .then(res => {
                this.isLike = false
                lock = false
              })
          }
        }
      }
    },
    throttledLikeOrNot: throttle(function () {
      this.getLikeOrNot()
    }, 500),
    getScroll () {
      let scrollT = this._getScrollTop()
      if (scrollT > 0) {
        this.isActive = true
      } else {
        this.isActive = false
      }
    },
    backToTop () {
      let doc = document.documentElement || document.body
      let curScrollTop = this._getScrollTop()
      let timer = setInterval(function () {
        if (doc.scrollTop === 0) {
          clearInterval(timer)
        } else {
          doc.scrollTop -= curScrollTop / 66
        }
      }, 3)
    },
    _getScrollTop () {
      let doc = document.documentElement || document.body
      return doc.scrollTop
    }
  },
  created () {
    window.addEventListener('scroll', throttle(this.getScroll, 100))
  },
  deactivated () {
    window.removeEventListener('scroll', throttle(this.getScroll, 100))
  }
}
</script>

<style lang="scss" scoped>
  .btn{
    position: fixed;
    top: 550px;
    right: 200px;
    .container{
      .item{
        width: 50px;
        height: 50px;
        border: 1px solid #dfdfdf;
        line-height: 50px;
        text-align: center;
        background-color: #fff;
        &:nth-of-type(n+2){
          border-top: none;
        }
        &:hover{
          background-color: #efefef;
        }
        cursor: pointer;
        .common{
          color: #666;
          font-size: 20px;
        }
        .like{
          font-size: 19px;
          color: #ee2c2c;
        }
      }
      .scroll-top{
        visibility: hidden;
      }
      .scroll-top-active{
        visibility: visible;
      }
    }
  }
  @media screen and (max-width: 1350px){
    .btn{
      right: 50px;
    }
  }
  @media screen and (max-width: 1110px){
    .btn{
      right: 10px;
    }
  }
  @media screen and (max-width: 950px){
    .btn{
      display: none;
    }
  }
</style>
