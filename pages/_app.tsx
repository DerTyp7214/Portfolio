import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import { AppWrapper } from './appContext'

export default function App({ Component, pageProps }: AppProps) {
  const { pageInfo } = pageProps

  return (
    <AppWrapper>
      <Head>
        <title>{pageInfo.title}</title>
        <link rel='icon' href={pageInfo.favIconUrl} />

        <meta name='og:title' content={pageInfo.title} />
        <meta name='og:image' content={pageInfo.ogImageUrl} />
        <meta name='og:url' content={process.env.NEXT_PUBLIC_BASE_URL} />
        {pageInfo.description && (
          <meta name='og:description' content={pageInfo.description} />
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
      <Component {...pageProps} />
    </AppWrapper>
  )
}
