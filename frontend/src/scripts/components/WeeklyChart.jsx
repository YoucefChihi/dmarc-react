import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { html as bars } from '@redsift/d3-rs-bars'
import d3Wrap from '../libs/d3Wrap';
import { select } from 'd3-selection'

const WeeklyD3Chart = d3Wrap({
  initialize: (node, data) => {
    const chart = bars()
      .orientation('bottom')
    const datum = Object
      .entries(data)
      .map(entry => {
        const [key, count] = entry
        const [week, year] = key.split('#')
        return {
          l: `Week ${week}`,
          v: count
        }
      })
    select(node)
      .datum(datum)
      .call(chart)
  }
})

const Weekly = ({t, data}) => {
  return <div className="chart-wrapper">
    <h3>{t ('app:weekly')}</h3>
    <WeeklyD3Chart data={data} />
  </div>
}

Weekly.prototypes = {
  t: PropTypes.function,
  data: PropTypes.any
}

export default translate (['app'], {wait: true}) (Weekly)