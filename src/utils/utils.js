const formateDate = function () {
  const arr = []
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

const throttle = function (fn, delay = 100) {
  let timer = null
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

export {
  formateDate,
  formateContent,
  throttle
}
