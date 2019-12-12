const d3 = require('d3')

module.exports = exportOrgChart

function exportOrgChart(nodeLeftX, nodeRightX, nodeY) {
  d3.select('#saveButton').on('click', function() {
    var w = nodeLeftX + nodeRightX
    var h = nodeY
    var ratio = 2

    document.getElementById('pngcon').querySelector('canvas')
      ? document
          .getElementById('pngcon')
          .querySelector('canvas')
          .remove()
      : ''
    var canvas1 = document.createElement('canvas')
    canvas1.id = 'canvas1'
    canvas1.width = w * ratio
    canvas1.height = h * ratio
    document.getElementById('pngcon').appendChild(canvas1)

    var svg = document.querySelector('svg')

    var step = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    step.id = 'newsvg'
    step.setAttribute('width', w)
    step.setAttribute('height', h)
    step.setAttribute('viewBox', `${-nodeLeftX} 0 ${w} ${h + 200}`)
    step.innerHTML = $('#svg').html()
    document.getElementById('cont').querySelector('svg')
      ? document
          .getElementById('cont')
          .querySelector('svg')
          .remove()
      : ''
    document.getElementById('cont').appendChild(step)
    const g = document.getElementById('cont').querySelector('g')
    g.setAttribute('transform', `translate(0,0)`)
    var html = new XMLSerializer().serializeToString(
      document.getElementById('cont').querySelector('svg')
    )

    var imgsrc = 'data:image/svg+xml;base64,' + btoa(html)

    var canvas = document.getElementById('canvas1')
    var context = canvas.getContext('2d')
    var canvasdata
    var image = new Image()
    image.src = imgsrc

    image.onload = function() {
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      canvasdata = canvas.toDataURL('image/png')
      var a = document.createElement('a')
      a.download = 'output.png'
      a.href = canvasdata
      a.click()
    }
  })
}
