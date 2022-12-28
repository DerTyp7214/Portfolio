import { NextRouter } from 'next/router'

const host = new URL(
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
).host

const routeMap: { [key: string]: { [key: string]: string } } = {
  'rboard.dev': {
    '/': '/rboard',
  },
}

const ParseLocation = (
  pathname: string,
  suffix?: string,
  includeParsedSuffig: boolean = false
) => {
  if (host in routeMap) {
    const route = routeMap[host][pathname]

    if (route) return route + (includeParsedSuffig ? suffix ?? '' : '')
  }

  return pathname + (suffix ?? '')
}

const RouteHandler = (router: NextRouter, location: Location) => {
  const route = ParseLocation(
    location.pathname,
    location.search + location.hash
  )

  if (location.pathname !== new URL(location.origin + route).pathname && route)
    router.push(route)
}

export { RouteHandler, ParseLocation }

