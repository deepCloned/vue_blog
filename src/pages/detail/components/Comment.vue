<template>
  <section class="comment">
    <div class="input-wrap">
      <textarea
        @keyup.ctrl.enter="confirmComment"
        class="text"
        v-model="comment"
        placeholder="写下你的评论"
      >
      </textarea>
      <div class="text-info">
        <p class="left">ctrl+enter 发表评论</p>
        <p class="right">
          <span @click="cancelComment" class="cancel">取消</span>
          <span @click="confirmComment" class="confirm">确定</span>
        </p>
      </div>
    </div>
    <div class="comment-list">
      <h3>评论</h3>
      <ul v-if="commentList.length > 0" class="list">
        <transition-group
          :duration="500"
          enter-active-class="aniamted fadeIn"
          leave-active-class="animated fadeOut"
        >
          <li
            v-for="item of commentList"
            :key="item.id"
            class="item"
          >
            <p class="name" :class="[ item.username === username ? 'myself' : null ]">{{ item.username }}</p>
            <p class="date">{{ item.created_at | dateFilter }}</p>
            <p class="comme">{{ item.comment }}</p>
            <span
              @click="deleteComment(item.id)"
              v-if="item.username === username" class="delete"
            >
              删除
            </span>
          </li>
        </transition-group>
      </ul>
      <p v-else class="no-comment">暂无评论</p>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { CommentValidator, RegisterValidator } from '@/model/validator'
import { Message } from 'element-ui'
import { dateFilter } from '@/filter/filter'
import { formateDate } from '@/utils/utils'
export default {
  name: 'Comment',
  data () {
    return {
      comment: '',
      commentList: [],
      myself: 'myself'
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
    cancelComment () {
      this.comment = ''
    },
    // 增加评论
    confirmComment () {
      const username = this.username
      const id = this.$route.params.id
      const comment = this.comment
      const created = formateDate()
      const content = {
        username,
        id,
        comment,
        created_at: created
      }
      if (!this.username) {
        Message({
          message: '请登录后再发表评论',
          type: 'error'
        })
        this.$router.push({name: 'Login'})
        return
      }
      if (RegisterValidator.checkUsername(username) && CommentValidator.checkId(id) && CommentValidator.checkComment(comment)) {
        this.postAxios('v1/blog/comment/add', {
          username,
          blogId: id,
          comment
        })
          .then(res => {
            Message({
              message: res.data.message,
              type: 'success'
            })
            this.commentList.unshift(content)
            this.comment = ''
          })
      }
    },
    // 获取评论
    getComment () {
      const id = this.$route.params.id
      if (CommentValidator.checkId(id)) {
        this.getAxios('v1/blog/comment/' + id)
          .then(res => {
            this.commentList = res.data
          })
      }
    },
    // delete comment
    deleteComment (commentId) {
      const id = commentId
      const username = this.username
      if (RegisterValidator.checkUsername(username) && CommentValidator.checkId(id)) {
        this.postAxios('v1/blog/comment/delete', {
          username,
          id
        })
          .then(res => {
            const comments = [...this.commentList]
            let arr = comments.filter(ele => {
              return ele.id !== id
            })
            this.commentList = arr
          })
      }
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style lang="scss" scoped>
  .comment{
    margin-top: 40px;
    background-color: #fff;
    color: #666;
    padding-bottom: 30px;
    border-bottom: 1px solid #dfdfdf;
    .input-wrap{
      .text{
        width: 760px;
        height: 80px;
        box-sizing: border-box;
        margin: 0 20px;
        padding: 15px;
        border-radius: 10px;
        border: 1px solid #f50;
      }
      .text-info{
        width: 760px;
        height: 30px;
        margin: 10px 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .left{
          font-size: 14px;
        }
        .right{
          .cancel{
            line-height: 30px;
            cursor: pointer;
            &:hover{
              color: #333;
            }
          }
          .confirm{
            width: 60px;
            height: 30px;
            line-height: 30px;
            margin-left: 20px;
            background-color: #42c02e;
            color: #fff;
            text-align: center;
            border-radius: 20px;
            cursor: pointer;
            &:hover{
              background-color: #42a02e;
            }
          }
        }
      }
    }
    .comment-list{
      width: 760px;
      padding: 20px;
      border-top: 1px dashed #dfdfdf;
      >h3{
        color: #333;
        font-size: 18px;
      }
      .list{
        width: 760px;
        margin-top: 20px;
        .item{
          border-bottom: 1px dashed #dfdfdf;
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          .name{
            margin-left: 10px;
            font-size: 14px;
            color: #333;
          }
          .myself{
            color: #f50;
          }
          .date{
            margin-left: 10px;
            margin-top: 5px;
            font-size: 12px;
          }
          .comme{
            margin-top: 20px;
            width: 760px;
          }
          .delete{
            font-size: 12px;
            color: #555;
            margin-top: 5px;
            margin-left: 730px;
            cursor: pointer;
            &:hover{
              color: #333;
              text-decoration: underline;
            }
          }
        }
      }
    }
    .no-comment{
      margin-top: 10px;
      text-align: center;
    }
  }
</style>
