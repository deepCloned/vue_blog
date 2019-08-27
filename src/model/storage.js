/**
 * 设置缓存，去除缓存
 */
import { Base64 } from 'js-base64'

class Storage {
  static setStorage (key, value) {
    return localStorage.setItem(key, value)
  }

  static getStorage (key) {
    return localStorage.getItem(key)
  }

  static clearStorage () {
    localStorage.clear()
  }

  // 加密token
  static encodedToken (token) {
    if (!token) {
      return
    }
    return Base64.encoded(token)
  }
}

export {
  Storage
}
