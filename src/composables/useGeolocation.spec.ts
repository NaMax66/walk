import { afterEach, assert, describe, expect, it, vi } from 'vitest'

import type { GeolocationReading } from '@/types'

import { useGeolocation } from './useGeolocation'

describe('useGeolocation', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('stops with an unsupported error when the Geolocation API is unavailable', () => {
    vi.stubGlobal('navigator', { geolocation: undefined })

    const { locate, state } = useGeolocation()

    expect(() => locate()).not.toThrow()
    expect(state.value).toEqual({
      status: 'error',
      error: 'unsupported',
    })
  })

  it('maps a successful geolocation position to a geolocation reading', () => {
    // This fixture has to match the object supplied by the browser API.
    // `satisfies` keeps the fixture checked against the native DOM type.
    const position = {
      coords: {
        latitude: 42.43,
        longitude: 19.26,
        accuracy: 93,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
        toJSON: vi.fn(),
      },
      timestamp: 1791536388115,
      toJSON: vi.fn(),
    } satisfies GeolocationPosition

    // The mock represents the browser boundary. It records the callbacks passed
    // by our composable, but does not decide when the browser responds.
    const getCurrentPosition = vi.fn<Geolocation['getCurrentPosition']>((successCallback) => {
      successCallback(position)
    })

    const geolocation = {
      getCurrentPosition,
    } satisfies Pick<Geolocation, 'getCurrentPosition'>

    vi.stubGlobal('navigator', { geolocation })

    const { locate, state } = useGeolocation()

    locate()

    // Keep a stable snapshot so TypeScript can narrow the discriminated union.
    const result = state.value
    assert(result.status === 'success')

    const expected = {
      point: {
        latitude: 42.43,
        longitude: 19.26,
      },
      accuracy: 93,
      timestamp: 1791536388115,
    } satisfies GeolocationReading

    expect(result.geolocationReading).toEqual(expected)
  })
})
