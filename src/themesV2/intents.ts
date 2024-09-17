// import {IIntents} from './intents'
// export type IntentTypes = {
//   ExtraSmall: 2
//   Small: 4
//   Normal: 8
//   Medium: 16
//   Large: 24
//   ExtraLarge: 32
//   Massive: 64
// }
export interface IIntents {
  ExtraSmall: number
  Small: number
  Normal: number
  Medium: number
  Large: number
  ExtraLarge: number
}

export type IntentTypes =
  | 'ExtraSmall'
  | 'Small'
  | 'Normal'
  | 'Medium'
  | 'Large'
  | 'ExtraLarge'
  | 'Massive'
  | number

export const intents: IIntents = {
  ExtraSmall: 2,
  Small: 4,
  Normal: 8,
  Medium: 16,
  Large: 24,
  ExtraLarge: 32,
}

// export default {
//   intents: IIntentValues,
//   margin: IIntentValues,
// }
