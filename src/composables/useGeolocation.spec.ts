import { afterEach, describe, expect, it, vi } from 'vitest'

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
})
