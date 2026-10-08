export interface GeoPoint {
  latitude: number
  longitude: number
}

export interface GeolocationReading {
  point: GeoPoint
  accuracy: number
  timestamp: number
}
