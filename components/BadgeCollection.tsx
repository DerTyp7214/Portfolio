/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { CodersRankBadge, CodersRankBadgeV1, CodersRankBadgeV2 } from '../types/types'

type Props = {
    badges: CodersRankBadge[]
}

export default function BadgeCollection({ badges }: Props) {

    const v1Badges = badges.filter(badge => badge.version === 'v1') as CodersRankBadgeV1[]
    const v2Badges = badges.filter(badge => badge.version === 'v2') as CodersRankBadgeV2[]

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

            <div className='flex flex-wrap'>
                {v2Badges.map((badge, index) => (
                    <div key={index} className='flex flex-col items-center bg-secondaryBackground w-32 p-2 m-2 rounded-md'>
                        <img src={getBadeImage(badge)} alt={badge.description} className='w-14 h-14' />
                        <div className='mt-1'>
                            {Object.entries(badge.values).map(([key, value]) => (
                                key === 'language' ? <p key={key} className='text-s font-bold'>{value}</p> : null
                            ))}
                        </div>
                        <p className='text-xs mt-2' dangerouslySetInnerHTML={{ __html: badge.description }} />
                    </div>
                ))}
            </div>
        </div>
    )
}