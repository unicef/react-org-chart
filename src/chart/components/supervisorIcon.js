const onParentClick = require('../onParentClick')
// {
//   <svg width="33" height="47" viewBox="0 0 33 47" xmlns="http://www.w3.org/2000/svg">
//     <g transform="translate(1 1)" fill="none" fill-rule="evenodd">
//       <circle stroke="#C9C9C9" fill="#FFF" cx="15.5" cy="15.5" r="15.5"/><path d="M15.5 45V31.5" stroke="#C9C9C9" stroke-linecap=""/>
//       <circle stroke="#979797" fill="#9C9C9C" cx="9" cy="16" r="2"/>
//       <circle stroke="#979797" fill="#9C9C9C" cx="15.5" cy="16" r="2"/>
//       <circle stroke="#979797" fill="#9C9C9C" cx="22" cy="16" r="2"/></g></svg>

// }
module.exports = function supervisorIcon({
  svg,
  config,
  treeData,
  x = 5,
  y = 5,
}) {
  const container = svg
    .append('g')
    .attr('id', 'supervisorIcon')
    .on('click', d => {
      if (d3.event.defaultPrevented) return
      onParentClick(config, treeData)
    })
    .attr('stroke', 'none')
    .attr('fill', 'none')
    .style('display', treeData.hasParent ? '' : 'none')
    .style('cursor', 'pointer')
    .append('g')

  const icon = container
    .append('g')
    .attr('id', 'icon')
    .attr('fill', 'none')
    .attr('fill-rule', 'evenodd')
    .attr('transform', `translate(51.5, -46)`)

  icon
    .append('circle')
    .attr('id', 'icon')
    .attr('stroke', '#C9C9C9')
    .attr('fill', '#FFF')
    .attr('cx', 15.5)
    .attr('cy', 15.5)
    .attr('r', 15.5)

  icon
    .append('path')
    .attr('stroke', '#C9C9C9')
    .attr('stroke-linecap', 'square')
    .attr('d', 'M15.5 45V31.5')

  icon
    .append('circle')
    .attr('id', 'icon')
    .attr('stroke', '#979797')
    .attr('fill', '#9C9C9C')
    .attr('cx', 9)
    .attr('cy', 16)
    .attr('r', 2)

  icon
    .append('circle')
    .attr('id', 'icon')
    .attr('stroke', '#979797')
    .attr('fill', '#9C9C9C')
    .attr('cx', 15.5)
    .attr('cy', 16)
    .attr('r', 2)

  icon
    .append('circle')
    .attr('id', 'icon')
    .attr('stroke', '#979797')
    .attr('fill', '#9C9C9C')
    .attr('cx', 22)
    .attr('cy', 16)
    .attr('r', 2)

  icon
    .append('rect')
    .attr('id', 'bounds')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 33)
    .attr('height', 47)
    .attr('fill', 'transparent')
}
