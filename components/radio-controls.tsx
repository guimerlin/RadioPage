import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mic, Upload, Calendar, Music, Radio, Settings } from "lucide-react"

interface RadioControlsProps {
  type: "playlist" | "live" | "studio"
}

export default function RadioControls({ type }: RadioControlsProps) {
  if (type === "playlist") {
    return (
      <Card className="border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="border-b-4 border-black bg-white/50">
          <CardTitle className="flex items-center gap-2 text-xl font-black">
            <Music className="h-6 w-6" />
            GERENCIAR PLAYLIST
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">Nome da Playlist</label>
              <Input placeholder="Ex: Rock Clássico" className="rounded-xl border-2 border-black" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Descrição</label>
              <Textarea placeholder="Descreva sua playlist..." className="rounded-xl border-2 border-black" rows={3} />
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Upload className="h-4 w-4 mr-2" />
                Upload Músicas
              </Button>
              <Button variant="outline" className="flex-1 rounded-xl border-2 border-black font-bold bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                Agendar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (type === "live") {
    return (
      <Card className="border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="border-b-4 border-black bg-white/50">
          <CardTitle className="flex items-center gap-2 text-xl font-black">
            <Mic className="h-6 w-6" />
            TRANSMISSÃO AO VIVO
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Título do Show</label>
                <Input placeholder="Ex: Morning Show" className="rounded-xl border-2 border-black" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">DJ/Apresentador</label>
                <Input placeholder="Seu nome" className="rounded-xl border-2 border-black" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Descrição do Programa</label>
              <Textarea
                placeholder="Conte sobre seu programa..."
                className="rounded-xl border-2 border-black"
                rows={3}
              />
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-red-500 hover:bg-red-600 text-white">
                <Radio className="h-4 w-4 mr-2" />
                Iniciar Transmissão
              </Button>
              <Button variant="outline" className="flex-1 rounded-xl border-2 border-black font-bold bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Studio type
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-xl border-4 border-black mx-auto mb-4 flex items-center justify-center">
            <Music className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-lg font-black mb-2">Editor de Áudio</h3>
          <p className="text-sm text-gray-600 mb-4">Edite e processe seus arquivos de áudio</p>
          <Button className="w-full rounded-xl border-2 border-black font-bold">Abrir Editor</Button>
        </CardContent>
      </Card>

      <Card className="border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-xl border-4 border-black mx-auto mb-4 flex items-center justify-center">
            <Mic className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-lg font-black mb-2">Gravador</h3>
          <p className="text-sm text-gray-600 mb-4">Grave vinhetas e programas</p>
          <Button className="w-full rounded-xl border-2 border-black font-bold">Iniciar Gravação</Button>
        </CardContent>
      </Card>

      <Card className="border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-purple-500 rounded-xl border-4 border-black mx-auto mb-4 flex items-center justify-center">
            <Radio className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-lg font-black mb-2">Mixer</h3>
          <p className="text-sm text-gray-600 mb-4">Console de mixagem virtual</p>
          <Button className="w-full rounded-xl border-2 border-black font-bold">Abrir Mixer</Button>
        </CardContent>
      </Card>
    </div>
  )
}
