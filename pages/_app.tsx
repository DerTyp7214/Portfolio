import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AppWrapper } from '../components/appContext'
import '../styles/globals.css'
import { PageInfo, Project } from '../types/types'

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

  const [isSSR, setIsSSR] = useState(true)

  const project = projects?.find((project) => project.id === projectId)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  return (
    <AppWrapper>
      {pageInfo ? (
        <Head>
          <title>
            {project?.name
              ? `${project?.name} - ${pageInfo.title}`
              : pageInfo.title}
          </title>
          {project?.faviconUrl ? (
            <link rel='icon' href={project.faviconUrl} />
          ) : (
            <link rel='icon' href={pageInfo.favIconUrl} />
          )}

          {!isSSR && <link rel='canonical' href={window.location.href} />}

          <meta
            name='og:title'
            content={
              project?.name
                ? `${project?.name} - ${pageInfo.title}`
                : pageInfo.title
            }
          />
          <meta name='og:image' content={pageInfo.ogImageUrl} />
          <meta name='og:url' content={process.env.NEXT_PUBLIC_BASE_URL} />
          {project ? (
            <>
              <meta
                name='og:description'
                content={project.keypoints.join(' ')}
              />
              <meta name='description' content={project.keypoints.join(' ')} />
            </>
          ) : (
            pageInfo.description && (
              <>
                <meta name='og:description' content={pageInfo.description} />
                <meta name='description' content={pageInfo.description} />
              </>
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
