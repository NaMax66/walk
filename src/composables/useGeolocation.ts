import { readonly, ref } from 'vue'
import type { GeolocationReading } from '@/types'

export type LocationError = 'permission-denied' | 'position-unavailable' | 'timeout' | 'unsupported'

export type GeolocationState =
  | { status: 'idle' }
  | { status: 'locating' }
  | { status: 'success'; geolocationReading: GeolocationReading }
  | { status: 'error'; error: LocationError }

const initialState: GeolocationState = { status: 'idle' }

const geolocationOptions: PositionOptions = {
  timeout: 10_000,
  maximumAge: 30_000,
  enableHighAccuracy: false,
}

export function useGeolocation() {
  const state = ref<GeolocationState>(initialState)

  function handleSuccess(position: GeolocationPosition): void {
    state.value = {
      status: 'success',
      geolocationReading: {
        point: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
      },
    }
  }

  function handleGeolocationError(error: GeolocationPositionError): void {
    const errorMap: { [key: number]: LocationError } = {
      1: 'permission-denied',
      2: 'position-unavailable',
      3: 'timeout',
    }

    const locationError: LocationError = errorMap[error.code] ?? 'position-unavailable'

    state.value = { status: 'error', error: locationError }
  }

  function setError(error: LocationError) {
    state.value = { status: 'error', error }
  }

  function locate(): void {
    if (!navigator.geolocation) {
      setError('unsupported')
      return
    }

    state.value = { status: 'locating' }

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleGeolocationError,
      geolocationOptions,
    )
  }

  return {
    state: readonly(state),
    locate,
  }
}
