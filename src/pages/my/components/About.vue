<template>
  <section class="about">
    <header>
      <!-- <img src="//upload.jianshu.io/users/upload_avatars/4045861/e63cd7946ab4?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240" alt=""> -->
      <img src="" alt="">
      <span class="name">{{ username }}</span>
    </header>
    <div class="list-wrap">
      <ul class="nav">
        <li @click="getBlog('my');handleClickMy()" class="item" ref="my">
          <span>我写的文章</span>
          <span>{{ count_my }}</span>
        </li>
        <li @click="getBlog('like');handleClickLike()" class="item" ref="like">
          <span>我喜欢的文章</span>
          <span>{{ count_like }}</span>
        </li>
      </ul>
      <ul class="list">
        <li
          v-for="item of blogs"
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
              <span @click="open(item.id)" v-if="content === 'my'" class="change delete">删除</span>
              <span @click="cancelLike(item.id)" v-if="content === 'like'" class="change cancel">取消收藏</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { dateFilter } from '@/filter/filter'
import { CommentValidator } from '@/model/validator'
export default {
  name: 'About',
  data () {
    return {
      blogs: [],
      content: 'my',
      count_my: null,
      count_like: null
    }
  },
  props: {
    blogList: Array,
    myCount: Number,
    likeCount: Number
  },
  filters: {
    dateFilter
  },
  computed: {
    ...mapState([
      'username'
    ])
  },
  watch: {
    blogList: function (newValue) {
      this.blogs = newValue
    },
    myCount: function (newValue) {
      this.count_my = newValue
    },
    likeCount: function (newValue) {
      this.count_like = newValue
    }
  },
  methods: {
    getBlog (type) {
      this.$emit('getBlogs', type)
    },
    handleClickMy () {
      this.content = 'my'
      this.$refs.my.style.borderBottom = '2px solid #333'
      this.$refs.like.style.borderBottom = 'none'
    },
    handleClickLike () {
      this.content = 'like'
      this.$refs.like.style.borderBottom = '2px solid #333'
      this.$refs.my.style.borderBottom = 'none'
    },
    /**
     * delete blog
     */
    async open (id) {
      let msg = '确认删除该文章吗？'
      try {
        let result = await this.$confirm(msg, '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
        if (result === 'confirm') {
          if (CommentValidator.checkId(id)) {
            this.postAxios('/v1/blog/delete', {
              id
            })
              .then(res => {
                const blogList = [...this.blogList]
                const deletedList = this._removeList(id, blogList)
                this.blogs = deletedList
                this._ruduceMyCount()
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
              })
          }
        }
      } catch (e) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    cancelLike (id) {
      let msg = '确认取消收藏？'
      this.$confirm(msg, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.postAxios('/v1/blog/like/cancel', {
            blogId: id
          })
            .then(res => {
              const deletedList = this._removeList(id, this.blogList)
              this.blogs = deletedList
              this._reduceLikeCount()
              this.$message({
                type: 'success',
                message: '取消收藏成功'
              })
            })
        })
    },
    /**
     * 根据id值删除数据
     */
    _removeList (id, arr) {
      return arr.filter(ele => {
        return ele.id !== id
      })
    },
    /**
     * reduce my blog count
     */
    _ruduceMyCount () {
      this.count_my--
    },
    /**
     *
     */
    _reduceLikeCount () {
      this.count_like--
    }
  }
}
</script>

<style lang="scss" scoped>
  .about{
    margin-top: 80px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;
    width: 800px;
    padding: 20px;
    background-color: #fff;
    >header{
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 50px;
      >img{
        width: 50px;
        height: 50px;
        background-color: #EEE5DE;
        border-radius: 50%;
      }
      .name{
        margin-left: 10px;
      }
    }
    .list-wrap{
      min-height: 530px;
      margin-top: 20px;
      .nav{
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #333;
        .item{
          box-sizing: border-box;
          height: 45px;
          padding: 15px 20px;
          font-weight: 800;
          cursor: pointer;
          span{
            &:nth-of-type(1){

            }
          }
          &:nth-of-type(1){
            border-bottom: 2px solid #333;
          }
        }
      }
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
    }
  }
</style>
