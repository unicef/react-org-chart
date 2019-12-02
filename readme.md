# react-org-chart

### Features

- High-performance D3-based SVG rendering
- Lazy-load children with a custom function
- Handle up to 1 million collapsed nodes and 5,000 expanded nodes

### React Props

| **property**      | **type** | **description**                                                                    | **example**                                                                    |
| ----------------- | -------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| tree              | `Object` | Nested data model with all of the employees in the company (Required)              | { "id": 123, "person": { "name": "Fouad Matin" }, "children": [] } |                                                                 |
| nodeWidth         | `Number` | Width of the component for each individual (Optional)                              | 180                                                                            |
| nodeHeight        | `Number` | Height of the component for each individual (Optional)                             | 100                                                                             |
| nodeSpacing       | `Number` | Spacing between each of the nodes in the chart (Optional)                             | 12                                                                             |
| animationDuration | `Number` | Duration of the animations in milliseconds (Optional)                              | 350                                                                            |
| lineType          | `String` | Type of line that connects the nodes to each other (Optional)                      | “angle” “curve” 
