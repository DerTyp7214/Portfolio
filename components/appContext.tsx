import { createTheme, NextUIProvider } from '@nextui-org/react'
import Color from 'color'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, useContext, useRef, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { lerpColor } from '../utils/colorUtils'
import { getFormatedDate } from '../utils/stringUtils'

export type AppContextType = {
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
}

const AppContext = createContext<AppContextType>({
  darkMode: true,
  setDarkMode: () => {},
})

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(true)

  const scrollDiv = useRef<HTMLDivElement>(null)

  const {
    query: { devMode },
  } = useRouter()

  let state: AppContextType = { darkMode, setDarkMode }

  const versionInfo = devMode ? (
    <div className='mb-1 mr-2 text-right text-sm opacity-60 dark:opacity-20 flex flex-col'>
      <Link
        target='_blank'
        href={
          process.env.NEXT_PUBLIC_GIT_HASH
            ? `https://github.com/DerTyp7214/Portfoio/commit/${process.env.NEXT_PUBLIC_GIT_HASH}`
            : 'https://github.com/DerTyp7214/Portfoio/tree/main'
        }>
        {getFormatedDate(new Date())}
      </Link>
      <p>
        {require('../package.json').version} (
        <Link
          target='_blank'
          className='underline p-1'
          href={
            process.env.NEXT_PUBLIC_RUN_ID
              ? `https://github.com/DerTyp7214/Portfoio/actions/runs/${process.env.NEXT_PUBLIC_RUN_ID}`
              : 'https://github.com/DerTyp7214/Portfoio/actions'
          }>
          {process.env.NEXT_PUBLIC_RUN_ID ?? 'actions'}
        </Link>
        )
      </p>
    </div>
  ) : null

  const primaryDark = process.env.NEXT_PUBLIC_COLOR_ACCENT_DARK ?? '#FFFFFF'
  const primaryLight = process.env.NEXT_PUBLIC_COLOR_ACCENT ?? '#000000'
  const backgroundDark =
    process.env.NEXT_PUBLIC_COLOR_BACKGROUND_DARK ?? '#000000'
  const backgroundLight = process.env.NEXT_PUBLIC_COLOR_BACKGROUND ?? '#FFFFFF'
  const secondaryBackgroundDark =
    process.env.NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND_DARK ?? '#000000'
  const secondaryBackgroundLight =
    process.env.NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND ?? '#FFFFFF'

  const primary = darkMode ? primaryDark : primaryLight
  const background = darkMode ? backgroundDark : backgroundLight
  const secondaryBackground = darkMode
    ? secondaryBackgroundDark
    : secondaryBackgroundLight

  const theme = createTheme({
    type: darkMode ? 'dark' : 'light',
    theme: {
      colors: {
        primary: primary,
        primarySolidHover: Color(primary).lighten(0.1).hex(),
        primarySolidActive: Color(primary).darken(0.1).hex(),
        primaryLight: Color(primary).lighten(0.4).hex(),
        primaryLightHover: Color(primary).lighten(0.5).hex(),
        primaryLightActive: Color(primary).lighten(0.3).hex(),
        background: background,
        backgroundContrast: secondaryBackground,
        link: '',
      },
      letterSpacings: {
        tighter: '0em',
        tight: '0em',
        normal: '0',
        wide: '0em',
        wider: '0em',
        widest: '0em'
      }
    },
  })

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div
        ref={scrollDiv}
        className='h-screen bg-background dark:bg-backgroundDark text-black dark:text-white overflow-y-scroll scroll-smooth overflow-x-hidden z-0 customScroll selection:bg-accent/40 dark:selection:bg-accentDark/40 selection:text-black/90'
        style={{
          backgroundPositionX: '50%',
          backgroundImage: darkMode
            ? 'url(/assets/pattern-dark.svg)'
            : 'url(/assets/pattern.svg)',
        }}
        onScroll={(event) => {
          const current = event.currentTarget as HTMLDivElement
          const currentScroll = current.scrollTop

          current.style.backgroundPositionY = -currentScroll * 0.04 + 'px'
        }}>
        <AppContext.Provider value={state}>
          <NextUIProvider theme={theme}>{children}</NextUIProvider>
        </AppContext.Provider>
        <div className='absolute bottom-0 right-1 hidden lg:block'>
          {versionInfo}
        </div>
        <div className='block lg:hidden'>{versionInfo}</div>
      </div>
      <div
        id='modal-root'
        className='text-black dark:text-white selection:bg-accent/40 dark:selection:bg-accentDark/40 selection:text-black/90'></div>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        progressStyle={{
          background: darkMode
            ? process.env.NEXT_PUBLIC_COLOR_TERTIARY_DARK
            : process.env.NEXT_PUBLIC_COLOR_TERTIARY,
        }}
        toastStyle={{
          background: `${lerpColor(
            (darkMode
              ? process.env.NEXT_PUBLIC_COLOR_BACKGROUND_DARK
              : process.env.NEXT_PUBLIC_COLOR_BACKGROUND) ?? '#1e1e1e',
            (darkMode
              ? process.env.NEXT_PUBLIC_COLOR_ACCENT_DARK
              : process.env.NEXT_PUBLIC_COLOR_ACCENT) ?? '#FFFFFF',
            0.1
          )}80`,
          borderRadius: '1rem',
          paddingRight: '10px',
          backdropFilter: 'blur(20px)',
        }}
        toastClassName='transition-all duration-200 m-2'
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        closeButton={false}
        bodyClassName='text-black dark:text-white'
        theme={darkMode ? 'dark' : 'light'}
      />
    </div>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
