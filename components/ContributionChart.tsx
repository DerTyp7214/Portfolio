import React from 'react'
import { CONTRIBUTION_LEVELS, GitHubContributions } from '../types/types'
import { lerpColor } from '../utils/colorUtils'

type Props = {
  chartData: GitHubContributions
}

export default function ContributionChart({ chartData }: Props) {
  const rectSize = 12
  const rectSpacing = 4

  const weeks: JSX.Element[] = []

  chartData.contributions?.forEach((contribution, index) => {
    const days: JSX.Element[] = []
    contribution.forEach((value, index) => {
      days.push(
        <rect
          key={index}
          x={0}
          y={index * (rectSize + rectSpacing)}
          rx={2}
          width={rectSize}
          height={rectSize}
          fill={lerpColor('#434d57', '#ff7ef9', CONTRIBUTION_LEVELS[value.contributionLevel] / 4)}
          data-tip={`${value.date} - <b>${value.contributionCount} activities</b>`}
        />
      )
    })
    weeks.push(
      <g key={index} transform={`translate(${weeks.length * (rectSize + rectSpacing)}, 0)`}>
        {days}
      </g>
    )
  })

  return (
    <div>
      <h1 className='pb-1 tracking-wide'><span className='font-semibold'>{chartData.totalContributions} contributions</span> in the last year</h1>
      <div className='flex flex-row space-x-3'>
        <div className='relative flex flex-col items-end font-thin text-sm' style={{ fontSize: `${(rectSpacing / 2) + rectSize}px` }}>
          <span style={{ marginTop: `${rectSize}px` }}>Mon</span>
          <span className='absolute' style={{ top: `${((rectSpacing + rectSize) * 3) - rectSpacing}px` }}>Wed</span>
          <span className='absolute' style={{ top: `${((rectSpacing + rectSize) * 5) - rectSpacing}px` }}>Fri</span>
        </div>
        <svg width={(rectSize + rectSpacing) * 53} height={(rectSize + rectSpacing) * 7}>
          {weeks}
        </svg>
      </div>
    </div>
  )
}