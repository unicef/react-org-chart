# React Organizational Chart
[![npm version](https://badge.fury.io/js/%40unicef%2Freact-org-chart.svg)](https://badge.fury.io/js/%40unicef%2Freact-org-chart)

React component for displaying organizational charts.

This component is based on [coreseekdev/react-org-chart](https://github.com/coreseekdev/react-org-chart). On top of it, we added a few customization to fulfill our requirements.

### [View demo](https://unicef.github.io/react-org-chart/)


# Features

From the original package:

- High-performance D3-based SVG rendering
- Lazy-load children with a custom function
- Handle up to 1 million collapsed nodes and 5,000 expanded nodes
- Pan (drag and drop)
- Zoom in zoom out (with mouse wheel/scroll)

What we added:

- Lazy-load of parents (go up in the tree)
- Zoom in, zoom out and zoom buttons.
- Download orgchart as image or PDF

### React Props

| **property**      | **type**   | **description**                                                           | **example**                                                        |
| ----------------- | ---------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| tree              | `Object`   | Nested data model with some of all the employees in the company (Required)     | See sample below. |
| nodeWidth         | `Number`   | Width of the component for each individual (Optional)                     | 180                                                                |
| nodeHeight        | `Number`   | Height of the component for each individual (Optional)                    | 100                                                                |
| nodeSpacing       | `Number`   | Spacing between each of the nodes in the chart (Optional)                 | 12                                                                 |
| animationDuration | `Number`   | Duration of the animations in milliseconds (Optional)                     | 350                                                                |
| lineType          | `String`   | Type of line that connects the nodes to each other (Optional)             | “angle” “curve”                                                    |
| downloadImageId   | `String`   | Id of the DOM element that, on click, will trigger the download of the org chart as PNG. OrgChart will bind the click event to the DOM element with this ID (Optional) | "download-image" (default)                                         |
| downloadPdfId     | `String`   | Id of the DOM element that, on click, will trigger the download of the org chart as PDF. OrgChart will bind the click event to the DOM element with this ID (Optional)  (Optional)        | "download-pdf" (default)                                           |
| zoomInId          | `String`   | Id of the DOM element that, on click, will trigger a zoom of the org chart. OrgChart will bind the click event to the DOM element with this ID (Optional)  (Optional)                                     | "zoom-in" (default)                                                |
| zoomOutId         | `String`   | Id of the DOM element that, on click, will trigger the zoom out of the org chart. OrgChart will bind the click event to the DOM element with this ID (Optional)                                  | "zoom-out" (default)                                               |
| zoomExtentId      | `String`   | Id of the DOM element that, on click, will display whole org chart svg fit to screen. OrgChart will bind the click event to the DOM element with this ID(Optional)                              | "zoom-extent" (default)                                            |
| loadParent(personData)        | `Function` | Load parent with one level of children (Optional)                         | See usage below                                                  |
| loadChildren (personData)      | `Function` | Load the children of particular node (Optional)                           | See usage below                                                  |
| onConfigChange    | `Function` | To set the latest config to state on change                               | See usage below                                                  |
| loadConfig        | `Function` | Pass latest config from state to OrgChart                                    | See usage below                                                  |
| loadImage(personData)         | `Function` | To get image of person on API call (Optional)                             | See usage below                                                  |



### Sample tree data

```jsx

{
  id: 1,
  person: {
    id: 1,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/spbroma/128.jpg',
    department: '',
    name: 'Jane Doe',
    title: 'CEO',
    totalReports: 5
  },
  hasChild: true,
  hasParent: false,
  isHighlight: true,
  children: [
    {
    id: 2,
    person: {
      id: 2,
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/spbroma/128.jpg',
      department: '',
      name: 'John Foo',
      title: 'CTO',
      totalReports: 0
    },
    hasChild: false,
    hasParent: true,
    isHighlight: false,
    children: []
  },
  ...
  ]
}

```

### Usage

You have a complete working example in the **[examples/](https://github.com/unicef/react-org-chart/tree/master/examples)** folder 

```jsx
import React from 'react'
import OrgChart from '@unicef/react-org-chart'

handleLoadConfig = () => {
   const { config } = this.state
   return config
}

render(){
  return (
    <OrgChart
      tree={tree}
      downloadImageId="download-image"
      downloadPdfId="download-pdf"
      onConfigChange={config => {
        // Setting latest config to state
        this.setState({ config: config })
      }}
      loadConfig={d => {
         // Called from d3 to get latest version of the config. 
        const config = this.handleLoadConfig(d)
        return config
      }}
      loadParent={personData => {
        // getParentData(): To get the parent data from API
        const loadedParent = this.getParentData(personData)
        return Promise.resolve(loadedParent)
      }}
      loadChildren={personData => {
        // getChildrenData(): To get the children data from API
        const loadedChildren = this.getChildrenData(personData)
        return Promise.resolve(loadedChildren)
      }}
      loadImage={personData => {
        // getImage(): To get the image from API
        const image = getImage(personData.email)
        return Promise.resolve(image)
      }}
    />
  )
}
```


# Development

```bash
git clone https://github.com/unicef/react-org-chart.git
cd react-org-chart
npm install
```

To build in watch mode:

```bash
npm start
```

To build for production

```bash
npm run build
```

Running the example:

```bash
cd example/
npm install # Only first time
npm start
```

To deploy the example to gh-pages site

```bash
npm run deploy
```

## About UNICEF

[UNICEF](https://www.unicef.org/) works in over 190 countries and territories to protect the rights of every child. UNICEF has spent more than 70 years working to improve the lives of children and their families. In UNICEF, we **believe all children have a right to survive, thrive and fulfill their potential – to the benefit of a better world**.

[Donate](https://donate.unicef.org/donate/now)


## Collaborations and support

Just fork the project and make a pull request. You may also [consider donating](https://donate.unicef.org/donate/now).


# License

Copyright 2019-2020 UNICEF http://www.unicef.org
Developed by ICTD, Solutions Center and Support, Digital Tools and Platforms, Custom Applications Team, New York.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
