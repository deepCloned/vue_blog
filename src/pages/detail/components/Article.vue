<template>
  <section class="article">
    <div class="label">
      <span class="iconfont balel-icon">&#xe609;</span>
      <span class="label-text">{{ content.category }}</span>
    </div>
    <h2 class="title">{{ content.title }}</h2>
    <div class="info">
      <h4 class="author">{{ content.author }}</h4>
      <div class="banner-info">
        <p class="date">2019-10-12</p>
        <p class="reading">
          <span class="text">阅读</span>
          <span clsss="num">{{ content.view_count }}</span>
        </p>
        <p class="comment">
          <span class="text">评论</span>
          <span class="num">{{ content.comment_count }}</span>
        </p>
        <p class="like">
          <span class="text">喜欢</span>
          <span class="num">{{ content.like_count }}</span>
        </p>
      </div>
    </div>
    <div class="content">{{ content.content }}</div>
  </section>
</template>

<script>
export default {
  name: 'Article',
  data () {
    return {
      contents: '',
      emoj: ':smile: '
    }
  },
  props: {
    content: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .article{
    min-width: 800px;
    min-height: 620px;
    box-sizing: border-box;
    padding: 30px 20px;
    border-bottom: 1px dashed #dfdfdf;
    .label{
      color: #666;
    }
    .title{
      width: 500px;
      line-height: 50px;
      margin-top: 20px;
      margin-left: 20px;
      font-size: 20px;
      font-weight: 600;
      color: #333;
    }
    .info{
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      color: #333;
      margin-left: 20px;
      .author{
        font-size: 14px;
      }
      .banner-info{
        display: flex;
        flex-direction: row;
        font-size: 12px;
        color: #666;
        margin-top: 4px;
        p:nth-of-type(n+2){
          margin-left: 4px;
        }
      }
    }
    .content{
      margin-top: 20px;
      letter-spacing: 1px;
      line-height: 25px;
      white-space: pre-line;
    }
  }
</style>
