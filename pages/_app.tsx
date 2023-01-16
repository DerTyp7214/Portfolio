import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { AppWrapper } from '../components/appContext'
import '../styles/globals.css'
import { PageInfo, Project } from '../types/types'
import { RouteHandler } from '../utils/customRouteHandler'

export default function App({ Component, pageProps }: AppProps) {
  const {
    pageInfo,
    projects,
  }: {
    pageInfo?: PageInfo
    projects?: Project[]
  } = pageProps

  const router = useRouter()
  const {
    query: { project: projectId },
  } = router

  const [isSSR, setIsSSR] = useState(true)

  const project = projects?.find((project) => project.id === projectId)

  useEffect(() => {
    setIsSSR(false)

    if (window) RouteHandler(router, window.location)
  }, [router])

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
            <>
              <link rel='icon' href={project.faviconUrl} />
              <link rel='shortcut icon' href={project.faviconUrl} />
              <link rel='apple-touch-icon' href={project.faviconUrl} />
            </>
          ) : (
            <>
              <link rel='icon' href={pageInfo.favIconUrl} />
              <link rel='shortcut icon' href={pageInfo.favIconUrl} />
              <link rel='apple-touch' href={pageInfo.favIconUrl} />
            </>
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
          <meta name='og:type' content='website' />
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
            property='twitter:url'
            content={process.env.NEXT_PUBLIC_BASE_URL}
          />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:site' content='@DerTyp7214' />
          <meta name='twitter:dnt' content='on' />
          <meta name='twitter:image' content={pageInfo.ogImageUrl} />

          <meta
            name='application-name'
            content={
              project?.name
                ? `${project?.name} - ${pageInfo.title}`
                : pageInfo.title
            }
          />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='default'
          />
          <meta
            name='apple-mobile-web-app-title'
            content={
              project?.name
                ? `${project?.name} - ${pageInfo.title}`
                : pageInfo.title
            }
          />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta
            name='msapplication-config'
            content='/icons/browserconfig.xml'
          />
          <meta
            name='msapplication-TileColor'
            content={process.env.NEXT_PUBLIC_COLOR_BACKGROUND}
          />
          <meta name='msapplication-tap-highlight' content='no' />

          <link rel='manifest' href={pageInfo.manifestUrl} />
          <link
            rel='mask-icon'
            href='/icons/safari-pinned-tab.svg'
            color={process.env.NEXT_PUBLIC_COLOR_ACCENT}
          />

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
      ) : (
        <Head>
          <title>DerTyp7214.de</title>
          <link rel='icon' href='/favicon.png' />
          <link rel='shortcut icon' href='/favicon.png' />
          <link rel='apple-touch-icon' href='/favicon.png' />

          <meta name='og:title' content='DerTyp7214.de' />
          <meta
            name='og:image'
            content={process.env.NEXT_PUBLIC_BASE_URL + '/assets/og-image.png'}
          />
          <meta name='og:url' content={process.env.NEXT_PUBLIC_BASE_URL} />
          <meta name='og:description' content='DerTyp7214.de' />
          <meta name='description' content='DerTyp7214.de' />

          <meta
            property='twitter:url'
            content={process.env.NEXT_PUBLIC_BASE_URL}
          />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:site' content='@DerTyp7214' />
          <meta name='twitter:dnt' content='on' />
          <meta
            name='twitter:image'
            content={process.env.NEXT_PUBLIC_BASE_URL + '/assets/og-image.png'}
          />
        </Head>
      )}
      <Script
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-FHHB68R52E'
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-FHHB68R52E');
        `}
      </Script>
      <Component {...pageProps} />
    </AppWrapper>
  )
}
