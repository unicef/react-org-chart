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
    nodeHeight,
    margin,
  } = config

  // a4 width and heigth for landscape
  const a4Width = 3508
  const a4Height = 2480

  // svg width and height
  const svgWidth = nodeLeftX + nodeRightX
  const svgHeight = nodeY + nodeHeight + 48

  // calculating ratio for better quality if the svgWidth is less than a4Width
  const ratio = svgWidth > a4Width ? 1 : 2

  const widthWithRatio = svgWidth > a4Width ? svgWidth : svgWidth * ratio
  const heightWithRatio = svgWidth > a4Width ? svgHeight : svgHeight * ratio

  const defaultScale = svgWidth > 600 ? 0.87 : 0.6

  // scale
  const scaleX = a4Width / widthWithRatio
  const scaleY = a4Height / heightWithRatio
  const chooseScale = scaleX < scaleY ? scaleX : scaleY
  const scale = widthWithRatio > a4Width ? chooseScale - 0.04 : defaultScale
  const translateX = nodeLeftX * scale + margin.left / 2

  // Final width and height
  const width = widthWithRatio * 0.85
  const height = heightWithRatio * 0.85

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
  step.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`)
  step.innerHTML = document.getElementById('svg').innerHTML

  document.getElementById(`${id}-svg-container`).querySelector('svg')
    ? document
        .getElementById(`${id}-svg-container`)
        .querySelector('svg')
        .remove()
    : ''
  document.getElementById(`${id}-svg-container`).appendChild(step)

  // appending g element from svg
  var g = document.getElementById(`${id}-svg-container`).querySelector('g')
  g.setAttribute('transform', `translate(${translateX}, 2) scale(${scale})`)
  var html = new XMLSerializer().serializeToString(
    document.getElementById(`${id}-svg-container`).querySelector('svg')
  )

  // generating image with base 64
  const imgSrc = 'data:image/svg+xml;base64,' + btoa(html)
  const canvas = document.getElementById('canvas1')
  const context = canvas.getContext('2d')
  const image = new Image()
  image.src = imgSrc

  // downloading the image
  image.onload = function() {
    context.drawImage(image, 0, 0, width, height)
    const canvasData = canvas.toDataURL('image/jpeg,1.0')

    const pdf = new jsPDF('l', 'px', [a4Width, a4Height])
    pdf.addImage(canvasData, 'JPEG', 15, 2, width, height)
    pdf.save('Orgchart.pdf')
    downlowdedOrgChart(true)
  }
}
