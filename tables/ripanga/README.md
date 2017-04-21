# Ripanga

A table component with self-managed checkboxes, sticky head, sticky right panel, and horizontal scroll widget.

# Change Log

##### 1.2.1
- Configure sorting features through props
```
<Table
  sorting: {
    direction: (columnDefintion) => 'desc' | 'asc' | false,
    change: (columDefinition) => return void
  }
/>
```
##### 1.0.8, 1.0.9

- Implemented prod builds

##### 1.0.7
- `renderEmpty()` method added for empty state

##### 1.0.6
- Implemented Webpack 2.2.1

##### 1.0.5
- Minor Webpack optimizations

##### 1.0.4
- _Experimental; no significant changes_

##### 1.0.3
- Return to page 1 on sort

##### 1.0.2
- Caret styles consolidated
- Removed `ripanga-` prefix on styles

##### 1.0.1
- Debugging URL construction

##### 1.0.0
- Initial commit
