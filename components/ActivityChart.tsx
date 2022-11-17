import moment from 'moment'
import React from 'react'
import ReactTooltip from 'react-tooltip'
import { CodersRankActivities } from '../types/types'
import { lerpColor } from '../utils/colorUtils'

type Props = {
  chartData: CodersRankActivities
}

export default function ActivityChart({ chartData }: Props) {
  const first = moment(Date.now()).subtract(1, 'year')

  first.format('YYYY-MM-DD')

  const maxVal = Math.max(...Object.values(chartData).map((x) => Object.values(x)[0]))
  const total = Object.values(chartData).reduce((acc, cur) => acc + Object.values(cur)[0], 0)

  const rectSize = 12

  const weeks = []
  let days = []

  for (let i = 0; i < 365; i++) {
    const date = first.add(1, 'day').format('YYYY-MM-DD')
    const value = (chartData[date] ? Object.values(chartData[date])[0] || 0 : 0)

    days.push(
      <rect
        key={date}
        x={0}
        y={(i % 7) * (rectSize + 2)}
        rx={2}
        width={rectSize}
        height={rectSize}
        fill={lerpColor('#434d57', '#ff7ef9', value / maxVal)}
        data-tip={`${first.format('DD/MM/YYYY')} - <b>${value} activities</b>`}
      />
    )

    if (days.length === 7) {
      weeks.push(
        <g key={date} transform={`translate(${weeks.length * (rectSize + 2)}, 0)`}>
          {days}
        </g>
      )
      days = []
    }
  }

  weeks.push(
    <g key={weeks.length} transform={`translate(${weeks.length * (rectSize + 2)}, 0)`}>
      {days}
    </g>
  )

  return (
    <div className=''>
      <h1 className='pb-1 tracking-wide'><span className='font-semibold'>{total} activites</span> in the last year</h1>
      <svg width={(rectSize + 2) * 53} height={(rectSize + 2) * 7}>
        {weeks}
      </svg>
    </div>
  )
}