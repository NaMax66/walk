import { readonly, ref } from 'vue'

export interface Coordinates {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number
}

export type LocationError =
  | 'permission-denied'
  | 'position-unavailable'
  | 'timeout'
  | 'unsupported'

export type GeolocationState =
  | { status: 'idle' }
  | { status: 'locating' }
  | { status: 'success'; coordinates: Coordinates }
  | { status: 'error'; error: LocationError }

const initialState: GeolocationState = { status: 'idle' }

export function useGeolocation() {
  const state = ref<GeolocationState>(initialState)

  function handleSuccess(position: GeolocationPosition): void {
    // TODO: Convert the browser-specific GeolocationPosition into Coordinates.
    // TODO: Move the state to "success" with the normalized coordinates.
  }

  function handleError(error: GeolocationPositionError): void {
    // TODO: Map the native numeric error code to our LocationError union.
    // TODO: Move the state to "error" with the mapped error.
  }

  function locate(): void {
    // TODO: Handle browsers that do not provide navigator.geolocation.
    // TODO: Clear the previous result by moving the state to "locating".
    // TODO: Request the current position and pass both callbacks.
    // TODO: Decide which PositionOptions make sense for the first version.
    console.log(navigator.geolocation);
  }

  return {
    state: readonly(state),
    locate,
  }
}
