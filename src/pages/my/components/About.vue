<template>
  <section class="about">
    <header>
      <!-- <img src="//upload.jianshu.io/users/upload_avatars/4045861/e63cd7946ab4?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240" alt=""> -->
      <img src="" alt="">
      <span class="name">{{ username }}</span>
    </header>
    <div class="list-wrap">
      <ul class="nav">
        <router-link
          to="/my/write"
          tag="li"
          class="item"
          :class="[ mySelectState === 'my' ? 'active' : '' ]"
        >
          <span>我写的文章</span>
        </router-link>
        <router-link
          to="/my/collection"
          tag="li"
          class="item"
          :class="[ mySelectState === 'like' ? 'active' : '' ]"
        >
          <span>我喜欢的文章</span>
        </router-link>
      </ul>
      <transition
        :duration="300"
        mode="out-in"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <router-view />
      </transition>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'About',
  data () {
    return {
      active: 'active'
    }
  },
  computed: {
    ...mapState([
      'username',
      'mySelectState'
    ])
  },
  methods: {
    ...mapMutations([
      'changeMySelectState'
    ])
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
        }
        .active{
          border-bottom: 2px solid #333;
        }
      }
    }
  }
</style>
