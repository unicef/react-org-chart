# react-org-chart by UNICEF

React component for displaying organizational charts.

This component is based on https://github.com/coreseekdev/react-org-chart. On top of it, we added a few customizations for our needs.

# Features

Original:

- High-performance D3-based SVG rendering
- Lazy-load children with a custom function
- Handle up to 1 million collapsed nodes and 5,000 expanded nodes
- Pan
- Zoom in zoom out

Added:

- Lazy-load of parents
- Zoom in and zoom out with buttons
- Download svg as image and pdf

### React Props

| **property**      | **type**   | **description**                                                           | **example**                                                        |
| ----------------- | ---------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| tree              | `Object`   | Nested data model with all of the employees in the company (Required)     | { "id": 123, "person": { "name": "Fouad Matin" }, "children": [] } |  |
| nodeWidth         | `Number`   | Width of the component for each individual (Optional)                     | 180                                                                |
| nodeHeight        | `Number`   | Height of the component for each individual (Optional)                    | 100                                                                |
| nodeSpacing       | `Number`   | Spacing between each of the nodes in the chart (Optional)                 | 12                                                                 |
| animationDuration | `Number`   | Duration of the animations in milliseconds (Optional)                     | 350                                                                |
| lineType          | `String`   | Type of line that connects the nodes to each other (Optional)             | “angle” “curve”                                                    |
| getParent         | `Function` | Load parent with one level children (Optional)                            | {children => {return Promise.resolve(parent)}}                     |
| downloadImageId   | `String`   | Download the svg as image(png) by clicking button with this id (Optional) | "download-image" (default)                                         |
| downloadPdfId     | `String`   | Download the svg as pdf by clicking button with this id (Optional)        | "download-pdf" (default)                                           |
| zoomInId          | `String`   | Handle zoom in with button (Optional)                                     | "zoom-in" (default)                                                |
| zoomOutId         | `String`   | Handle zoom out with button (Optional)                                    | "zoom-out" (default)                                               |

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

# License

Copyright 2019 UNICEF http://www.unicef.org
Developed by ICTD, Solutions Center and Support, Digital Tools and Platforms, Custom Aplications Team, New York.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
