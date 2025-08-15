"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Radio, Menu, Plus } from "lucide-react"
import RadioStationCard from "@/components/radio-station-card"
import RadioPlayer from "@/components/radio-player"
import RadioControls from "@/components/radio-controls"
import MobileNavigation from "@/components/mobile-navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { getAllNowPlaying, type NowPlayingData } from "@/lib/azuracast-api"

export default function RadioDashboard() {
  const [stations, setStations] = useState<NowPlayingData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadStations() {
      try {
        console.log("[v0] Carregando estações da API...")
        const data = await getAllNowPlaying()
        console.log("[v0] Dados recebidos:", data)
        setStations(data)
        setError(null)
      } catch (err) {
        console.error("[v0] Erro ao carregar estações:", err)
        setError("Erro ao carregar estações de rádio")
      } finally {
        setLoading(false)
      }
    }

    loadStations()

    const interval = setInterval(loadStations, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-2 sm:p-4 md:p-8">
      {/* Glassmorphic container */}
      <div className="w-full max-w-7xl mx-auto backdrop-blur-xl bg-white/30 border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        {/* Header */}
        <header className="border-b-4 border-black p-4 sm:p-6 bg-white/40 backdrop-blur-md">
          <div className="flex justify-between items-center gap-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">RADIOCAST</h1>

            {/* Mobile menu */}
            <div className="flex md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-xl border-2 border-black bg-transparent">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="border-r-4 border-black p-0">
                  <MobileNavigation />
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <Button className="bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                Adicionar Rádio
              </Button>
              <Button
                variant="outline"
                className="rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-transparent"
              >
                Configurações
              </Button>
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-[280px_1fr] h-[calc(100vh-6rem)]">
          {/* Sidebar - Desktop only */}
          <div className="hidden md:block border-r-4 border-black bg-white/40 p-4">
            <nav className="space-y-2">
              <Link href="#" className="flex items-center gap-2 text-lg font-bold p-3 bg-black text-white rounded-xl">
                Dashboard
              </Link>
              <Link href="#" className="flex items-center gap-2 text-lg font-bold p-3 hover:bg-black/10 rounded-xl">
                Estatísticas
              </Link>
              <Link href="#" className="flex items-center gap-2 text-lg font-bold p-3 hover:bg-black/10 rounded-xl">
                Programação
              </Link>
              <Link href="#" className="flex items-center gap-2 text-lg font-bold p-3 hover:bg-black/10 rounded-xl">
                Histórico
              </Link>
            </nav>

            <div className="mt-8">
              <h2 className="text-xl font-black mb-4">ESTAÇÕES</h2>
              <div className="space-y-2">
                {loading ? (
                  <div className="text-center py-4">Carregando...</div>
                ) : error ? (
                  <div className="text-red-600 text-sm">{error}</div>
                ) : (
                  stations.map((station) => (
                    <Button
                      key={station.station.id}
                      variant="outline"
                      className="w-full justify-start gap-2 rounded-xl border-2 border-black font-bold bg-transparent"
                    >
                      <Radio className="h-5 w-5" /> {station.station.name}
                    </Button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="overflow-auto p-4 sm:p-6">
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-black mb-4">ESTAÇÕES ATIVAS</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                  <div className="col-span-full text-center py-8">
                    <div className="text-lg font-bold">Carregando estações...</div>
                  </div>
                ) : error ? (
                  <div className="col-span-full text-center py-8">
                    <div className="text-red-600 font-bold">{error}</div>
                  </div>
                ) : stations.length === 0 ? (
                  <div className="col-span-full text-center py-8">
                    <div className="text-lg font-bold">Nenhuma estação encontrada</div>
                  </div>
                ) : (
                  stations.map((station, index) => (
                    <RadioStationCard
                      key={station.station.id}
                      stationName={station.station.name}
                      currentSong={
                        station.now_playing?.song
                          ? `${station.now_playing.song.title} - ${station.now_playing.song.artist}`
                          : "Nenhuma música tocando"
                      }
                      listeners={station.listeners.current}
                      icon={<Radio className="h-6 w-6" />}
                      color={`bg-gradient-to-br ${
                        index % 4 === 0
                          ? "from-red-500 to-orange-500"
                          : index % 4 === 1
                            ? "from-blue-500 to-purple-500"
                            : index % 4 === 2
                              ? "from-green-500 to-teal-500"
                              : "from-pink-500 to-rose-500"
                      }`}
                      streamUrl={station.station.listen_url}
                    />
                  ))
                )}
                <Button className="h-full min-h-[120px] border-4 border-dashed border-black rounded-xl flex flex-col items-center justify-center gap-2 bg-white/50 hover:bg-white/70">
                  <Plus className="h-8 w-8" />
                  <span className="font-bold">Nova Estação</span>
                </Button>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-black mb-4">CONTROLES DE RÁDIO</h2>
              <Tabs defaultValue="player" className="w-full">
                <TabsList className="w-full bg-white/50 border-2 border-black rounded-xl p-1 mb-4">
                  <TabsTrigger
                    value="player"
                    className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white font-bold"
                  >
                    Player
                  </TabsTrigger>
                  <TabsTrigger
                    value="playlist"
                    className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white font-bold"
                  >
                    Playlist
                  </TabsTrigger>
                  <TabsTrigger
                    value="live"
                    className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white font-bold"
                  >
                    Ao Vivo
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="player">
                  <RadioPlayer stations={stations} />
                </TabsContent>
                <TabsContent value="playlist">
                  <RadioControls type="playlist" />
                </TabsContent>
                <TabsContent value="live">
                  <RadioControls type="live" />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black mb-4">ESTÚDIO DE RÁDIO</h2>
              <RadioControls type="studio" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
