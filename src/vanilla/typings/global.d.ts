import { SdkHandle } from 'onfido-sdk-ui'

declare global {
  interface Window extends NodeJS.Global {
    onfidoOut?: SdkHandle
  }
}
