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

  private generateColor(color: Color, luminosity: number = 0): Color[] {
    const input = [color.red(), color.green(), color.blue(), luminosity].map(
      (value) => value / 255
    )

    const output = this.brain.run(input) as number[]

    const colorOutput = output

    const [h1, s1, l1, h2, s2, l2, h3, s3, l3, h4, s4, l4, h5, s5, l5] =
      colorOutput

    return [
      Color.hsl(h1 * 360, s1 * 100, l1 * 100),
      Color.hsl(h2 * 360, s2 * 100, l2 * 100),
      Color.hsl(h3 * 360, s3 * 100, l3 * 100),
      Color.hsl(h4 * 360, s4 * 100, l4 * 100),
      Color.hsl(h5 * 360, s5 * 100, l5 * 100),
    ]
  }

  generateColorFromHSL(color: Color, l: number = 0): Color[] {
    const input = [
      color.hue() / 360,
      color.saturationl() / 100,
      color.lightness() / 100,
      l / 100,
    ]

    const output = this.brain.run(input) as number[]

    const [h1, s1, l1, h2, s2, l2, h3, s3, l3, h4, s4, l4, h5, s5, l5] = output

    return [
      Color.hsl(h1 * 360, s1 * 100, l1 * 100),
      Color.hsl(h2 * 360, s2 * 100, l2 * 100),
      Color.hsl(h3 * 360, s3 * 100, l3 * 100),
      Color.hsl(h4 * 360, s4 * 100, l4 * 100),
      Color.hsl(h5 * 360, s5 * 100, l5 * 100),
    ]
  }

  getJson() {
    return this.brain.toJSON()
  }

  private trainColor(input: number[], output: number[], iterations: number) {
    return this.brain.train([{ input, output }], { iterations })
  }

  private train(
    { color, l }: { color: Color; l: number },
    colors: Color[]
  ): INeuralNetworkState {
    const input = [color.red(), color.green(), color.blue(), l * 2.55].map(
      (value) => value / 255
    )

    const output = colors
      .map((color) => {
        return [color.red(), color.green(), color.blue()].map((value) => {
          return value / 255
        })
      })
      .flat()

    return this.trainColor(input, output, 5000)
  }

  trainFromHSL(
    { color, l }: { color: Color; l: number },
    colors: Color[]
  ): INeuralNetworkState {
    const input = [
      color.hue() / 360,
      color.saturationl() / 100,
      color.lightness() / 100,
      l / 100,
    ]

    const output = colors
      .map((color) => {
        return [
          color.hue() / 360,
          color.saturationl() / 100,
          color.lightness() / 100,
        ]
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
