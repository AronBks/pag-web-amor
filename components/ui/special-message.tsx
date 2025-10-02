"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function SpecialMessage() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white p-4 min-h-[120px] flex flex-col items-center justify-center gap-2 rounded-xl shadow-lg text-center overflow-hidden"
        >
          <span className="text-2xl">💌</span>
          <span className="font-semibold">Mensaje para Kitty</span>
          <span className="text-sm opacity-90 max-w-[90%] break-words leading-tight">
            Un recordatorio bonito para cuando lo necesites
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center shadow-md">
              <span className="text-white">💖</span>
            </div>
            <DialogTitle className="text-2xl text-pink-700">Mensaje especial para mi Kitty</DialogTitle>
          </div>
        </DialogHeader>

        <div className="bg-white rounded-xl shadow-2xl ring-1 ring-gray-100 p-6 mt-4 max-h-[70vh] overflow-auto">
          <div className="p-2 space-y-6 text-gray-800">
            <p className="text-lg md:text-xl leading-relaxed">
              Mi querida Kitty, quiero que este mensaje sea una pequeña caja de calma que puedas abrir cuando lo
              necesites. Aquí encontrarás palabras que te recuerdan lo mucho que vales, cuánto iluminas a quienes te
              rodean y que, aunque a veces no pueda estar físicamente a tu lado, mi cariño y mi apoyo siempre estarán
              contigo.
            </p>

            <blockquote className="border-l-4 border-pink-300 pl-4 italic bg-gray-50 p-4 rounded">
              Guarda esto: eres mi rincón seguro y quiero que encuentres en estas líneas un abrazo para los días
              difíciles. Cuando cierres los ojos, recuerda nuestras risas, los planes que soñamos y que lo que hemos
              vivido es real y precioso. Si alguna vez te sientes sola o te cuesta seguir, vuelve aquí y recuérdate que
              eres fuerte, capaz y merecedora de todo lo bueno.
            </blockquote>

            <div className="space-y-2">
              <p className="font-medium text-pink-600">Pequeños recordatorios para llevar contigo:</p>
              <ul className="list-disc list-inside text-sm text-gray-800">
                <li>Respira: un minuto de respiración puede ayudarte a reencontrarte.</li>
                <li>No te castigues por los días difíciles; cada paso, por pequeño que sea, cuenta.</li>
                <li>Tu sonrisa y tus gestos importan más de lo que imaginas; son fuerza y ternura.</li>
                <li>Estoy orgulloso de ti, hoy y siempre, incluso cuando no lo notes.</li>
              </ul>
            </div>

            <p className="leading-relaxed">
              Aunque no pueda estar en cada momento, quiero que sientas que alguien te acompaña en pensamiento y en
              corazón. Piensa en esto como una carta que puedes leer las veces que necesites: aquí siempre habrá un
              recordatorio de que no estás sola y de que mereces cuidado, calma y cariño.
            </p>

            <p className="italic text-sm text-gray-500">Con todo mi cariño, siempre tu gordis. 💕</p>

            <div className="pt-2 flex flex-col sm:flex-row sm:justify-end gap-2">
              <Button onClick={() => setOpen(false)} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
