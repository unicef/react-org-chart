const { createElement, PureComponent } = require('react')
const { init } = require('../chart')

class OrgChart extends PureComponent {
  render() {
    const { id } = this.props

    return createElement('div', {
      id,
    })
  }

  static defaultProps = {
    id: 'react-org-chart',
    downloadImageId: 'download-image',
    downloadPdfId: 'download-pdf',
    zoomInId: 'zoom-in',
    zoomOutId: 'zoom-out',
  }

  componentDidMount() {
    const {
      id,
      downloadImageId,
      downloadPdfId,
      zoomInId,
      zoomOutId,
      tree,
      ...options
    } = this.props

    init({
      id: `#${id}`,
      downloadImageId: `#${downloadImageId}`,
      downloadPdfId: `#${downloadPdfId}`,
      zoomInId: zoomInId,
      zoomOutId: zoomOutId,
      data: tree,
      ...options,
    })
  }
}

module.exports = OrgChart
