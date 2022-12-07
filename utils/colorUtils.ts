export function lerpColor(a: string, b: string, amount: number): string {
  var ah = +a.replace('#', '0x'),
    ar = ah >> 16,
    ag = (ah >> 8) & 0xff,
    ab = ah & 0xff,
    bh = +b.replace('#', '0x'),
    br = bh >> 16,
    bg = (bh >> 8) & 0xff,
    bb = bh & 0xff,
    rr = ar + amount * (br - ar),
    rg = ag + amount * (bg - ag),
    rb = ab + amount * (bb - ab)

  return (
    '#' + (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1)
  )
}

export function numberToHex(number: number): string {
  const n = number.toString(16)

  return n.length === 1 ? '0' + n : n
}

export function rgbStringToHex(rgb: string): string {
  if (!rgb.startsWith('rgb')) return rgb

  const [r, g, b] = rgb
    .replace('rgb(', '')
    .replace(')', '')
    .split(',')
    .map((n) => parseInt(n))

  return `#${numberToHex(r)}${numberToHex(g)}${numberToHex(b)}`.toUpperCase()
}

export function getBackgroundColor(id: string): string {
  const element = document.getElementById(id)

  if (!element) {
    return ''
  }

  const style = window.getComputedStyle(element)

  return style.backgroundColor
}
