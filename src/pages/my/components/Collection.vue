<template>
  <transition-group
    :duration="200"
    mode="out-in"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    tag="ul"
    class="list"
  >
    <li
      v-for="item of blogList"
      :key="item.id"
      class="list-item"
    >
      <header>
        <span class="name">{{ item.author }}</span>
        <span class="date">{{ item.created_at | dateFilter}}</span>
      </header>
      <div class="content">
        <p class="title">{{ item.title }}</p>
        <router-link
          tag="p"
          :to="{name: 'Detail', params: {id: item.id}}"
          class="desc"
        >
        {{ item.content }}
        </router-link>
        <p class="info">
          <span class="iconfont common">&#xe642;</span>
          <span class="comment">{{ item.comment_count }}</span>
          <span class="iconfont common">&#xe68e;</span>
          <span class="collect">{{ item.like_count }}</span>
          <span class="iconfont common">&#xe660;</span>
          <span class="watched">{{ item.view_count }}</span>
          <span @click="cancelLike(item.id)" class="change cancel">取消收藏</span>
        </p>
      </div>
    </li>
  </transition-group>
</template>

<script>
import { dateFilter } from '@/filter/filter'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Collection',
  data () {
    return {
      blogList: []
    }
  },
  computed: {
    ...mapState([
      'username'
    ])
  },
  filters: {
    dateFilter
  },
  methods: {
    ...mapMutations([
      'changeMySelectState'
    ]),
    /**
     * get favor
     */
    getLikeBlog () {
      if (!this.username) {
        this.$message({
          message: '您还没有登录，无法获取相关数据',
          type: 'info'
        })
        return
      }
      this.getAxios('/v1/user/like')
        .then(res => {
          this.blogList = res.data
        })
    },
    /**
     * cancel like
     */
    cancelLike (id) {
      this.postAxios('/v1/blog/like/cancel', {
        id
      })
        .then((res) => {
          /**
           * 删除成功，在本地删除
           */
          let blogs = JSON.parse(JSON.stringify(this.blogList))
          let canceledBlog = this._removeItemById(id, blogs)
          this.blogList = canceledBlog
          this.$message({
            type: 'success',
            message: res.data.message
          })
        })
    },
    /**
     * filter array
     */
    _removeItemById (id, arr) {
      return arr.filter(function (ele) {
        return ele.id !== id
      })
    }
  },
  created () {
    this.getLikeBlog()
    this.changeMySelectState('like')
  }
}
</script>

<style lang="scss" scoped>
  .list{
    margin-top: 6px;
    border-top: 1px dashed #dfdfdf;
    color: #333;
    .list-item{
      border-bottom: 1px dashed #dfdfdf;
      padding-bottom: 10px;
      cursor: pointer;
      header{
        height: 40px;
        line-height: 40px;
        font-size: 13px;
        .date{
          margin-left: 5px;
          color: #666;
        }
      }
      .content{
        .title{
          font-weight: bolder;
        }
        .desc{
          margin-top: 10px;
          font-size: 14px;
          width: 600px;
          height: 20px;
          line-height: 20px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .info{
          position: relative;
          margin-top: 10px;
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 12px;
          color: #666;
          .common{
            color: #666;
            font-size: 12px;
            &:nth-of-type(n+2){
              margin-left: 6px;
            }
          }
          .change{
            position: absolute;
            right: 0px;
            top: 0px;
          }
          span:nth-of-type(even){
            margin-left: 2px;
          }
        }
      }
    }
  }
</style>
