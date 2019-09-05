<template>
  <nav class="container">
    <div class="left">
      <router-link tag="span" to="/" class="iconfont blog">&#xe632;</router-link>
      <p v-if="isLogin" class="logined">
        <span>欢迎你，{{ username }}</span>
        <span @click="signOut">退出</span>
      </p>
      <ul v-else class="no-login">
        <router-link tag="li" class="login" to="/login">立即登录</router-link>
        <router-link tag="li" class="login" to="/register">注册</router-link>
      </ul>
    </div>
    <ul class="right">
      <router-link tag="li" class="item" to="/">
        <span class="iconfont">&#xe60d;</span>
        <span>首页</span>
      </router-link>
      <router-link tag="li" class="item" to="/new">
        <span class="iconfont">&#xe6e6;</span>
        <span>博客</span>
      </router-link>
      <router-link tag="li" class="item" to="/my/write">
        <span class="iconfont">&#xe602;</span>
        <span>我的</span>
      </router-link>
    </ul>
    <!-- <button @click="verifyToken">验证token</button> -->
  </nav>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import { Storage } from '../../model/storage'
// import { Message } from 'element-ui'
// import axios from 'axios'
export default {
  name: 'Header',
  computed: {
    ...mapState([
      'isLogin',
      'username'
    ])
  },
  methods: {
    ...mapMutations([
      'changeLoginState',
      'changeToken',
      'changeUsername'
    ]),
    signOut () {
      let msg = '确认要退出登录吗？'
      this.$confirm(msg, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('username')
          this.changeLoginState(false)
          this.changeToken(null)
          this.changeUsername(null)
          this.$message({
            type: 'success',
            message: '退出成功'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出操作'
          })
        })
    }
    // verifyToken () {
    //   let token = localStorage.getItem('token')
    //   console.log('token is', token)
    //   if (token) {
    //     let decode = this._encodedToken(token)
    //     let auth = 'Basic ' + decode
    //     axios({
    //       url: 'http://localhost:3000/v1/token/verify',
    //       headers: {'Authorization': auth},
    //       method: 'POST'
    //     })
    //       .then(res => {
    //         console.log('verify token is', res)
    //       })
    //       .catch(err => {
    //         console.log('verifyToken is', err.response)
    //         Message({
    //           message: err.response.data.message,
    //           type: 'error'
    //         })
    //       })
    //   }
    // },
  }
}
</script>

<style lang="scss" scoped>
  .container{
    width: 100%;
    min-width: 600px;
    height: 60px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    .left{
      margin-left: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .blog{
        font-size: 30px;
        color: #f40;
        cursor: pointer;
      }
      .no-login{
        li{
          display: inline-block;
          margin: 0 4px;
          cursor: pointer;
          &:hover{
            color: #f40;
          }
          &:nth-of-type(1):after{
            position: absolute;
            top: 22px;
            left: 120px;
            content: "";
            display: block;
            width: 1px;
            height: 15px;
            background-color: #666;
          }
        }
      }
      .logined{
        font-size: 12px;
        color: #f40;
        span:nth-of-type(2){
          margin-left: 5px;
          color: #666;
          cursor: pointer;
        }
      }
    }
    .right{
      margin-right: 20px;
      .item{
        display: inline-block;
        margin: 0 10px;
        cursor: pointer;
        &:hover{
          color: #f40;
        }
      }
      .router-link-exact-active.router-link-active{
        color: #f40;
      }
    }
  }
</style>
