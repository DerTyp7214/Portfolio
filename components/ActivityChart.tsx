import moment from 'moment'
import { CodersRankActivities } from '../types/types'
import { lerpColor } from '../utils/colorUtils'

type Props = {
  chartData: CodersRankActivities
}

export default function ActivityChart({ chartData }: Props) {
  const first = moment(Date.now()).subtract(1, 'year')

  first.format('YYYY-MM-DD')

  const maxVal = Math.max(
    ...Object.values(chartData).map((x) => Object.values(x)[0])
  )
  const total = Object.values(chartData).reduce(
    (acc, cur) => acc + Object.values(cur)[0],
    0
  )

  const rectSize = 12
  const rectSpacing = 4

  const weeks = []
  let days = []

  if (first.weekday() !== 1)
    for (let i = 0; i < first.weekday(); i++)
      days.push(
        <rect key={i} width={rectSize} height={rectSize} fill='transparent' />
      )

  for (let i = 0; i < 365; i++) {
    const date = first.add(1, 'day').format('YYYY-MM-DD')
    const value = chartData[date] ? Object.values(chartData[date])[0] || 0 : 0

    days.push(
      <rect
        key={date}
        x={0}
        y={
          (first.weekday() === 0 ? 6 : first.weekday() - 1) *
          (rectSize + rectSpacing)
        }
        rx={2}
        width={rectSize}
        height={rectSize}
        fill={lerpColor(
          process.env.NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND_DARK || '#434d57',
          process.env.NEXT_PUBLIC_COLOR_ACCENT || '#ff7ef9',
          value / maxVal
        )}
        data-tooltip-content={`${first.format('DD/MM/YYYY')} - <b>${value} activities</b>`}
      />
    )

    if (days.length === 7) {
      weeks.push(
        <g
          key={date}
          transform={`translate(${
            weeks.length * (rectSize + rectSpacing)
          }, 0)`}>
          {days}
        </g>
      )
      days = []
    }
  }

  weeks.push(
    <g
      key={weeks.length}
      transform={`translate(${weeks.length * (rectSize + rectSpacing)}, 0)`}>
      {days}
    </g>
  )

  return (
    <div>
      <h1 className='pb-1 tracking-wide'>
        <span className='font-semibold'>{total} activites</span> in the last
        year
      </h1>
      <div className='flex flex-row space-x-3'>
        <div
          className='relative flex flex-col items-end font-thin text-sm'
          style={{ fontSize: `${rectSpacing / 2 + rectSize}px` }}>
          <span style={{ marginTop: `-${rectSpacing}px` }}>Mon</span>
          <span
            className='absolute'
            style={{ top: `${(rectSpacing + rectSize) * 2 - rectSpacing}px` }}>
            Wed
          </span>
          <span
            className='absolute'
            style={{ top: `${(rectSpacing + rectSize) * 4 - rectSpacing}px` }}>
            Fri
          </span>
          <span
            className='absolute'
            style={{ top: `${(rectSpacing + rectSize) * 6 - rectSpacing}px` }}>
            Sun
          </span>
        </div>
        <svg
          width={(rectSize + rectSpacing) * 53}
          height={(rectSize + rectSpacing) * 7}>
          {weeks}
        </svg>
      </div>
    </div>
  )
}
