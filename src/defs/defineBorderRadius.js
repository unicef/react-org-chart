const defaultConfig = {
  width: '100%',
  height: '100%',
  x: null,
  y: null,
  radius: 1
}

module.exports = function defineBorderRadius(svg, id, config = {}) {
  config = {
    ...defaultConfig,
    ...config
  }

  const defs = svg.append('svg:defs')
  const rectId = `${id}-rect`

  defs
    .append('rect')
    .attr('id', rectId)
    .attr('height', '100%')
    .attr('width', '100%')
    .attr('rx', config.radius)

  defs
    .append('clipPath')
    .attr('id', id)
    .append('use')
    .attr('xlink:href', '#' + rectId)
}
