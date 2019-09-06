const formateDate = function () {
  let arr = []
  const date = new Date()
  const year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  arr.push(year)
  arr.push(month)
  arr.push(day)
  return arr.join('-')
}

const formateContent = function (content) {
  const reg = /\n/g
  if (!content) {
    return
  }
  return content.replace(reg, '\n\n')
}

// 防抖
const debounce = function (fn, delay = 1000) {
  let timer = null
  return function () {
    clearInterval(timer)
    const self = this
    let args = arguments
    timer = setTimeout(function () {
      fn.apply(self, args)
    }, delay)
  }
}

// 节流
const throttle = function (fn, wait = 100) {
  let lastTime = 0
  return function () {
    let curTime = +new Date()
    if (curTime - lastTime > wait) {
      fn.apply(this, arguments)
      lastTime = curTime
    }
  }
}

export {
  formateDate,
  formateContent,
  throttle,
  debounce
}
