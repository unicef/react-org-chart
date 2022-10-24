const d3 = require('d3')
const { wrapText, helpers, covertImageToBase64 } = require('../utils')
const renderLines = require('./renderLines')
const exportOrgChartImage = require('./exportOrgChartImage')
const exportOrgChartPdf = require('./exportOrgChartPdf')
const onClick = require('./onClick')
const iconLink = require('./components/iconLink')
const supervisorIcon = require('./components/supervisorIcon')
const CHART_NODE_CLASS = 'org-chart-node'
const PERSON_LINK_CLASS = 'org-chart-person-link'
const PERSON_NAME_CLASS = 'org-chart-person-name'
const PERSON_TITLE_CLASS = 'org-chart-person-title'
const PERSON_HIGHLIGHT = 'org-chart-person-highlight'
const PERSON_REPORTS_CLASS = 'org-chart-person-reports'
const ADD_CHILD_CLASS = 'org-chart-add-child'
const REMOVE_ITEM_CLASS = 'org-chart-remove-item'
const CIRCLE_RADIUS = 18

function render(config) {
  const {
    svgroot,
    svg,
    tree,
    animationDuration,
    nodeWidth,
    nodeHeight,
    nodePaddingX,
    nodePaddingY,
    nodeBorderRadius,
    backgroundColor,
    nameColor,
    titleColor,
    reportsColor,
    addChildColor,
    removeItemColor,
    borderColor,
    avatarWidth,
    lineDepthY,
    treeData,
    sourceNode,
    onPersonLinkClick,
    loadImage,
    downloadImageId,
    downloadPdfId,
    addChildText,
    removeItemText,
    elemWidth,
    margin,
    onConfigChange,
    onAddChild,
    onRemoveItem,
  } = config

  // Compute the new tree layout.
  const nodes = tree.nodes(treeData).reverse()
  const links = tree.links(nodes)

  config.links = links
  config.nodes = nodes

  // Normalize for fixed-depth.
  nodes.forEach(function (d) {
    d.y = d.depth * lineDepthY
  })

  // Update the nodes
  const node = svg.selectAll('g.' + CHART_NODE_CLASS).data(
    nodes.filter((d) => d.id),
    (d) => d.id
  )

  const parentNode = sourceNode || treeData

  svg.selectAll('#supervisorIcon').remove()

  supervisorIcon({
    svg: svg,
    config,
    treeData,
    x: 70,
    y: -24,
  })

  // Enter any new nodes at the parent's previous position.
  const nodeEnter = node
    .enter()
    .insert('g')
    .attr('class', CHART_NODE_CLASS)
    .attr('transform', `translate(${parentNode.x0}, ${parentNode.y0})`)
    .on('mouseover', function (d, i) {
      const addChildButton = d3.select(this).selectAll(`.${ADD_CHILD_CLASS}`)
      addChildButton
        .transition()
        .duration('300')
        .attr('r', CIRCLE_RADIUS)
        .attr('opacity', 1)

      const removeItemButton = d3
        .select(this)
        .selectAll(`.${REMOVE_ITEM_CLASS}`)
      removeItemButton
        .transition()
        .duration('300')
        .attr('r', CIRCLE_RADIUS)
        .attr('opacity', 1)
    })
    .on('mouseout', function (d, i) {
      const addChildButton = d3.select(this).selectAll(`.${ADD_CHILD_CLASS}`)
      addChildButton
        .transition()
        .duration('300')
        .attr('r', 0)
        .attr('opacity', 0)

      const removeItemButton = d3
        .select(this)
        .selectAll(`.${REMOVE_ITEM_CLASS}`)
      removeItemButton
        .transition()
        .duration('300')
        .attr('r', 0)
        .attr('opacity', 0)
    })

  // Person Card Shadow
  nodeEnter
    .append('rect')
    .attr('width', nodeWidth)
    .attr('height', nodeHeight)
    .attr('fill', backgroundColor)
    .attr('stroke', borderColor)
    .attr('rx', nodeBorderRadius)
    .attr('ry', nodeBorderRadius)
    .attr('fill-opacity', 0.05)
    .attr('stroke-opacity', 0.025)
    .attr('filter', 'url(#boxShadow)')

  // Person Card Container
  nodeEnter
    .append('rect')
    .attr('class', (d) => (d.isHighlight ? `${PERSON_HIGHLIGHT} box` : 'box'))
    .attr('width', nodeWidth)
    .attr('height', nodeHeight)
    .attr('id', (d) => d.id)
    .attr('fill', backgroundColor)
    .attr('stroke', borderColor)
    .attr('rx', nodeBorderRadius)
    .attr('ry', nodeBorderRadius)
    .style('cursor', helpers.getCursorForNode)

  const namePos = {
    x: nodeWidth / 2,
    y: nodePaddingY * 1.8 + avatarWidth,
  }

  const avatarPos = {
    x: nodeWidth / 2 - avatarWidth / 2,
    y: nodePaddingY / 2,
  }

  // Person's Name
  nodeEnter
    .append('text')
    .attr('class', PERSON_NAME_CLASS + ' unedited')
    .attr('x', namePos.x)
    .attr('y', namePos.y)
    .attr('dy', '.3em')
    .style('cursor', 'pointer')
    .style('fill', nameColor)
    .style('font-size', 14)
    .text((d) => d.person.name)
  // .on('click', onParentClick(config))

  // Person's Title
  nodeEnter
    .append('text')
    .attr('class', PERSON_TITLE_CLASS + ' unedited')
    .attr('x', nodeWidth / 2)
    .attr('y', namePos.y + nodePaddingY * 2.4)
    .attr('dy', '0.1em')
    .style('font-size', 12)
    .style('cursor', 'pointer')
    .style('fill', titleColor)
    .text((d) => d.person.title)

  const heightForTitle = 60 // getHeightForText(d.person.title)

  const widthForActionButton = 35

  // Add Child Container
  nodeEnter
    .append('rect')
    .attr('class', ADD_CHILD_CLASS)
    .attr('width', widthForActionButton)
    .attr('height', widthForActionButton)
    .attr('x', nodeWidth - widthForActionButton / 2)
    .attr('y', nodePaddingY + 12)
    .attr('rx', 18)
    .attr('ry', 18)
    .attr('fill', backgroundColor)
    .attr('opacity', 0)
    .attr('stroke', borderColor)
    .style('cursor', helpers.getCursorForNode)
    .on('mouseover', function (d, i) {
      const addChildTextElement = d3
        .select(this.parentNode)
        .select('.add-child-text')

      addChildTextElement
        .style('font-size', '14px')
        .attr('dy', '1.2em')
        .text(addChildText)

      const addChildTextWidth =
        addChildTextElement[0][0].getComputedTextLength()

      d3.select(this)
        .transition(150)
        .attr('width', addChildTextWidth + widthForActionButton / 2 + 6)
    })
    .on('mouseout', function () {
      const addChildText = d3.select(this.parentNode).select('.add-child-text')

      addChildText.style('font-size', 23).attr('dy', '.9em').text('+')

      d3.select(this).transition(150).attr('width', widthForActionButton)
    })
    .on('click', function (d, i) {
      if (onAddChild !== undefined) {
        onAddChild(d, i)
      }
    })

  // Add Child Text
  nodeEnter
    .append('text')
    .attr('class', ADD_CHILD_CLASS + ' add-child-text')
    .attr('x', nodeWidth - 6)
    .attr('y', nodePaddingY + widthForActionButton / 2)
    .attr('dy', '.9em')
    .style('font-size', 23)
    .style('font-weight', 400)
    .style('cursor', 'pointer')
    .style('fill', addChildColor)
    .style('pointer-events', 'none')
    .attr('opacity', 0)
    .text('+')

  // Remove Item Container
  nodeEnter
    .append('rect')
    .attr('class', REMOVE_ITEM_CLASS)
    .attr('width', widthForActionButton)
    .attr('height', widthForActionButton)
    .attr('x', nodeWidth - widthForActionButton / 2)
    .attr('y', nodePaddingY + widthForActionButton + 12)
    .attr('rx', 18)
    .attr('ry', 18)
    .attr('fill', backgroundColor)
    .attr('opacity', 0)
    .attr('stroke', borderColor)
    .style('cursor', helpers.getCursorForNode)
    .on('mouseover', function (d, i) {
      const removeItemTextElement = d3
        .select(this.parentNode)
        .select('.remove-item-text')

      removeItemTextElement
        .style('font-size', '14px')
        .style('font-weight', 400)
        .attr('dy', '1.2em')
        .text(removeItemText)

      const removeItemTextWidth =
        removeItemTextElement[0][0].getComputedTextLength()

      d3.select(this)
        .transition(150)
        .attr('width', removeItemTextWidth + widthForActionButton / 2 + 9)
    })
    .on('mouseout', function () {
      const removeItemText = d3
        .select(this.parentNode)
        .select('.remove-item-text')

      removeItemText
        .style('font-size', 23)
        .style('font-weight', 600)
        .attr('dy', '.9em')
        .text('-')

      d3.select(this).transition(150).attr('width', widthForActionButton)
    })
    .on('click', function (d, i) {
      if (onRemoveItem !== undefined) {
        onRemoveItem(d, i)
      }
    })

  // Remove Item Text
  nodeEnter
    .append('text')
    .attr('class', REMOVE_ITEM_CLASS + ' remove-item-text')
    .attr('x', nodeWidth - 3)
    .attr('y', nodePaddingY + widthForActionButton / 2 + widthForActionButton)
    .attr('dy', '.9em')
    .style('font-size', 23)
    .style('font-weight', 600)
    .style('cursor', 'pointer')
    .style('fill', removeItemColor)
    .style('pointer-events', 'none')
    .attr('opacity', 0)
    .text('-')

  // Person's Reports
  nodeEnter
    .append('text')
    .attr('class', PERSON_REPORTS_CLASS)
    .attr('x', nodePaddingX + 8)
    .attr('y', namePos.y + nodePaddingY + heightForTitle)
    .attr('dy', '.9em')
    .style('font-size', 14)
    .style('font-weight', 400)
    .style('cursor', 'pointer')
    .style('fill', reportsColor)
    .on('click', onClick(config))
    .text(helpers.getTextForTitle)

  // Person's Avatar
  nodeEnter
    .append('image')
    .attr('id', (d) => `image-${d.id}`)
    .attr('width', avatarWidth)
    .attr('height', avatarWidth)
    .attr('x', avatarPos.x)
    .attr('y', avatarPos.y)
    .attr('stroke', borderColor)
    .attr('s', (d) => {
      d.person.hasImage
        ? d.person.avatar
        : loadImage(d).then((res) => {
            covertImageToBase64(res, function (dataUrl) {
              d3.select(`#image-${d.id}`).attr('href', dataUrl)
              d.person.avatar = dataUrl
            })
            d.person.hasImage = true
            return d.person.avatar
          })
    })
    .attr('src', (d) => d.person.avatar)
    .attr('href', (d) => d.person.avatar)
    .attr('clip-path', 'url(#avatarClip)')

  // Person's Link
  const nodeLink = nodeEnter
    .append('a')
    .attr('class', PERSON_LINK_CLASS)
    .attr('display', (d) => (d.person.link ? '' : 'none'))
    .attr('xlink:href', (d) => d.person.link)
    .on('click', (datum) => {
      d3.event.stopPropagation()
      // TODO: fire link click handler
      if (onPersonLinkClick) {
        onPersonLinkClick(datum, d3.event)
      }
    })

  iconLink({
    svg: nodeLink,
    x: nodeWidth - 20,
    y: 8,
  })

  // Transition nodes to their new position.
  const nodeUpdate = node
    .transition()
    .duration(animationDuration)
    .attr('transform', (d) => `translate(${d.x},${d.y})`)

  nodeUpdate
    .select('rect.box')
    .attr('fill', backgroundColor)
    .attr('stroke', borderColor)

  // Transition exiting nodes to the parent's new position.
  const nodeExit = node
    .exit()
    .transition()
    .duration(animationDuration)
    .attr('transform', (d) => `translate(${parentNode.x},${parentNode.y})`)
    .remove()

  // Update the links
  const link = svg.selectAll('path.link').data(links, (d) => d.target.id)

  wrapTitleTexts(svg)

  // Render lines connecting nodes
  renderLines(config)

  // Stash the old positions for transition.
  nodes.forEach(function (d) {
    d.x0 = d.x
    d.y0 = d.y
  })

  var nodeLeftX = -70
  var nodeRightX = 70
  var nodeY = 200
  nodes.map((d) => {
    nodeLeftX = d.x < nodeLeftX ? d.x : nodeLeftX
    nodeRightX = d.x > nodeRightX ? d.x : nodeRightX
    nodeY = d.y > nodeY ? d.y : nodeY
  })

  config.nodeRightX = nodeRightX
  config.nodeY = nodeY
  config.nodeLeftX = nodeLeftX * -1

  d3.select(downloadImageId).on('click', function () {
    exportOrgChartImage(config)
  })

  d3.select(downloadPdfId).on('click', function () {
    exportOrgChartPdf(config)
  })
  onConfigChange(config)
}

export function wrapTitleTexts(svg) {
  // Wrap the title texts
  const wrapWidth = 124
  svg.selectAll('text.unedited.' + PERSON_NAME_CLASS).call(wrapText, wrapWidth)
  svg.selectAll('text.unedited.' + PERSON_TITLE_CLASS).call(wrapText, wrapWidth)
}

module.exports = {
  render,
  CHART_NODE_CLASS,
  PERSON_NAME_CLASS,
  PERSON_TITLE_CLASS,
  wrapTitleTexts
}
