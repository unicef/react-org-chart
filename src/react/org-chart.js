import { createElement } from 'react'
const { init: initialize } = require('../chart')

function NewOrgChart(props) {
  const defaultProps = {
    id: 'react-org-chart',
    downloadImageId: 'download-image',
    downloadPdfId: 'download-pdf',
    zoomInId: 'zoom-in',
    zoomOutId: 'zoom-out',
    zoomExtentId: 'zoom-extent',
    addChildText: 'add a supervisor',
    removeItemText: 'remove this item',
  }

  const {
    id,
    downloadImageId,
    downloadPdfId,
    zoomInId,
    zoomOutId,
    zoomExtentId,
    tree,
    addChildText,
    removeItemText,
    ...options
  } = {...defaultProps,...props}

  const render = () =>
    createElement('div', {
      id,
    })


  const init = () => {
    initialize({
      id: `#${id}`,
      downloadImageId: `#${downloadImageId}`,
      downloadPdfId: `#${downloadPdfId}`,
      zoomInId: zoomInId,
      zoomOutId: zoomOutId,
      zoomExtentId: zoomExtentId,
      data: tree,
      addChildText : addChildText,
      removeItemText : removeItemText,
      ...options,
    })
  }

  return {
    render,
    init,
  }
}

module.exports = NewOrgChart
