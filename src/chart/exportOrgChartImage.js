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

  // generating image with base 64
  var serializer = new XMLSerializer()
  var source = serializer.serializeToString(svg)

  //add name spaces.
  if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"')
  }
  if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
    source = source.replace(
      /^<svg/,
      '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
    )
  }

  //add xml declaration
  source = '<?xml version="1.0" standalone="no"?>\r\n' + source

  //convert svg source to URI data scheme.
  var url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source)

  var a = document.createElement('a')
  a.download = 'orgchart.svg'
  a.href = url
  a.click()

  downlowdedOrgChart(true)
}
