<template>
  <section class="login">
    <header>欢迎登录</header>
    <ul class="input-box">
      <li class="item username">
        <span class="iconfont">&#xe631;</span>
        <input
          @change="validateAccount"
          v-model="account"
          type="text"
          placeholder="请输入用户名 / 邮箱"
        />
        <transition
          :duration="500"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <span
            v-show="account.length > 0"
            @click="clearAccountValue"
            class="iconfont cancel"
          >
            &#xe621;
          </span>
        </transition>
        <p v-show="!accountChecked" class="error-message">{{ accountError }}</p>
      </li>
      <li class="item password">
        <span class="iconfont">&#xe654;</span>
        <input
          @change="validatePassword"
          v-model="password"
          type="password"
          placeholder="请输入密码"
        />
        <transition
          :duration="500"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <span
            v-show="password.length > 0"
            @click="clearPasswordValue"
            class="iconfont cancel"
          >
            &#xe621;
          </span>
        </transition>
        <p v-show="!passwordChecked" class="error-message">{{ passwordError }}</p>
      </li>
    </ul>
    <div @click="getLogin" class="submit">登录</div>
  </section>
</template>

<script>
import { RegisterValidator } from '../../model/validator'
import axios from 'axios'
import { configs } from '../../api/config'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      account: '',
      password: '',
      accountError: '用户名 / 邮箱不符合规范',
      passwordError: '密码至少包含数字、字母、符号中的两种',
      accountChecked: true,
      passwordChecked: true,
      cancelBlock: false
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'username',
      'token'
    ]),
    isChecked () {
      return this.accountChecked && this.passwordChecked
    }
  },
  methods: {
    ...mapMutations([
      'changeToken',
      'changeUsername',
      'changeLoginState'
    ]),
    clearAccountValue () {
      this.account = ''
    },
    clearPasswordValue () {
      this.password = ''
    },
    /**
     * 验证输入的合法性
     */
    validateAccount () {
      this.accountChecked = RegisterValidator.checkUsername(this.account) || RegisterValidator.checkEmail(this.account)
    },
    validatePassword () {
      this.passwordChecked = RegisterValidator.checkPassword(this.password)
    },
    getLogin () {
      const type = RegisterValidator.getType(this.account)
      const CancelToken = axios.CancelToken
      const source = CancelToken.source()
      axios({
        url: configs.baseUrl + 'v1/token',
        method: 'POST',
        data: {
          account: this.account,
          password: this.password,
          type: type
        }
      }, {
        cancelToken: source.token
      })
        .then(res => {
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          let token = res.data.token
          let username = res.data.username
          /**
           * 登录成功，用户名和token写入缓存和vuex中
           */
          localStorage.setItem('username', username)
          localStorage.setItem('token', token)
          this.changeToken(token)
          this.changeUsername(username)
          this.changeLoginState(true)
          this.$router.push({name: 'Home'})
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            type: 'error'
          })
        })
      source.cancel()
    }
  }
}
</script>

<style lang="scss" scoped>
  .login{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 240px;
    height: 245px;
    padding: 20px 30px;
    border: 1px solid #dfdfdf;
    border-radius: 5px;
    background-color: #fff;
    header{
      position: relative;
      width: 240px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #f40;
      &:after{
        content: "";
        display: block;
        position: absolute;
        top: 40px;
        left: 0px;
        width: 240px;
        height: 1px;
        background-color: #FFE4B5;
      }
    }
    .input-box{
      width: 240px;
      height: 120px;
      margin-top: 30px;
      .item{
        position: relative;
        box-sizing: border-box;
        width: 240px;
        height: 30px;
        border-bottom: 1px solid #FFE4B5;
        color: #666;
        display: flex;
        flex-direction: row;
        align-items: center;
        .error-message{
          position: absolute;
          top: 35px;
          left: 30px;
          color: red;
          font-size: 10px;
        }
        span{
          color: #999!important;
          margin-left: 4px;
        }
        input{
          margin-left: 10px;
          border: 0;
          width: 180px;
          color: #666;
        }
        &:nth-of-type(n+2){
          margin-top: 15px;
        }
        .cancel{
          cursor: pointer;
        }
      }
    }
    .submit{
      width: 240px;
      height: 30px;
      line-height: 30px;
      margin-top: 20px;
      text-align: center;
      background-color: #f40;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
    }
  }
</style>
