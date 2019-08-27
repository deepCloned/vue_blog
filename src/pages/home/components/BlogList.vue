<template>
  <section class="blog-list">
    <header>
      <div class="header">
        <span class="iconfont new-icon">&#xe629;</span>
        <h3>最新博客</h3>
      </div>
      <nav>
        <div class="select">
          <div @click="changeSelectContent" class="select-header">
            <span class="select-type">{{ selectContent }}</span>
            <span class="iconfont drop-down">&#xe605;</span>
            <ul v-if="isBlock" class="select-content">
              <li
                @click="changeContent(index)"
                v-for="(item, index) of selections"
                :key="index"
                class="keyword"
                ref="content"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <input v-model="keyword" type="text" placeholder="请输入关键词">
        <div class="btn">
          <transition
            :duration="500"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <span
              v-show="keyword.length > 0"
              @click="clearKeyword"
              class="iconfont cancel-icon"
            >
              &#xe621;
            </span>
          </transition>
          <span @click="confirmSearch" class="iconfont search-icon">&#xe606;</span>
          <span @click="confirmSearch" class="search">搜索</span>
        </div>
      </nav>
    </header>
    <ul v-if="blogList.length > 0" class="list-wrap">
      <transition-group
        :duration="1000"
        enter-active-class="animated fadeIn ease-in-out"
        leave-active-class="animated fadeOut ease-in-out"
      >
        <router-link
          v-for="item of blogList"
          :key="item.id"
          tag="li"
          :to="{name: 'Detail', params: {id: item.id}}"
          class="list-item"
        >
          <p class="title">{{ item.title }}</p>
          <p class="category">
            <i class="iconfont category-icon">&#xe609;</i>
            <span class="category-content">{{ item.category }}</span>
          </p>
          <p class="desc" v-html="item.content"></p>
          <p class="info">
            <span class="author">{{ item.author }}</span>
            <span class="common comment">
              <i class="iconfont comment-icon">&#xe642;</i>
              <span>{{ item.comment_count }}</span>
            </span>
            <span class="common collent">
              <i class="iconfont collect-icon">&#xe68e;</i>
              <span>{{ item.like_count }}</span>
            </span>
            <span class="common reading">
              <i class="iconfont reading-icon">&#xe660;</i>
              <span>{{ item.view_count }}</span>
            </span>
          </p>
        </router-link>
      </transition-group>
    </ul>
    <p v-else class="no-blog">暂无相关内容</p>
  </section>
</template>

<script>
export default {
  name: 'BlogList',
  data () {
    return {
      isBlock: false,
      selectContent: '内容',
      selections: ['内容', '标题'],
      keyword: ''
    }
  },
  props: {
    blogList: {
      type: Array
    }
  },
  methods: {
    changeSelectContent () {
      this.isBlock = !this.isBlock
    },
    changeContent (index) {
      this.selectContent = this.$refs.content[index].innerText
    },
    clearKeyword () {
      this.keyword = ''
    },
    confirmSearch () {
      var type
      const keyword = this.keyword
      if (!keyword) {
        this.$message({
          message: '搜索关键词不能为空',
          type: 'error'
        })
        return
      }
      this.$emit('clearBlogList')
      if (this.selectContent === '标题') {
        type = 200
      }
      if (this.selectContent === '内容') {
        type = 201
      }
      this.getAxios('v1/blog/search/' + type + '/' + keyword)
        .then(res => {
          this.keyword = ''
          this.$emit('getSearchBlog', res.data)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .blog-list{
    width: 800px;
    height: 800px;
    margin-left: 20px;
    background-color: #fff;
    color: #333;
    header{
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #dfdfdf;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .header{
        margin-left: 10px;
        display: flex;
        flex-direction: row;
        .new-icon{
          color: #3ee;
        }
        h3{
          margin-left: 2px;
        }
      }
      nav{
        width: 380px;
        height: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        border: 1px solid #dfdfdf;
        border-radius: 5px;
        margin-right: 10px;
        .select{
          width: 70px;
          .select-header{
            position: relative;
            width: 100%;
            height: 32px;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            &:hover{
              box-shadow: inset 0px 0px 3px #999;
            }
            .select-content{
              position: absolute;
              top: 35px;
              left: 0px;
              width: 70px;
              padding: 4px 0;
              border-radius: 5px;
              border: 1px solid #dfdfdf;
              background-color: #fff;
              z-index: 999;
              box-shadow: 0px 1px 4px #ddd;
              .keyword{
                width: 100%;
                height: 25px;
                line-height: 25px;
                text-indent: 11px;
                &:hover{
                  background-color: #F8F8FF;
                }
              }
            }
          }
        }
        input{
          width: 220px;
          height: 28px;
          padding-left: 10px;
          // appearance: none;
          // outline:0;
          // border:1px solid #c8cccf;
        }
        .btn{
          position: relative;
          width: 78px;
          height: 32px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          &:hover{
            box-shadow: inset 0px 0px 3px #999;
          }
          .cancel-icon{
            position: absolute;
            left: -20px;
            top: 7px;
          }
          .search{
            margin-left: 2px;
          }
        }
      }
    }
    .list-wrap{
      background-color: #fff;
      .list-item{
        box-sizing: border-box;
        width: 768px;
        height: 140px;
        margin: 16px;
        border-bottom: 1px solid #dfdfdf;
        cursor: pointer;
        .title{
          width: 100%;
          height: 40px;
          line-height: 40px;
          font-weight: 600;
        }
        .category{
          width: 100%;
          height: 20px;
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 13px;
          .category-icon{
            color: #666;
          }
          .category-content{
            margin-left: 10px;
          }
        }
        .desc{
          width: 100%;
          height: 20px;
          margin-top: 10px;
          line-height: 20px;
          font-size: 14px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .info{
          width: 100%;
          height: 20px;
          font-size: 13px;
          margin-top: 10px;
          display: flex;
          flex-direction: row;
          align-items: center;
          color: #666;
          .common{
            &:nth-of-type(n+1){
              margin-left: 10px;
              display: flex;
              flex-direction: row;
              align-items: center;
            }
            span{
              margin-left: 2px;
            }
          }
        }
      }
    }
    .no-blog{
      margin-top: 10px;
      text-align: center;
      color: #666;
    }
  }
</style>
