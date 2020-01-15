const jsPDF = require('jspdf')

module.exports = exportOrgChartPdf

function exportOrgChartPdf({ loadConfig }) {
  const config = loadConfig()
  const {
    id,
    downlowdedOrgChart,
    nodeLeftX,
    nodeRightX,
    nodeY,
    elemHeight,
    elemWidth,
    nodeHeight,
    margin,
  } = config


  const svgWidth = nodeLeftX + nodeRightX
  const svgHeight = nodeY + nodeHeight + 48
  let scaleX = elemWidth / svgWidth
  let scaleY = elemHeight / svgHeight
  let chooseScale = scaleX < scaleY ? scaleX : scaleY
  let scale = svgWidth > elemWidth ? chooseScale - 0.03 : 0.5
  let translateX = nodeLeftX * scale + margin.left / 2

  var ratio = svgWidth > 3000 ? 1 : 2
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
  canvas1.width = svgWidth * ratio
  canvas1.height = svgHeight * ratio
  document.getElementById(`${id}-canvas-container`).appendChild(canvas1)

  // creating duplicate org chart svg from original org chart svg
  var step = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  step.id = 'newsvg'
  step.setAttribute('width', svgWidth)
  step.setAttribute('height', svgHeight)
  step.setAttribute('viewBox', `${-translateX} 0 ${svgWidth} ${svgHeight}`)
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
  g.setAttribute('transform', `translate(0, 2) scale(${scale})`)
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
  image.onload = function () {
    context.drawImage(image, 0, 0, canvas.width, canvas.height)
    let canvasData = canvas.toDataURL('image/jpeg,1.0')

    let pdf = new jsPDF('l', 'px', [svgWidth, 2050])
    pdf.addImage(canvasData, 'JPEG', 15, 2, canvas.width * scale, canvas.height)
    pdf.save('Orgchart.pdf')
    downlowdedOrgChart(true)
  }
}
