<template>
  <section class="category">
    <div class="header">
      <span class="iconfont class-icon">&#xe60a;</span>
      <h3>文章分类</h3>
    </div>
    <ul class="category-wrap">
      <li
        @click="changeIndex(index); changeCategory(item.category)"
        class="item"
        :class="[ index === curIndex ? active : '' ]"
        v-for="(item, index) of categoryList"
        :key="item.id"
      >
        <img class="item-image" :src="item.image" alt="">
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Category',
  data () {
    return {
      categoryList: [
        {id: 10001, title: '全部分类', image: 'static/image/category/category.png', category: 'all'},
        {id: 10002, title: '读书', image: 'static/image/category/reading.jpg', category: 'reading'},
        {id: 10003, title: '故事', image: 'static/image/category/story.jpg', category: 'story'},
        {id: 10004, title: '心理', image: 'static/image/category/mental.jpg', category: 'mental'},
        {id: 10005, title: '青春', image: 'static/image/category/young.jpg', category: 'young'},
        {id: 10006, title: '传统文化', image: 'static/image/category/culture.jpg', category: 'culture'},
        {id: 10007, title: '万物生灵', image: 'static/image/category/everything.jpg', category: 'everything'},
        {id: 10008, title: '理财', image: 'static/image/category/financial.jpg', category: 'financial'}
      ],
      curIndex: 0,
      active: 'active'
    }
  },
  methods: {
    changeIndex (_index) {
      this.curIndex = _index
    },
    // 初始化 curIndex
    _initializeIndex () {
      this.curIndex = 0
    },
    changeCategory (val) {
      this.$emit('getChangeCategory', val)
    }
  },
  created () {
    this._initializeIndex()
  }
}
</script>

<style lang="scss" scoped>
  .category{
    width: 250px;
    margin-left: 20px;
    background-color: #fff;
    .header{
      position: relative;
      margin-left: 10px;
      height: 80px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .class-icon{
        color: #558;
        font-size: 18px;
      }
      h3{
        margin-left: 4px;
      }
      &::after{
        content: "";
        display: block;
        width: 250px;
        height: 1px;
        background-color: #dfdfdf;
        position: absolute;
        left: -20px;
        top: 60px;
      }
    }
    .category-wrap{
      .active{
        background-color: #FFE4B5;
        border-top: 1px solid #ffa54f;
        border-bottom: 1px solid #ffa54f;
        color: #f40;
      }
      .item{
        width: 100%;
        height: 50px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        &:hover{
          color: #f40;
        }
        .item-image{
          width: 20px;
          height: 20px;
          margin: 0 10px;
          border-radius: 2px;
        }
      }
    }
  }
</style>
