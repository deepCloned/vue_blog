const dateFilter = function (dateStr) {
  if (!dateStr) {
    return '0000-00-00'
  }
  return dateStr.split('T')[0]
}

export {
  dateFilter
}
