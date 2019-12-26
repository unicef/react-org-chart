import React from 'react'
import './App.css'
import OrgChart from '@unicef/react-org-chart'

function getChild(id) {
  switch (id) {
    case 100:
      return tree1
    case 36:
      return tree2
    case 56:
      return tree3
    default:
      return console.log('no children')
  }
}

const tree = {
  id: 100,
  person: {
    id: 100,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/spbroma/128.jpg',
    department: '',
    name: 'Henry',
    title: 'Manager',
    totalReports: 1,
  },
  hasChild: true,
  hasParent: true,
  children: [],
}

const tree1 = [
  {
    id: 36,
    person: {
      id: 36,
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/spbroma/128.jpg',
      department: '',
      name: 'Tomasz',
      title: 'IT Specialist',
      totalReports: 1,
    },
    hasChild: true,
    hasParent: true,
    // children: [],
  },
]

const tree2 = [
  {
    id: 56,
    person: {
      id: 56,
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/spbroma/128.jpg',
      department: '',
      name: 'Sam John',
      title: 'HR',
      totalReports: 1,
      link: 'https://github.com/unicef/react-org-chart',
    },
    hasChild: true,
    hasParent: true,
    // children: [],
  },
  {
    id: 60,
    person: {
      id: 60,
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/spbroma/128.jpg',
      department: '',
      name: 'Ellen cott',
      title: 'CEO',
      totalReports: 0,
    },
    hasChild: false,
    hasParent: true,
    children: [],
  },
]

const tree3 = [
  {
    id: 70,
    person: {
      id: 70,
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/spbroma/128.jpg',
      department: '',
      name: 'Kenneth dom',
      title: 'CEO',
      totalReports: 0,
    },
    hasChild: false,
    hasParent: true,
    children: [],
  },
]

export default function App() {
  const treeData = tree

  return (
    <React.Fragment>
      <button id="zoom-in">+</button>
      <button id="zoom-out">-</button>
      <button id="download-image">Download as image</button>
      <button id="download-pdf">Download as PDF</button>
      <OrgChart
        tree={treeData}
        loadImage={d => {
          return Promise.resolve(
            'https://s3.amazonaws.com/uifaces/faces/twitter/spbroma/128.jpg'
          )
        }}
        loadParent={d => {
          if (d.id === 100) {
            return {
              id: 500,
              person: {
                id: 500,
                avatar:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/spbroma/128.jpg',
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
                avatar:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/spbroma/128.jpg',
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
        }}
        loadChildren={d => {
          const childrenData = getChild(d.id)
          return childrenData
        }}
      />
    </React.Fragment>
  )
}
