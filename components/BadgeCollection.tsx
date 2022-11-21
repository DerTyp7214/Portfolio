/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'
import {
  CodersRankBadge,
  CodersRankBadgeV1,
  CodersRankBadgeV2,
} from '../types/types'

type Props = {
  badges: CodersRankBadge[]
}

export default function BadgeCollection({ badges }: Props) {
  const v1Badges = badges.filter(
    (badge) => badge.version === 'v1'
  ) as CodersRankBadgeV1[]
  const v2Badges = badges.filter(
    (badge) => badge.version === 'v2'
  ) as CodersRankBadgeV2[]

  const getBadeImage = (badge: CodersRankBadgeV1 | CodersRankBadgeV2) => {
    if (badge.version === 'v1') {
      return `https://icon-widget.codersrank.io/api/${badge.language}`
    } else {
      return `https://profile.codersrank.io/static/badgesV2/${badge.badgeFamily}/${badge.badgeType}.svg`
    }
  }

  return (
    <div>
      <h1 className='tracking-wide'>Badges</h1>

      <div className='grid grid-cols-6'>
        {v2Badges.map((badge, index) => (
          <div
            key={index}
            className='flex flex-col items-center bg-secondaryBackground w-32 p-2 m-2 rounded-md'
            data-tip={badge.description}>
            <div className='w-14 h-14 relative'>
              <Image
                src={getBadeImage(badge)}
                alt={badge.description}
                fill
              />
            </div>
            <p className='text-xs mt-2'>
              {badge.badgeType.split(/(?=[A-Z])/).join(' ')}
            </p>
            <div className='mt-1'>
              {Object.entries(badge.values).map(([key, value]) => {
                switch (key) {
                  case 'language':
                    return (
                      <div
                        key={key}
                        className='flex flex-row space-x-2 items-center mt-2 mb-1'>
                        <div className='w-4 h-4 inline relative'>
                          <Image
                            src={`https://icon-widget.codersrank.io/api/${value}`}
                            alt={value}
                            fill
                          />
                        </div>
                        <p
                          key={key}
                          className='text-sm font-bold'>
                          {value}
                        </p>
                      </div>
                    )
                  case 'days':
                    return (
                      <p
                        key={key}
                        className='text-xs mt-2 mb-1 uppercase'>
                        {value} Days
                      </p>
                    )
                  default:
                    return null
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
