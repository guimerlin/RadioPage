import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Radio } from "lucide-react"

export default function MobileNavigation() {
  return (
    <div className="h-full bg-white/40 backdrop-blur-md flex flex-col">
      <div className="p-6 border-b-4 border-black">
        <h2 className="text-2xl font-black">RADIOCAST</h2>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <nav className="space-y-2 mb-8">
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

        <div>
          <h2 className="text-xl font-black mb-4">ESTAÇÕES</h2>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 rounded-xl border-2 border-black font-bold bg-transparent"
            >
              <Radio className="h-5 w-5" /> Rock FM
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 rounded-xl border-2 border-black font-bold bg-transparent"
            >
              <Radio className="h-5 w-5" /> Pop Hits
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 rounded-xl border-2 border-black font-bold bg-transparent"
            >
              <Radio className="h-5 w-5" /> Jazz Lounge
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 rounded-xl border-2 border-black font-bold bg-transparent"
            >
              <Radio className="h-5 w-5" /> Electronic
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 border-t-4 border-black">
        <div className="grid grid-cols-2 gap-2">
          <Button className="bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold">
            Adicionar
          </Button>
          <Button variant="outline" className="rounded-xl border-2 border-black font-bold bg-transparent">
            Configurações
          </Button>
        </div>
      </div>
    </div>
  )
}
