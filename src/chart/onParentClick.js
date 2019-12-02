module.exports = onParentClick

function onParentClick(config = {}, children) {
  const { treeData, getParent, render } = config
  const result = getParent(treeData)

  if (result.then) {
    return result.then(handler)
  } else {
    return handler(result)
  }

  function handler(result) {
    // console.log(result)
    const currentNodeId = treeData.id

    const tree = result.children
  }

  // Check if the result is a promise and render the children
}
