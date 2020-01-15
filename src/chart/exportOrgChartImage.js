var d3SaveSvg = require("d3-save-svg")

module.exports = exportOrgChartImage

function exportOrgChartImage({ loadConfig }) {
  const config = loadConfig()
  const { id, downlowdedOrgChart, nodeLeftX, nodeRightX, nodeY } = config
  var w = nodeLeftX + nodeRightX
  var h = nodeY

  // creating duplicate org chart svg from original org chart svg
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.id = 'newsvg'
  svg.setAttribute('width', w)
  svg.setAttribute('height', h)
  svg.setAttribute('viewBox', `${-nodeLeftX} 0 ${w} ${h + 200}`)
  svg.innerHTML = document.getElementById('svg').innerHTML

  document.getElementById(`${id}-svg-container`).querySelector('svg')
    ? document
      .getElementById('#react-org-chart-svg-container')
      .querySelector('svg')
      .remove()
    : ''
  document.getElementById(`${id}-svg-container`).appendChild(svg)

  // appending g element from svg
  var g = document.getElementById(`${id}-svg-container`).querySelector('g')
  g.setAttribute('transform', `translate(0,0)`)

  var d3SaveSvgConfig = {
    filename: 'orgchart',
  }

  d3SaveSvg.save(d3.select('#newsvg').node(), d3SaveSvgConfig);

  downlowdedOrgChart(true)
}