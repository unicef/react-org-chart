import React from 'react'
import './App.css'
import OrgChart from '@unicef/react-org-chart'
import { BrowserRouter, Route } from 'react-router-dom'
import { tree } from './Tree'
import avatarPersonnel from './assets/avatar-personnel.svg'

//For downloading org chart as image or pdf based on id
const downloadImageId = 'download-image'
const downloadPdfId = 'download-pdf'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tree: tree,
      downloadingChart: false,
      config: {},
      highlightPostNumbers: [1],
    }

    this.orgChart = OrgChart({
      tree,
      downloadImageId,
      downloadPdfId,
      onConfigChange: (config) => {
        console.log('onConfigChange', config)
        this.handleOnChangeConfig(config)
      },
      onAddChild: (data, i) => {
        console.log('onAddChild', data, i)
      },
      onRemoveItem: (data, i) => {
        console.log('onRemoveItem', data, i)
      },
      loadConfig: (d) => {
        console.log('loadConfig', d)
        let configuration = this.handleLoadConfig(d)
        if (configuration) {
          return configuration
        }
      },
      downlowdedOrgChart: (d) => {
        this.handleDownload()
      },
      loadImage: (d) => {
        return Promise.resolve(avatarPersonnel)
      },
      loadParent: (d) => {
        const parentData = this.getParent(d)
        return parentData
      },
      loadChildren: (d) => {
        console.log('loadChildren', d)
        const childrenData = this.getChild(d.id)
        return childrenData
      },
      addChildText: 'add a new supervisor',
      removeItemText: 'remove this item',
    })
  }

  componentDidMount() {
    this.orgChart.init()
    // this.rerender = rerender;
  }

  getChild = (id) => {
    // switch (id) {
    //   case 100:
    //     return tree1
    //   case 36:
    //     return tree2
    //   case 56:
    //     return tree3
    //   case 25:
    //     return tree4
    //   default:
    //     return console.log('no children')
    // }
  }

  getParent = (d) => {
    if (d.id === 100) {
      return {
        id: 500,
        person: {
          id: 500,
          avatar: avatarPersonnel,
          department: '',
          name: 'Pascal ruth',
          title: 'Member',
          totalReports: 1,
        },
        hasChild: false,
        hasParent: true,
        children: [d],
      }
    } else if (d.id === 500) {
      return {
        id: 1,
        person: {
          id: 1,
          avatar: avatarPersonnel,
          department: '',
          name: 'Bryce joe',
          title: 'Director',
          totalReports: 1,
        },
        hasChild: false,
        hasParent: false,
        children: [d],
      }
    } else {
      return d
    }
  }

  handleDownload = () => {
    this.setState({ downloadingChart: false })
  }

  handleOnChangeConfig = (config) => {
    this.setState({ config: config })
  }

  handleLoadConfig = () => {
    const { config } = this.state
    return config
  }

  handleChange = () => {
    const lastConfig = { ...this.state.config }

    lastConfig.treeData.person.name = 'name changed 1'

    lastConfig.treeData.children[0].person.name = 'name changed 2'

//     lastConfig.treeData.children[0].children[2].person.name = 'title changed 3'

    this.state.config.update(lastConfig)
  }

  render() {
    const { downloadingChart } = this.state

    return (
      <BrowserRouter basename="/react-org-chart">
        <Route exact path="/">
          <React.Fragment>
            <div className="zoom-buttons">
              <button
                className="btn btn-outline-primary zoom-button"
                id="zoom-in"
              >
                +
              </button>
              <button
                className="btn btn-outline-primary zoom-button"
                id="zoom-out"
              >
                -
              </button>
              <button onClick={this.handleChange}>change it</button>
            </div>
            <div className="download-buttons">
              <button className="btn btn-outline-primary" id="download-image">
                Download as image
              </button>
              <button className="btn btn-outline-primary" id="download-pdf">
                Download as PDF
              </button>
              <a
                className="github-link"
                href="https://github.com/unicef/react-org-chart"
              >
                Github
              </a>
              {downloadingChart && <div>Downloading chart</div>}
            </div>
            {/* <OrgChart */}
            {/*   tree={tree} */}
            {/*   downloadImageId={downloadImageId} */}
            {/*   downloadPdfId={downloadPdfId} */}
            {/*   onConfigChange={(config) => { */}
            {/*     this.handleOnChangeConfig(config) */}
            {/*   }} */}
            {/*   loadConfig={(d) => { */}
            {/*     let configuration = this.handleLoadConfig(d) */}
            {/*     if (configuration) { */}
            {/*       return configuration */}
            {/*     } */}
            {/*   }} */}
            {/*   downlowdedOrgChart={(d) => { */}
            {/*     this.handleDownload() */}
            {/*   }} */}
            {/*   loadImage={(d) => { */}
            {/*     return Promise.resolve(avatarPersonnel) */}
            {/*   }} */}
            {/*   loadParent={(d) => { */}
            {/*     const parentData = this.getParent(d) */}
            {/*     return parentData */}
            {/*   }} */}
            {/*   loadChildren={(d) => { */}
            {/*     const childrenData = this.getChild(d.id) */}
            {/*     return childrenData */}
            {/*   }} */}
            {/* /> */}
            {this.orgChart.render()}
          </React.Fragment>
        </Route>
      </BrowserRouter>
    )
  }
}
