const {
  PERSON_NAME_CLASS,
  PERSON_TITLE_CLASS,
  wrapTitleTexts,
  CHART_NODE_CLASS,
} = require('./render')

function update(config) {
  const { svg, tree, nodeWidth, nodePaddingY, avatarWidth, treeData } = config

  // Compute the new tree layout.
  const nodes = tree.nodes(treeData).reverse()

  const node = svg.selectAll('g.' + CHART_NODE_CLASS).data(
    nodes.filter((d) => d.id),
    (d) => d.id
  )

  const namePos = {
    x: nodeWidth / 2,
    y: nodePaddingY * 1.8 + avatarWidth,
  }

  node
    .select(`.${PERSON_NAME_CLASS}`)
    .attr('class', PERSON_NAME_CLASS + ' unedited')
    .attr('x', namePos.x)
    .attr('y', namePos.y)
    .text((d) => d.person.name)

  node
    .select(`.${PERSON_TITLE_CLASS}`)
    .attr('class', PERSON_TITLE_CLASS + ' unedited')
    .attr('x', nodeWidth / 2)
    .attr('y', namePos.y + nodePaddingY * 2.4)
    .text((d) => d.person.title)

  wrapTitleTexts(svg)
}
module.exports = update
