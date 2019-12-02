const defaultConfig = {
  width: '150%',
  height: '150%',
  x: 0,
  y: 2,
  blurRadius: 1,
}

module.exports = function defineBoxShadow(svg, id, config = {}) {
  config = {
    ...defaultConfig,
    ...config,
  }

  const filter = svg
    .append('svg:defs')
    .append('svg:filter')
    .attr('id', id)
    .attr('height', '150%')
    .attr('width', '150%')

  filter
    .append('svg:feGaussianBlur')
    .attr('in', 'SourceAlpha')
    .attr('stdDeviation', config.blurRadius) // stdDeviation is how much to blur
    .attr('result', 'blurOut')

  filter
    .append('svg:feOffset')
    .attr('in', 'blurOut')
    .attr('dx', config.x)
    .attr('dy', config.y)
    .attr('result', 'offsetOut') // how much to offset

  const feMerge = filter.append('feMerge')

  feMerge.append('feMergeNode').attr('in', 'offsetOut')
  feMerge.append('feMergeNode').attr('in', 'SourceGraphic')
}
