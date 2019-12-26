module.exports = onParentClick

function onParentClick(configOnClick, children) {
  event.preventDefault()

  const { loadConfig } = configOnClick
  const config = loadConfig()
  const { loadParent } = config

  // If this person have `hasParent` is true,
  // attempt to load using the `loadParent` config function
  if (children.hasParent) {
    if (!loadParent) {
      console.error('react-org-chart.onClick: loadParent() not found in config')
      return
    }

    const result = loadParent(children)
    const handler = handleResult(config, children)

    // Check if the result is a promise and render the children
    if (result.then) {
      return result.then(handler)
    } else {
      return handler(result)
    }
  }
}

function handleResult(config, d) {
  const { render } = config

  return datum => {
    const children = datum.children.map(item => {
      if (item.id === d.id) {
        return { ...item, ...d }
      } else {
        return item
      }
    })

    const result = { ...datum, children }

    // Pass in the newly rendered datum as the sourceNode
    // which tells the child nodes where to animate in from
    render({
      ...config,
      treeData: { ...result, children, _children: null },
      sourceNode: result,
    })
  }
}
