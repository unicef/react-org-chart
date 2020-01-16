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

  const a4Width = 3508
  const a4Height = 2480

  const svgWidth = nodeLeftX + nodeRightX
  const svgHeight = nodeY + nodeHeight + 48

  const a4Ratio = a4Width / svgWidth

  const scaleRatio = svgWidth > a4Width ? a4Ratio : 0.94
  console.log('a4Ratio ', scaleRatio)

  const width = a4Ratio * svgWidth

  let scaleX = elemWidth / svgWidth
  let scaleY = elemHeight / svgHeight
  let chooseScale = scaleX < scaleY ? scaleX : scaleY
  let scale = svgWidth > elemWidth ? chooseScale - 0.03 : 0.5
  let translateX = nodeLeftX * scale + margin.left / 2

  // var ratio = svgWidth > 3000 ? 1 : 2

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
  canvas1.width = svgWidth
  canvas1.height = svgHeight
  document.getElementById(`${id}-canvas-container`).appendChild(canvas1)

  // creating duplicate org chart svg from original org chart svg
  var step = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  step.id = 'newsvg'
  step.setAttribute('width', svgWidth)
  step.setAttribute('height', svgHeight)
  step.setAttribute(
    'viewBox',
    `${-nodeLeftX * scaleRatio} 0 ${svgWidth} ${svgHeight}`
  )
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
  g.setAttribute('transform', `translate(0, 2) scale(${scaleRatio})`)
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
    context.drawImage(image, 0, 0, svgWidth, svgHeight)
    let canvasData = canvas.toDataURL('image/jpeg,1.0')

    let pdf = new jsPDF('l', 'px', [a4Width, a4Height])
    pdf.addImage(canvasData, 'JPEG', 15, 2, svgWidth, svgHeight)
    pdf.save('Orgchart.pdf')
    downlowdedOrgChart(true)
  }
}
