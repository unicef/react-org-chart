module.exports = function collapseNode(node) {
  // Check if this node has children
  if (node.children) {
    node._children = node.children
    node._children.forEach(collapseNode)
    node.children = null
  }
}
