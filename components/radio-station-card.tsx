"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Users } from "lucide-react"
import { useState, useRef } from "react"

interface RadioStationCardProps {
  stationName: string
  currentSong: string
  listeners: number
  icon: React.ReactNode
  color: string
  streamUrl?: string // Added streamUrl prop for real audio streaming
}

export default function RadioStationCard({
  stationName,
  currentSong,
  listeners,
  icon,
  color,
  streamUrl,
}: RadioStationCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null) // Added audio ref for real playback

  const handlePlayPause = () => {
    if (!streamUrl) return

    if (!audioRef.current) {
      audioRef.current = new Audio(streamUrl)
      audioRef.current.crossOrigin = "anonymous"
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

  return (
    <Card className="border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      <CardContent className="p-0">
        <div className={`${color} p-4 text-white`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {icon}
              <h3 className="font-black text-lg">{stationName}</h3>
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="rounded-lg border-2 border-white/20"
              onClick={handlePlayPause}
              disabled={!streamUrl} // Disable if no stream URL
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-sm opacity-90 mb-3 truncate">{currentSong}</p>
          <div className="flex items-center gap-1 text-sm">
            <Users className="h-4 w-4" />
            <span>{listeners.toLocaleString()} ouvintes</span>
          </div>
        </div>
        <div className="p-4 bg-white">
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 rounded-lg border-2 border-black font-bold"
              onClick={handlePlayPause}
              disabled={!streamUrl} // Disable if no stream URL
            >
              {isPlaying ? "Pausar" : "Ouvir"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 rounded-lg border-2 border-black font-bold bg-transparent"
            >
              Info
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
