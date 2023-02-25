import { NeuralNetwork } from 'brain.js'
import Color from 'color'
import {
  INeuralNetworkJSON,
  INeuralNetworkState
} from '../types/brain.js.types'

let gen = 0

class ColorGenerationAi {
  private config = {
    mode: 'gpu' as 'cpu' | 'gpu',
    inputSize: 4,
    hiddenLayers: [15],
    outputSize: 15,
  }

  private brain = new NeuralNetwork(this.config)
  private weights: number[][][] = []
  private name: string = ''

  constructor(json?: INeuralNetworkJSON) {
    this.name = `color-generation-ai-${gen++}`

    if (json) this.load(json)
  }

  getName() {
    return this.name
  }

  reset() {
    this.brain = new NeuralNetwork(this.config)
  }

  generateColor(color: Color, dark: number = 255): Color[] {
    const input = [color.red(), color.green(), color.blue(), dark].map(
      (value) => value / 255
    )

    const output = this.brain.run(input) as number[]

    const colorOutput = output.map((value) => {
      return value * 255
    })

    const [r1, g1, b1, r2, g2, b2, r3, g3, b3, r4, g4, b4, r5, g5, b5] =
      colorOutput

    return [
      Color.rgb(r1, g1, b1),
      Color.rgb(r2, g2, b2),
      Color.rgb(r3, g3, b3),
      Color.rgb(r4, g4, b4),
      Color.rgb(r5, g5, b5),
    ]
  }

  getJson() {
    return this.brain.toJSON()
  }

  private trainColor(input: number[], output: number[], iterations: number) {
    return this.brain.train([{ input, output }], { iterations })
  }

  train(
    { color, dark }: { color: Color; dark: boolean },
    colors: Color[]
  ): INeuralNetworkState {
    const input = [
      color.red(),
      color.green(),
      color.blue(),
      dark ? 255 : 0,
    ].map((value) => value / 255)

    const output = colors
      .map((color) => {
        return [color.red(), color.green(), color.blue()].map((value) => {
          return value / 255
        })
      })
      .flat()

    return this.trainColor(input, output, 5000)
  }

  save() {
    console.log(JSON.stringify(this.weights))
  }

  load(json: INeuralNetworkJSON) {
    try {
      this.brain.fromJSON(json)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

export default ColorGenerationAi

function test(color: Color): Color[] {
  const colorGenerationAi = new ColorGenerationAi()

  return colorGenerationAi.generateColor(color)
}

export { test }

