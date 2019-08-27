<template>
  <section class="register">
    <header>欢迎注册</header>
    <ul class="input-box">
      <li class="item username">
        <span class="iconfont">&#xe631;</span>
        <input
          @input="validateUsername"
          v-model="username"
          type="text"
          placeholder="请输入用户名"
        />
        <transition
          :duration="500"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <span
            v-show="username.length > 0"
            @click="clearUsernameValue"
            class="iconfont cancel"
          >
            &#xe621;
          </span>
        </transition>
        <p v-show="!usernameChecked" class="error-message">{{ usernameError }}</p>
      </li>
      <li class="item email">
        <span class="iconfont">&#xe8c9;</span>
        <input
          @input="validateEmail"
          v-model="email"
          type="text"
          placeholder="请输入邮箱"
        />
        <transition
          :duration="500"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <span
            v-show="email.length > 0"
            @click="clearEmailValue"
            class="iconfont cancel"
          >
            &#xe621;
          </span>
        </transition>
        <p v-show="!emailChecked" class="error-message">{{ emailError }}</p>
      </li>
      <li class="item password">
        <span class="iconfont">&#xe654;</span>
        <input
          @input="validatePassword"
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
      <li class="item confirmPassword">
        <span class="iconfont">&#xe654;</span>
        <input
          @input="validateCPassword"
          v-model="confirmPassword"
          type="password"
          placeholder="确认密码"
        />
        <transition
          :duration="500"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <span
            v-show="confirmPassword.length > 0"
            @click="clearConfirmPasswordValue"
            class="iconfont cancel"
          >
            &#xe621;
          </span>
        </transition>
        <p v-show="!cPasswordChecked" class="error-message">{{ cPasswordError }}</p>
      </li>
    </ul>
    <div @click="getRegister" class="submit">注册</div>
  </section>
</template>

<script>
import { RegisterValidator } from '../../model/validator.js'
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      cancelBlock: false,
      usernameError: '用户名不得少于六位',
      emailError: '邮箱不符合规范',
      passwordError: '密码不符合规范，至少数字+字母',
      cPasswordError: '两次输入密码不一致，请核对后重试',
      usernameChecked: true,
      passwordChecked: true,
      emailChecked: true,
      cPasswordChecked: true
    }
  },
  computed: {
    isChecked () {
      return this.usernameChecked && this.emailChecked && this.passwordChecked && this.cPasswordChecked
    }
  },
  methods: {
    clearUsernameValue () {
      this.username = ''
    },
    clearEmailValue () {
      this.email = ''
    },
    clearPasswordValue () {
      this.password = ''
    },
    clearConfirmPasswordValue () {
      this.confirmPassword = ''
    },
    /**
     * 验证输入参数
     */
    // 用户名
    validateUsername () {
      this.usernameChecked = RegisterValidator.checkUsername(this.username)
    },
    // 邮箱
    validateEmail () {
      this.emailChecked = RegisterValidator.checkEmail(this.email)
    },
    // 密码
    validatePassword () {
      this.passwordChecked = RegisterValidator.checkPassword(this.password)
    },
    // 确认密码
    validateCPassword () {
      this.cPasswordChecked = RegisterValidator.checkConfirmPassword(this.password, this.confirmPassword)
    },
    getRegister () {
      // 发送请求之前验证
      if (this.isChecked) {
        this.postAxios('v1/user/register', {
          username: this.username,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        })
          .then(res => {
            if (res.status === 200 && res.data.errorCode === 0) {
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              this.$router.push({name: 'Login'})
            }
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .register{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 240px;
    height: 275px;
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
