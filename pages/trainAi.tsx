import { Button, Input, Spacer } from '@nextui-org/react'
import Color from 'color'
import { useState } from 'react'
import { useAppContext } from '../components/appContext'
import Picker, { Slider } from '../components/Picker'
import RenderOnMount from '../components/RenderOnMount'
import ColorGenerationAi from '../utils/colorGenerationAi'
import { generateRandomKeyboardTheme, toHex } from '../utils/colorUtils'

type Props = {}

async function train(
  colorGenerationAi: ColorGenerationAi
): Promise<{ json: { [key: string]: any }; errorRates: number[] }> {
  return new Promise((resolve) => {
    const generateColors = () => {
      const seed = Color.rgb(
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
      )

      const dark = Math.random() > 0.5
      const theme = generateRandomKeyboardTheme(!dark, {
        seed: seed.hex(),
      })
      const colors = [
        theme.mainBackground,
        theme.keyBackground,
        theme.secondaryKeyBackground,
        theme.keyColor,
        theme.accentBackground,
      ]

      return {
        input: { color: seed, dark },
        output: colors.map((color) => Color(color)),
      }
    }

    const errorRates: number[] = []

    const trainingData = Array.from({ length: 1 }, () => generateColors())

    for (let i = 0; i < trainingData.length; i++) {
      errorRates.push(
        colorGenerationAi.train(trainingData[i].input, trainingData[i].output)
          .error
      )
    }

    resolve({ json: colorGenerationAi.getJson(), errorRates })
  })
}

function millisecondsToHumanReadable(milliseconds: number, precision = 2) {
  const seconds = milliseconds / 1000
  const minutes = seconds / 60
  const hours = minutes / 60
  const days = hours / 24
  const years = days / 365

  if (years >= 1) return `${years.toFixed(precision)} years`
  if (days >= 1) return `${days.toFixed(precision)} days`
  if (hours >= 1) return `${hours.toFixed(precision)} hours`
  if (minutes >= 1) return `${minutes.toFixed(precision)} minutes`
  if (seconds >= 1) return `${seconds.toFixed(precision)} seconds`
  return `${milliseconds.toFixed(precision)} milliseconds`
}

function TrainAi({}: Props) {
  const { colorAi } = useAppContext()
  const [lines, setLines] = useState<string[]>([])
  const [running, setRunning] = useState(false)
  const [iterations, setIterations] = useState(10000)
  const [json, setJson] = useState<{ [key: string]: any }>({})
  const [iteration, setIteration] = useState(0)
  const [totalStart, setTotalStart] = useState(0)
  const [colors, setColors] = useState<Color[]>([])
  const [input, setInput] = useState(Color.rgb(128, 255, 0))
  const [darkMode, setDarkMode] = useState(0)

  const run = async () => {
    colorAi.reset()
    setLines([])
    let running = true
    setRunning(true)
    let totalStart = performance.now()
    setTotalStart(totalStart)
    let lastErrorRate = 0
    for (let i = 0; i < iterations; i++) {
      setRunning((value) => {
        if (!value) running = false
        return value
      })
      if (!running) break
      setIteration(i + 1)
      const start = performance.now()
      const { json, errorRates } = await train(colorAi)
      const end = performance.now()
      const averageErrorRate =
        errorRates.reduce((a, b) => a + b, 0) / errorRates.length
      const diff = averageErrorRate - lastErrorRate
      setJson(json)
      setLines((lines) => [
        ...lines.slice(Math.max(lines.length - 9, 0)),
        `Iteration ${i + 1} took ${(end - start).toFixed(
          3
        )}ms average error: ${averageErrorRate.toFixed(10)} ${
          lastErrorRate === 0
            ? ''
            : `<span style="${
                diff === 0
                  ? 'color:yellow">'
                  : diff < 0
                  ? 'color:green">'
                  : 'color:red">+'
              }${diff.toFixed(10)}</span>`
        }`,
      ])
      lastErrorRate = averageErrorRate
      await new Promise((resolve) => setTimeout(resolve, 10))
    }
    const totalEnd = performance.now()
    setLines((lines) => [
      ...lines.slice(Math.max(lines.length - 25, 0)),
      `Total time: ${(totalEnd - totalStart).toFixed(3)}ms`,
    ])
    setRunning(false)
  }

  return (
    <div
      className='flex flex-row justify-around space-x-4'
      style={{
        height: 'calc(100vh - 5rem)',
      }}>
      <div className='p-4 h-full'>
        <div className='flex flex-col justify-start overflow-hidden'>
          <Spacer y={1} />
          <div className='flex flex-row justify-left items-center space-x-4'>
            <Button onPress={run} disabled={running}>
              {running ? 'Training...' : 'Train AI'}
            </Button>
            <Input
              type='text'
              placeholder='Iterations'
              value={iterations}
              onChange={(e) => {
                const value = e.target.value
                if (value === '' || !isNaN(Number(value))) {
                  setIterations(Number(value))
                }
              }}
            />
            <Button
              onPress={() => {
                setRunning(false)
              }}
              disabled={!running}>
              Abort
            </Button>
          </div>
          <Spacer y={1} />
          <p>
            Running with <b>{iterations}</b> iterations
          </p>
          <p>
            Eta:{' '}
            <b>
              {totalStart === 0
                ? 0
                : millisecondsToHumanReadable(
                    ((performance.now() - totalStart) / iteration) *
                      (iterations - iteration)
                  )}
            </b>
          </p>
          <div className='flex flex-col'>
            {lines.map((line, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: line }}></p>
            ))}
          </div>
        </div>
        <div className='flex flex-col justify-end h-1/2'>
          <div className='flex flex-row justify-start w-full'>
            <Button
              className='flex-grow'
              onPress={() =>
                setColors(colorAi.generateColor(input, 255 - darkMode))
              }>
              Generate
            </Button>
            <Spacer x={1} />
            <Button
              className='flex-grow'
              onPress={() => {
                const [
                  mainBackground,
                  keyBackground,
                  secondaryKeyBackground,
                  keyColor,
                  accentBackground,
                ] = colors

                let url = `${window.location.origin}/creator`
                url += `?mainBg=${mainBackground.hex().substring(1)}`
                url += `&keyBg=${keyBackground.hex().substring(1)}`
                url += `&keyColor=${keyColor.hex().substring(1)}`
                url += `&secondKeyBg=${secondaryKeyBackground
                  .hex()
                  .substring(1)}`
                url += `&accentBg=${accentBackground.hex().substring(1)}`
                url += `&themeName=${encodeURIComponent('Rboard Theme')}`
                url += `&author=Web-Creator`
                url += `&preset=default`

                window.open(url, '_blank')
              }}>
              Edit in Creator
            </Button>
          </div>
          <Spacer y={1} />
          <div className='flex flex-row justify-between items-center space-x-4'>
            <Picker
              disabled={running}
              colorVar={{
                r: input.red(),
                g: input.green(),
                b: input.blue(),
              }}
              submitColor={(color) => {
                setInput(Color(toHex(color)))
              }}
            />
            <Slider
              width='calc(100% - 6em)'
              value={darkMode / 255}
              onChange={(value) => setDarkMode(value * 255)}
            />
          </div>
          <Spacer y={1} />
          <div className='flex flex-row justify-start items-center'>
            {colors.map((color, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: color.hex(),
                  width: '100px',
                  height: '100px',
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='p-4 w-1/2 flex flex-col overflow-hidden'>
        <Spacer y={1} />
        <RenderOnMount>
          <p>JSON ({colorAi.getName()})</p>
        </RenderOnMount>
        <textarea
          aria-label='JSON'
          value={JSON.stringify(json)}
          readOnly
          style={{
            background: 'var(--nextui-colors-accents0)',
            borderRadius: 'var(--nextui-space-6)',
          }}
          className='flex-grow w-full resize-none p-2'
        />
      </div>
    </div>
  )
}

export default TrainAi
