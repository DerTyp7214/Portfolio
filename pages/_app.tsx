import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AppWrapper } from '../components/appContext'
import '../styles/globals.css'
import { PageInfo, Project } from '../types/types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'favicon-badge': any
    }
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const {
    pageInfo,
    projects,
  }: {
    pageInfo?: PageInfo
    projects?: Project[]
  } = pageProps

  const {
    query: { project: projectId },
  } = useRouter()

  useEffect(() => {
    if (window) require('favicon-badge')
  }, [])

  const project = projects?.find((project) => project.id === projectId)

  return (
    <AppWrapper>
      {pageInfo ? (
        <Head>
          <title>{`${project?.name} - ${pageInfo.title}`}</title>
          {project?.imageUrl ? (
            <favicon-badge
              badge
              badgeSize={8}
              src={project.imageUrl}
              badgeBackgroundSrc={pageInfo.favIconUrl}
            />
          ) : (
            <link rel='icon' href={pageInfo.favIconUrl} />
          )}

          <meta
            name='og:title'
            content={`${project?.name} - ${pageInfo.title}`}
          />
          <meta name='og:image' content={pageInfo.ogImageUrl} />
          <meta name='og:url' content={process.env.NEXT_PUBLIC_BASE_URL} />
          {project ? (
            <meta name='og:description' content={project.keypoints.join(' ')} />
          ) : (
            pageInfo.description && (
              <meta name='og:description' content={pageInfo.description} />
            )
          )}

          <meta
            name='theme-color'
            media='(prefers-color-scheme: light)'
            content={process.env.NEXT_PUBLIC_COLOR_ACCENT}
          />
          <meta
            name='theme-color'
            media='(prefers-color-scheme: dark)'
            content={process.env.NEXT_PUBLIC_COLOR_BACKGROUND}
          />
        </Head>
      ) : null}
      <Component {...pageProps} />
    </AppWrapper>
  )
}
