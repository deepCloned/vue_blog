const dateFilter = function (dateStr) {
  if (!dateStr) {
    return '0000-00-00'
  }
  const arr = dateStr.split('T')
  return arr[0]
}

export {
  dateFilter
}
