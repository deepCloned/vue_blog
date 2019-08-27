import { Message } from 'element-ui'
import { configs } from '../api/config'

const loginType = configs.loginType

class RegisterValidator {
  // 验证用户名
  static checkUsername (username) {
    let usernameReg = /[A-Za-z0-9_\-\u4e00-\u9fa5]{6,32}/
    if (!usernameReg.test(username)) {
      return false
    }
    return true
  }

  // 验证邮箱
  static checkEmail (email) {
    const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (!emailReg.test(email)) {
      return false
    }
    return true
  }

  // 验证是否是邮箱，不是邮箱则按照用户名处理
  static getType (account) {
    const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (emailReg.test(account)) {
      return loginType.EMAIL
    }
    return loginType.USERNAME
  }

  // 验证密码
  static checkPassword (password) {
    const passwordReg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,}$/
    if (!passwordReg.test(password)) {
      return false
    }
    return true
  }

  // 验证两次密码是否一致
  static checkConfirmPassword (password, confirmPassword) {
    if (password !== confirmPassword) {
      return false
    }
    return true
  }
}

class CommentValidator {
  static checkId (id) {
    const idReg = /^[0-9]*[1-9][0-9]*$/
    if (!idReg.test(id)) {
      Message({
        message: 'id值必须为正整数',
        type: 'error'
      })
      return false
    }
    return true
  }

  static checkComment (comment) {
    if (comment.length < 6) {
      Message({
        message: 'comment不得少于6个字符',
        type: 'error'
      })
      return false
    }
    return true
  }
}

class AddBlogValidator {
  static checkContent (content, message) {
    if (content.length < 1) {
      Message({
        message: `${message}不能为空`,
        type: 'error'
      })
      return false
    }
    return true
  }
}

export {
  RegisterValidator,
  CommentValidator,
  AddBlogValidator
}
