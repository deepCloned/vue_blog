const configs = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000/',
  errorCode: {
    10000: '发生未知错误，请稍后重试',
    10001: '传参发生错误，请核对后重试',
    10002: '用户名已经存在',
    10003: '禁止访问',
    10004: '没有找到相关数据'
  },
  loginType: {
    USERNAME: 100,
    EMAIL: 101
  }
}

export {
  configs
}
