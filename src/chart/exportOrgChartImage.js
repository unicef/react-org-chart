const d3 = require('d3')

module.exports = exportOrgChartImage

function exportOrgChartImage({ loadConfig }) {
  const config = loadConfig()
  const { id, downlowdedOrgChart, nodeLeftX, nodeRightX, nodeY } = config
  var w = nodeLeftX + nodeRightX
  var h = nodeY
  var ratio = w > 9000 ? 1 : 2

  // checking wether it has canvas in the convas-container div
  document.getElementById(`${id}-canvas-container`).querySelector('canvas')
    ? document
        .getElementById(`${id}-canvas-container`)
        .querySelector('canvas')
        .remove()
    : ''

  // creating a canvas element
  var canvas1 = document.createElement('canvas')
  canvas1.id = 'canvas1'
  canvas1.width = w * ratio
  canvas1.height = h * ratio
  document.getElementById(`${id}-canvas-container`).appendChild(canvas1)

  // creating duplicate org chart svg from original org chart svg
  var step = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  step.id = 'newsvg'
  step.setAttribute('width', w)
  step.setAttribute('height', h)
  step.setAttribute('viewBox', `${-nodeLeftX} 0 ${w} ${h + 200}`)
  step.innerHTML = document.getElementById('svg').innerHTML

  document.getElementById(`${id}-svg-container`).querySelector('svg')
    ? document
        .getElementById(`${id}-svg-container`)
        .querySelector('svg')
        .remove()
    : ''
  document.getElementById(`${id}-svg-container`).appendChild(step)

  // appending g element from svg
  const g = document.getElementById(`${id}-svg-container`).querySelector('g')
  g.setAttribute('transform', `translate(0,0)`)
  var html = new XMLSerializer().serializeToString(
    document.getElementById(`${id}-svg-container`).querySelector('svg')
  )

  // generating image with base 64
  var imgSrc = 'data:image/svg+xml;base64,' + btoa(html)
  let canvas = document.getElementById('canvas1')
  let context = canvas.getContext('2d')
  let image = new Image()
  image.src = imgSrc

  // downloading the image
  image.onload = function() {
    context.drawImage(image, 0, 0, canvas.width, canvas.height)
    canvas.toBlob(function(blob) {
      let a = document.createElement('a')
      let url = URL.createObjectURL(blob)
      a.download = 'orgchart.jpg'
      a.href = url
      a.click()
    })
    downlowdedOrgChart(true)
  }
}
