import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import ReactTooltip from 'react-tooltip'
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
  const [scrollPosition, setScrollPosition] = useState(0)
  const [darkMode, setDarkMode] = useState(true)

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

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div
        className='h-screen bg-background dark:bg-backgroundDark text-black dark:text-white overflow-y-scroll scroll-smooth overflow-x-hidden z-0 customScroll selection:bg-accent/40 dark:selection:bg-accentDark/40 selection:text-black/90'
        style={{
          backgroundPositionX: '50%',
          backgroundPositionY: -scrollPosition * 0.04 + 'px',
          backgroundImage: darkMode
            ? 'url(/assets/pattern-dark.svg)'
            : 'url(/assets/pattern.svg)',
        }}
        onScroll={(event) => {
          setScrollPosition(event.currentTarget.scrollTop)
        }}>
        <AppContext.Provider value={state}>{children}</AppContext.Provider>
        <div className='absolute bottom-0 right-1 hidden lg:block'>
          {versionInfo}
        </div>
        <div className='block lg:hidden'>{versionInfo}</div>
      </div>
      <div
        id='modal-root'
        className='text-black dark:text-white selection:bg-accent/40 dark:selection:bg-accentDark/40 selection:text-black/90'></div>
      <ReactTooltip
        html
        backgroundColor={lerpColor(
          (darkMode
            ? process.env.NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND_DARK
            : process.env.NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND) ?? '#434d57',
          darkMode ? '#FFFFFF' : '#000000',
          0.1
        )}
        textColor={darkMode ? '#FFFFFF' : '#000000'}
        multiline
        className='max-w-[200px] text-center'
      />
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
