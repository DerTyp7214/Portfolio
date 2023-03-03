import { Button, Input, Spacer } from '@nextui-org/react'
import Color from 'color'
import { useState } from 'react'
import { useAppContext } from '../components/appContext'
import Picker, { Slider } from '../components/Picker'
import RenderOnMount from '../components/RenderOnMount'
import ColorGenerationAi from '../utils/colorGenerationAi'
import { toHex } from '../utils/colorUtils'
import { parsableJson } from '../utils/stringUtils'
import { monetTrainingData } from '../utils/trainingData'

type Props = {}

async function train(
  colorGenerationAi: ColorGenerationAi
): Promise<{ json: { [key: string]: any }; errorRates: number[] }> {
  return new Promise((resolve) => {
    const errorRates: number[] = []

    const trainingData = monetTrainingData()

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
  const { colorAi, darkMode } = useAppContext()
  const [lines, setLines] = useState<string[]>([])
  const [running, setRunning] = useState(false)
  const [iterations, setIterations] = useState(10000)
  const [brainJson, setBrainJson] = useState<string>(
    JSON.stringify(colorAi.getJson())
  )
  const [iteration, setIteration] = useState(0)
  const [totalStart, setTotalStart] = useState(0)
  const [colors, setColors] = useState<Color[]>([])
  const [input, setInput] = useState(Color(process.env.NEXT_PUBLIC_COLOR_SEED))
  const [lightness, setLightness] = useState(0)

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
      setCurrentIteration(i + 1)
      const start = performance.now()
      const { json, errorRates } = await train(colorAi)
      const end = performance.now()
      const averageErrorRate =
        errorRates.reduce((a, b) => a + b, 0) / errorRates.length
      const diff = averageErrorRate - lastErrorRate
      setBrainJson(JSON.stringify(json))
      setLines((lines) => [
        ...lines.slice(Math.max(lines.length - 80, 0)),
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
      ...lines,
      `Total time: ${(totalEnd - totalStart).toFixed(3)}ms`,
    ])
    setRunning(false)
  }

  const setCurrentIteration = (value: number) => {
    setIteration(value)

    const parse = (value: number) => {
      if (value < 1000) return value
      if (value < 10000) return `${(value / 1000).toFixed(1)}k`
      return `${(value / 1000).toFixed(0)}k`
    }

    const currentTitle = document.title
    const newTitle = `${window.location.hostname} - Iteration ${parse(
      value
    )} / ${parse(iterations)}`
    if (currentTitle !== newTitle) document.title = newTitle
  }

  return (
    <div className='flex flex-col lg:flex-row lg:justify-around space-x-0 space-y-4 lg:space-y-0 lg:space-x-4 overflow-scroll lg:overflow-hidden lg:h-screen'>
      <div className='p-4 h-full lg:h-screen flex flex-col justify-between'>
        <div className='flex flex-col justify-start overflow-hidden'>
          <Spacer y={1} />
          <div className='flex flex-col md:flex-row justify-left items-start md:items-center space-y-4 space-x-0 md:space-y-0 md:space-x-4'>
            <Button
              onPress={run}
              disabled={running}
              css={{
                color: darkMode ? 'black' : 'white',
              }}
              className='!w-full md:!w-auto'>
              {running ? 'Training...' : 'Train AI'}
            </Button>
            <Input
              type='text'
              aria-label='Iterations'
              fullWidth
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
              className='!w-full md:!w-auto'
              css={{
                color: darkMode ? 'black' : 'white',
              }}
              onPress={() => {
                setRunning(false)
              }}
              disabled={!running}>
              Abort
            </Button>
          </div>
          <Spacer y={1} />
          {running ? (
            <>
              <p>
                Running with <b>{iterations}</b> iterations
              </p>
              <p>
                {' '}
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
            </>
          ) : null}
          <div
            className='flex flex-col overflow-auto md:!h-auto'
            style={{
              height: '50vh',
            }}>
            {lines.map((line, index) => (
              <p
                key={index}
                dangerouslySetInnerHTML={{ __html: line }}
                style={{ overflowAnchor: 'none' }}
                className='whitespace-nowrap'></p>
            ))}
            <div
              id='anchor'
              style={{
                overflowAnchor: 'auto',
                height: '1px',
              }}></div>
          </div>
          <Spacer y={1} />
        </div>
        <div className='flex flex-col justify-end h-1/2'>
          <div className='flex flex-col md:flex-row justify-start w-full'>
            <Button
              className='flex-grow'
              css={{
                color: darkMode ? 'black' : 'white',
              }}
              onPress={() =>
                setColors(colorAi.generateColor(input, lightness))
              }>
              Generate
            </Button>
            <Spacer x={1} />
            <Button
              className='flex-grow'
              css={{
                color: darkMode ? 'black' : 'white',
              }}
              onPress={() => {
                const [
                  mainBackground,
                  keyBackground,
                  secondaryKeyBackground,
                  keyColor,
                  accentBackground,
                  tertiaryBackground,
                ] = colors

                let url = `${window.location.origin}/creator`
                url += `?mainBg=${mainBackground.hex().substring(1)}`
                url += `&keyBg=${keyBackground.hex().substring(1)}`
                url += `&keyColor=${keyColor.hex().substring(1)}`
                url += `&secondKeyBg=${secondaryKeyBackground
                  .hex()
                  .substring(1)}`
                url += `&accentBg=${accentBackground.hex().substring(1)}`
                url += `&tertiaryBg=${tertiaryBackground.hex().substring(1)}`
                url += `&themeName=${encodeURIComponent('Rboard Theme')}`
                url += `&author=Web-Creator`
                url += `&preset=MonetBased`

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
              value={1 - lightness}
              onChange={(value) => setLightness(Math.abs(value - 1))}
            />
          </div>
          <Spacer y={1} />
          <div className='flex flex-row justify-center items-center'>
            {colors.map((color, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: color.hex(),
                  width: '20%',
                  maxWidth: '120px',
                  aspectRatio: '1',
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='p-4 lg:w-1/2 flex flex-col overflow-hidden'>
        <Spacer y={1} />
        <RenderOnMount>
          <p>
            JSON ({colorAi.getName()})
            {!parsableJson(brainJson) ? (
              <span style={{ color: 'red' }}> Invalid JSON</span>
            ) : null}
          </p>
        </RenderOnMount>
        <textarea
          aria-label='JSON'
          value={brainJson}
          onChange={(e) => {
            setBrainJson(e.target.value)
          }}
          style={{
            background: 'var(--nextui-colors-accents0)',
            borderRadius: 'var(--nextui-space-6)',
            height: '50vh',
          }}
          className='flex-grow w-full resize-none p-2 lg:!h-auto'
        />
        <Spacer y={1} />
        <Button
          disabled={running || !parsableJson(brainJson)}
          className='w-full'
          css={{
            color: darkMode ? 'black' : 'white',
          }}
          onPress={() => {
            colorAi.load(JSON.parse(brainJson))
          }}>
          Load
        </Button>
      </div>
    </div>
  )
}

export default TrainAi
