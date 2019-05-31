var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')

module.exports = createReactClass({
  render () {
    const reduce = (row, memo) => {

      memo.displays = row.type === 'display' ? (memo.displays || 0) + 1 : memo.displays
      memo.impressions = row.type === 'impression' ? (memo.impressions || 0) + 1 : memo.impressions
      memo.loads = row.type === 'load' ? (memo.loads || 0) + 1 : memo.loads
      memo.loadRate = memo.loads / memo.impressions
      memo.displayRate = memo.displays / memo.loads
      return memo
    }

    const calculations = [
      {
        title: 'Impression',
        value: 'impressions',
        template: (val) => {
          return val
        },
        sortBy: (row) => {
          return isNaN(row.impressions) ? 0 : row.impressions
        }
      },
      {
        title: 'Loads',
        value: 'loads',
        template: (val) => {
          return val
        },
        sortBy: (row) => {
          return isNaN(row.loads) ? 0 : row.loads
        }
      },
      {
        title: 'Displays',
        value: 'displays',
        template: (val) => {
          return val
        },
        sortBy: (row) => {
          return isNaN(row.displays) ? 0 : row.displays
        }
      },
      {
        title: 'Load Rate',
        value: 'loadRate',
        template: (val) => {
          return (val * 100).toFixed(1) + '%'
        },
        sortBy: (row) => {
          return isNaN(row.loadRate) ? 0 : row.loadRate
        }
      },
      {
        title: 'Display Rate',
        value: 'displayRate',
        template: (val) => {
          return (val * 100).toFixed(1) + '%'
        },
        sortBy: (row) => {
          return isNaN(row.displayRate) ? 0 : row.displayRate
        }
      }
    ]

    return (
      <div>
        Report
        <ReactPivot
          rows={rows}
          reduce={reduce}
          calculations={calculations}
          dimensions={[
            {
              title: 'Date',
              value: 'date'
            },
            {
              title: 'Host',
              value: 'host'
            }
          ]}
        />
      </div>
    )
  }
})
