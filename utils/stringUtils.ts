function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function getFormatedDate(date: Date) {
  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
  let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date)
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)

  return `${da}/${mo}/${ye}`
}

export { capitalize, getFormatedDate }

