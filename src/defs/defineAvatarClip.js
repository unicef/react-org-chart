const defaultConfig = {
  borderRadius: 4,
}

module.exports = function defineAvatarClip(svg, id, config = {}) {
  config = {
    ...defaultConfig,
    ...config,
  }

  const defs = svg.append('svg:defs')

  defs
    .append('clipPath')
    .attr('id', id)
    .append('circle')
    .attr('cx', 70)
    .attr('cy', 32)
    .attr('r', 24)
}
