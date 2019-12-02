const d3 = require('d3')

// One way of achieving text-wrapping capability in SVG
module.exports = function wrapText(text, width) {
  if (text.length === 0) {
    return ''
  }

  let editedClass = ''

  text[0].forEach(textNode => {
    const text = d3.select(textNode)
    const x = text.attr('x')
    const y = text.attr('y')
    const dy = parseFloat(text.attr('dy'))
    const lineHeight = 1.1
    const words = text
      .text()
      .split(/\s+/)
      .reverse()

    let lineNumber = 0
    let word
    let line = []
    let tspan = text
      .text(null)
      .append('tspan')
      .style('text-anchor', 'middle')
      .attr('x', x)
      .attr('y', y)
      .attr('dy', dy + 'em')

    while ((word = words.pop())) {
      line.push(word)
      tspan.text(line.join(' '))

      if (tspan.node().getComputedTextLength() > width) {
        line.pop()
        tspan.text(line.join(' '))
        line = [word]
        tspan = text
          .append('tspan')
          .style('text-anchor', 'middle')
          .attr('x', x)
          .attr('y', y)
          .attr('dy', ++lineNumber * lineHeight + dy + 'em')
          .text(word)
      }
    }

    if (!editedClass) {
      editedClass = text.attr('class').replace(' unedited', '')
    }

    text.attr('class', editedClass)
  })
}
