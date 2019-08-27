<template>
  <section class="new-blog">
    <div class="header">
      <span class="title">标题</span>
      <p class="title-content">
        <input v-model="title" type="text">
      </p>
    </div>
    <div class="check-box">
      <span class="category">请选择一个标签</span>
      <span @click="changeBlock" class="category-content">
        <span>{{ category }}</span>
        <span class="iconfont drop-down">&#xe605;</span>
      </span>
      <ul v-if="isBlock" class="category-selection">
        <li
          @click="changeSelectValue(item)"
          v-for="(item, index) of categoryList"
          :key="index"
          class="category-item"
        >
        {{ item }}
        </li>
      </ul>
    </div>
    <textarea v-model="content" class="text-area" placeholder="写下你的文章"></textarea>
    <div class="text-info">
      <p class="left">ctrl+enter 发表文章</p>
      <p class="right">
        <span @click="clearBlog" class="cancel">取消</span>
        <span @click="addBlog" class="confirm">确定</span>
      </p>
    </div>
  </section>
</template>

<script>
import { AddBlogValidator } from '@/model/validator'
import { formateContent } from '@/utils/utils'
export default {
  name: 'NewBlog',
  data () {
    return {
      isBlock: false,
      title: '',
      category: '全部分类',
      categoryList: ['读书', '故事', '心理', '青春', '传统文化', '万物生灵', '理财'],
      content: ''
    }
  },
  methods: {
    changeBlock () {
      this.isBlock = !this.isBlock
    },
    clearBlog () {
      this.blog = ''
    },
    changeSelectValue (value) {
      this.category = value
      this.isBlock = false
    },
    addBlog () {
      const title = this.title
      const category = this.category
      const content = formateContent(this.content)
      if (AddBlogValidator.checkContent(title, '文章标题') && AddBlogValidator.checkContent(category, '文章内容')) {
        this.postAxios('v1/blog/add', {
          title,
          category,
          content
        })
          .then(res => {
            this.$message({
              message: res.data.message,
              type: 'success'
            })
            this.$router.push({name: 'Home'})
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .new-blog{
    position: relative;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    box-sizing: border-box;
    background-color: #fff;
    padding: 20px;
    padding-bottom: 30px;
    .header{
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 25px;
      .title{
        color: #333;
      }
      .title-content{
        margin-left: 10px;
        border-radius: 5px;
        width: 200px;
        height: 31px;
        padding: 3px 10px;
        box-sizing: border-box;
        border: 1px solid #f50;
        input{
          width: 150px;
          height: 20px;
          outline: none;
          border: 0;
        }
      }
    }
    .check-box{
      position: relative;
      margin-top: 10px;
      height: 30px;
      font-size: 14px;
      color: #333;
      display: flex;
      flex-direction: row;
      align-items: center;
      .category-content{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 84px;
        height: 24px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-left: 20px;
        cursor: pointer;
        .drop-down{
          margin-left: 5px;
        }
      }
      .category-selection{
        position: absolute;
        left: 118px;
        top: 30px;
        width: 84px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #fff;
        z-index: 9;
        box-shadow: 0px 0px 2px #ddd;
        .category-item{
          height: 24px;
          line-height: 24px;
          text-indent: 10px;
          margin-top: 2px;
          cursor: pointer;
          &:hover{
            background-color: #F8F8FF;
          }
          &:nth-last-child(1) {
            margin-bottom: 2px;
          }
        }
      }
    }
    .text-area{
      margin-top: 15px;
      width: 760px;
      height: 500px;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 5px;
    }
    .text-info{
      width: 740px;
      height: 30px;
      margin: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      color: #666;
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
</style>
