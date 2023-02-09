function removeItemObserve(data) {
  Object.keys(data).forEach(i => {
    data[i] = data[i] instanceof Object ? removeItemObserve(data[i]) : data[i]
  })
  return Object.freeze(data)
}

function removeOberver(data, isDeep = false) {
  if (!data) return data
  if (isDeep) {
    return removeItemObserve(data)
  } else {
    return Object.freeze(data)
  }
}

export default removeOberver
