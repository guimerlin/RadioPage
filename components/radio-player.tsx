"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Share2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import type { NowPlayingData } from "@/lib/azuracast-api"

interface RadioPlayerProps {
  stations: NowPlayingData[] // Added stations prop to receive real data
}

export default function RadioPlayer({ stations }: RadioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([75])
  const [currentStationIndex, setCurrentStationIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null) // Added audio ref for real playback

  const currentStation = stations[currentStationIndex]
  const currentSong = currentStation?.now_playing?.song
    ? `${currentStation.now_playing.song.title} - ${currentStation.now_playing.song.artist}`
    : "Nenhuma música tocando"
  const stationName = currentStation?.station.name || "Nenhuma estação"

  const handlePlayPause = () => {
    if (!currentStation?.station.listen_url) return

    if (!audioRef.current) {
      audioRef.current = new Audio(currentStation.station.listen_url)
      audioRef.current.crossOrigin = "anonymous"
      audioRef.current.volume = volume[0] / 100
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch((error) => {
        console.error("[v0] Erro ao reproduzir áudio:", error)
      })
      setIsPlaying(true)
    }
  }

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0] / 100
    }
  }

  const switchStation = (direction: "next" | "prev") => {
    if (stations.length === 0) return

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    setIsPlaying(false)

    if (direction === "next") {
      setCurrentStationIndex((prev) => (prev + 1) % stations.length)
    } else {
      setCurrentStationIndex((prev) => (prev - 1 + stations.length) % stations.length)
    }
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  if (stations.length === 0) {
    return (
      <Card className="border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardContent className="p-6 text-center">
          <div className="text-lg font-bold">Carregando estações...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Album Art / Station Logo */}
          <div className="w-full lg:w-48 h-48 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl border-4 border-black flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-4xl font-black mb-2">{stationName}</div>
              <div className="text-sm opacity-80">{currentStation?.live?.is_live ? "AO VIVO" : "AUTOMÁTICO"}</div>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-2xl font-black mb-1">{currentSong}</h3>
              <p className="text-lg text-gray-600">{stationName}</p>
              <p className="text-sm text-gray-500">{currentStation?.listeners.current.toLocaleString()} ouvintes</p>
            </div>

            {/* Progress Bar - Live radio doesn't have progress */}
            <div className="mb-6">
              <div className="w-full h-2 bg-gray-200 rounded-full border-2 border-black">
                <div className="h-full bg-red-500 rounded-full animate-pulse" style={{ width: "100%" }}></div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>AO VIVO</span>
                <span>∞</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <Button
                size="sm"
                variant="outline"
                className="rounded-xl border-2 border-black bg-transparent"
                onClick={() => switchStation("prev")}
                disabled={stations.length <= 1}
              >
                <SkipBack className="h-5 w-5" />
              </Button>

              <Button
                size="lg"
                className="rounded-xl border-4 border-black bg-black hover:bg-black/80 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                onClick={handlePlayPause}
                disabled={!currentStation?.station.listen_url}
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="rounded-xl border-2 border-black bg-transparent"
                onClick={() => switchStation("next")}
                disabled={stations.length <= 1}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>

            {/* Additional Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl border-2 border-black bg-transparent"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button size="sm" variant="outline" className="rounded-xl border-2 border-black bg-transparent">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <Slider value={volume} onValueChange={handleVolumeChange} max={100} step={1} className="w-24" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
