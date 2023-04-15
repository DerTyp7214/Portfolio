import { CONTRIBUTION_LEVELS, GitHubContributions } from '../types/types'

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
      const factor = CONTRIBUTION_LEVELS[value.contributionLevel] / 4

      days.push(
        <g key={index}>
          <rect
            key={`${index}-background`}
            x={0}
            y={index * (rectSize + rectSpacing)}
            rx={2}
            width={rectSize}
            height={rectSize}
            fill={'currentColor'}
          />
          <rect
            key={`${index}-accent`}
            x={0}
            y={index * (rectSize + rectSpacing)}
            rx={2}
            width={rectSize}
            height={rectSize}
            className='text-accent dark:text-accentDark'
            fill={'currentColor'}
            style={{
              opacity: factor === Infinity ? 0 : factor,
            }}
            data-tooltip-content={`${value.date} - <b>${value.contributionCount} activities</b>`}
          />
        </g>
      )
    })
    weeks.push(
      <g
        key={index}
        transform={`translate(${weeks.length * (rectSize + rectSpacing)}, 0)`}>
        {days}
      </g>
    )
  })

  return (
    <div>
      <h1 className='pb-1 tracking-wide'>
        <span className='font-semibold'>
          {chartData.totalContributions} contributions
        </span>{' '}
        in the last year
      </h1>
      <div className='flex flex-row space-x-3 text-secondaryBackground dark:text-secondaryBackgroundDark'>
        <div
          className='relative flex flex-col items-end font-thin text-sm text-black/50 dark:text-white/50'
          style={{ fontSize: `${rectSpacing / 2 + rectSize}px` }}>
          <span style={{ marginTop: `${rectSize}px` }}>Mon</span>
          <span
            className='absolute'
            style={{ top: `${(rectSpacing + rectSize) * 3 - rectSpacing}px` }}>
            Wed
          </span>
          <span
            className='absolute'
            style={{ top: `${(rectSpacing + rectSize) * 5 - rectSpacing}px` }}>
            Fri
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
