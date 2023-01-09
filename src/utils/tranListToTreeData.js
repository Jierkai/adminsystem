export function tranListToTreeData(list, rootValue) {
  const arr = []
  list.forEach(i => {
    if (i.pid === rootValue) {
      const children = tranListToTreeData(list, i.id)
      if (children.length) {
        i.children = children
      }
      arr.push(i)
    }
  })

  return arr
}
