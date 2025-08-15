// AzuraCast API integration for radios.bandito.site
const AZURACAST_BASE_URL = "https://radios.bandito.site"

export interface NowPlayingData {
  station: {
    id: number
    name: string
    shortcode: string
    description: string
    frontend: string
    backend: string
    listen_url: string
    url: string
    public_player_url: string
    playlist_pls_url: string
    playlist_m3u_url: string
    is_public: boolean
    mounts: Array<{
      id: number
      name: string
      url: string
      bitrate: number
      format: string
      listeners: {
        total: number
        unique: number
        current: number
      }
    }>
  }
  listeners: {
    total: number
    unique: number
    current: number
  }
  live: {
    is_live: boolean
    streamer_name: string
    broadcast_start: string | null
  }
  now_playing: {
    sh_id: number
    played_at: number
    duration: number
    playlist: string
    streamer: string
    is_request: boolean
    song: {
      id: string
      text: string
      artist: string
      title: string
      album: string
      genre: string
      lyrics: string
      art: string
      custom_fields: Record<string, any>
    }
    elapsed: number
    remaining: number
  }
  playing_next: {
    sh_id: number
    played_at: number
    duration: number
    playlist: string
    is_request: boolean
    song: {
      id: string
      text: string
      artist: string
      title: string
      album: string
      genre: string
      art: string
    }
  }
  song_history: Array<{
    sh_id: number
    played_at: number
    duration: number
    playlist: string
    streamer: string
    is_request: boolean
    song: {
      id: string
      text: string
      artist: string
      title: string
      album: string
      genre: string
      art: string
    }
  }>
}

export interface StationInfo {
  id: number
  name: string
  shortcode: string
  description: string
  frontend: string
  backend: string
  listen_url: string
  url: string
  public_player_url: string
  playlist_pls_url: string
  playlist_m3u_url: string
  is_public: boolean
}

// Get now playing data for all public stations
export async function getAllNowPlaying(): Promise<NowPlayingData[]> {
  try {
    const response = await fetch(`${AZURACAST_BASE_URL}/api/nowplaying`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching now playing data:", error)
    return []
  }
}

// Get now playing data for a specific station
export async function getStationNowPlaying(stationShortcode: string): Promise<NowPlayingData | null> {
  try {
    const response = await fetch(`${AZURACAST_BASE_URL}/api/nowplaying/${stationShortcode}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching now playing data for station ${stationShortcode}:`, error)
    return null
  }
}

// Get static now playing data for a specific station (JSON)
export async function getStationNowPlayingStatic(stationShortcode: string): Promise<NowPlayingData | null> {
  try {
    const response = await fetch(`${AZURACAST_BASE_URL}/api/nowplaying_static/${stationShortcode}.json`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching static now playing data for station ${stationShortcode}:`, error)
    return null
  }
}

// Get current song as text (Artist - Title)
export async function getStationCurrentSongText(stationShortcode: string): Promise<string | null> {
  try {
    const response = await fetch(`${AZURACAST_BASE_URL}/api/nowplaying_static/${stationShortcode}.txt`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.text()
  } catch (error) {
    console.error(`Error fetching current song text for station ${stationShortcode}:`, error)
    return null
  }
}

// Get all stations information
export async function getAllStations(): Promise<StationInfo[]> {
  try {
    const response = await fetch(`${AZURACAST_BASE_URL}/api/stations`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching stations:", error)
    return []
  }
}

// Get specific station information
export async function getStation(stationId: number): Promise<StationInfo | null> {
  try {
    const response = await fetch(`${AZURACAST_BASE_URL}/api/station/${stationId}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching station ${stationId}:`, error)
    return null
  }
}

// Create WebSocket connection for real-time updates
export function createNowPlayingWebSocket(onMessage: (data: NowPlayingData[]) => void): WebSocket | null {
  try {
    const ws = new WebSocket(`wss://radios.bandito.site/api/live/nowplaying/websocket`)

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        onMessage(data)
      } catch (error) {
        console.error("Error parsing WebSocket message:", error)
      }
    }

    ws.onerror = (error) => {
      console.error("WebSocket error:", error)
    }

    return ws
  } catch (error) {
    console.error("Error creating WebSocket connection:", error)
    return null
  }
}
