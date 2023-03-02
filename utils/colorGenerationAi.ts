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
    inputSize: 7,
    hiddenLayers: [35, 60],
    outputSize: 18,
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

  generateColor(color: Color, l: number = 0): Color[] {
    const input = [
      color.hue() / 360,
      color.saturationl() / 100,
      color.lightness() / 100,
      color.red() / 255,
      color.green() / 255,
      color.blue() / 255,
      l,
    ]

    const output = this.brain.run(input) as number[]

    const [
      r1,
      g1,
      b1,
      r2,
      g2,
      b2,
      r3,
      g3,
      b3,
      r4,
      g4,
      b4,
      r5,
      g5,
      b5,
      r6,
      g6,
      b6,
    ] = output

    return [
      Color.rgb(r1 * 255, g1 * 255, b1 * 255),
      Color.rgb(r2 * 255, g2 * 255, b2 * 255),
      Color.rgb(r3 * 255, g3 * 255, b3 * 255),
      Color.rgb(r4 * 255, g4 * 255, b4 * 255),
      Color.rgb(r5 * 255, g5 * 255, b5 * 255),
      Color.rgb(r6 * 255, g6 * 255, b6 * 255),
    ]
  }

  getJson() {
    return this.brain.toJSON()
  }

  private trainColor(input: number[], output: number[], iterations: number) {
    return this.brain.train([{ input, output }], { iterations })
  }

  train(
    { color, l }: { color: Color; l: number },
    colors: Color[]
  ): INeuralNetworkState {
    const input = [
      color.hue() / 360,
      color.saturationl() / 100,
      color.lightness() / 100,
      color.red() / 255,
      color.green() / 255,
      color.blue() / 255,
      l,
    ]

    const output = colors
      .map((color) => {
        return [color.red() / 255, color.green() / 255, color.blue() / 255]
      })
      .flat()

    return this.trainColor(input, output, 10000)
  }

  save() {
    console.log(JSON.stringify(this.weights))
  }

  load(json: INeuralNetworkJSON) {
    try {
      this.brain.fromJSON(json)
      this.name = `color-generation-ai-${gen++}`
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

export default ColorGenerationAi
