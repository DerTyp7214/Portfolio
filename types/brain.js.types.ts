export interface INeuralNetworkState {
  iterations: number
  error: number
}

export interface INumberHash {
  [character: string]: number
}
declare type NeuralNetworkFormatter =
  | ((v: INumberHash) => Float32Array)
  | ((v: number[]) => Float32Array)
export declare function getTypedArrayFn(
  value: INeuralNetworkData,
  table: INumberHash | null
): null | NeuralNetworkFormatter
export declare type NeuralNetworkActivation =
  | 'sigmoid'
  | 'relu'
  | 'leaky-relu'
  | 'tanh'
export interface IJSONLayer {
  biases: number[]
  weights: number[][]
}
export interface INeuralNetworkJSON {
  type: string
  sizes: number[]
  layers: IJSONLayer[]
  inputLookup: INumberHash | null
  inputLookupLength: number
  outputLookup: INumberHash | null
  outputLookupLength: number
  options: INeuralNetworkOptions
  trainOpts: INeuralNetworkTrainOptionsJSON
}
export interface INeuralNetworkOptions {
  inputSize: number
  outputSize: number
  binaryThresh: number
  hiddenLayers?: number[]
}
export declare function defaults(): INeuralNetworkOptions
export interface INeuralNetworkTrainOptionsJSON {
  activation: NeuralNetworkActivation | string
  iterations: number
  errorThresh: number
  log: boolean
  logPeriod: number
  leakyReluAlpha: number
  learningRate: number
  momentum: number
  callbackPeriod: number
  timeout: number | 'Infinity'
  praxis?: 'adam'
  beta1: number
  beta2: number
  epsilon: number
}

export declare type INeuralNetworkData =
  | number[]
  | Float32Array
  | Partial<INumberHash>
export interface INeuralNetworkDatum<InputType, OutputType> {
  input: InputType
  output: OutputType
}
export interface INeuralNetworkDatumFormatted<T> {
  input: T
  output: T
}
