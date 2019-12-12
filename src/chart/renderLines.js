const d3 = require('d3')

module.exports = renderLines

function renderLines(config = {}) {
  const {
    svg,
    links,
    margin,
    nodeWidth,
    nodeHeight,
    borderColor,
    sourceNode,
    treeData,
    lineType,
    animationDuration,
  } = config

  const parentNode = sourceNode || treeData

  // Select all the links to render the lines
  const link = svg.selectAll('path.link').data(
    links.filter(link => link.source.id),
    d => d.target.id
  )

  // Define the curved line function
  const curve = d3.svg
    .diagonal()
    .projection(d => [d.x + nodeWidth / 2, d.y + nodeHeight / 2])

  // Define the angled line function
  const angle = d3.svg
    .line()
    .x(d => d.x)
    .y(d => d.y)
    .interpolate('linear')

  if (lineType === 'angle') {
    // Enter any new links at the parent's previous position.
    link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#A9A9A9')
      .attr('stroke-opacity', 1)
      .attr('stroke-width', 1.25)
      .attr('d', d => {
        const linePoints = [
          {
            x: d.source.x0 + parseInt(nodeWidth / 2),
            y: d.source.y0 + nodeHeight + 2,
          },
          {
            x: d.source.x0 + parseInt(nodeWidth / 2),
            y: d.source.y0 + nodeHeight + 2,
          },
          {
            x: d.source.x0 + parseInt(nodeWidth / 2),
            y: d.source.y0 + nodeHeight + 2,
          },
          {
            x: d.source.x0 + parseInt(nodeWidth / 2),
            y: d.source.y0 + nodeHeight + 2,
          },
        ]

        return angle(linePoints)
      })

    // Transition links to their new position.
    link
      .transition()
      .duration(animationDuration)
      .attr('d', d => {
        const linePoints = [
          {
            x: d.source.x + parseInt(nodeWidth / 2),
            y: d.source.y + nodeHeight,
          },
          {
            x: d.source.x + parseInt(nodeWidth / 2),
            y: d.target.y - margin.top / 2,
          },
          {
            x: d.target.x + parseInt(nodeWidth / 2),
            y: d.target.y - margin.top / 2,
          },
          {
            x: d.target.x + parseInt(nodeWidth / 2),
            y: d.target.y,
          },
        ]

        return angle(linePoints)
      })

    // Animate the existing links to the parent's new position
    link
      .exit()
      .transition()
      .duration(animationDuration)
      .attr('d', d => {
        const lineNode = config.callerNode ? config.callerNode : parentNode
        const linePoints = [
          {
            x: lineNode.x + parseInt(nodeWidth / 2),
            y: lineNode.y + nodeHeight + 2,
          },
          {
            x: lineNode.x + parseInt(nodeWidth / 2),
            y: lineNode.y + nodeHeight + 2,
          },
          {
            x: lineNode.x + parseInt(nodeWidth / 2),
            y: lineNode.y + nodeHeight + 2,
          },
          {
            x: lineNode.x + parseInt(nodeWidth / 2),
            y: lineNode.y + nodeHeight + 2,
          },
        ]

        return angle(linePoints)
      })
      .each('end', () => {
        config.callerNode = null
      })
  } else if (lineType === 'curve') {
    link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .attr('stroke', borderColor)
      .attr('fill', 'none')
      .attr('x', nodeWidth / 2)
      .attr('y', nodeHeight / 2)
      .attr('d', d => {
        const source = {
          x: parentNode.x0,
          y: parentNode.y0,
        }

        return curve({
          source,
          target: source,
        })
      })

    // Transition links to their new position.
    link
      .transition()
      .duration(animationDuration)
      .attr('d', curve)

    // Transition exiting nodes to the parent's new position.
    link
      .exit()
      .transition()
      .duration(animationDuration)
      .attr('d', function(d) {
        const source = {
          x: parentNode.x,
          y: parentNode.y,
        }
        return curve({
          source,
          target: source,
        })
      })
      .remove()
  }
}
