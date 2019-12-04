const d3 = require('d3')
const { collapse } = require('../utils')

module.exports = renderImage

function renderImage(config = {}, d) {
  const { treeData, loadChildren, loadImage, render, onPersonClick } = config
  // console.log('yes it is called again')

  return loadImage(d)
}
