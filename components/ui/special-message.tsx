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
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white p-6 min-h-[140px] flex flex-col items-center justify-center gap-2 rounded-xl shadow-lg text-center break-words"
        >
          <span className="text-2xl">💌</span>
          <span className="font-semibold">Mensaje para Kitty</span>
          <span className="text-sm opacity-90">Un recordatorio bonito para cuando lo necesites</span>
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

        <div className="bg-white rounded-xl shadow-2xl ring-1 ring-gray-100 p-6 mt-4">
          <div className="p-2 space-y-6 text-gray-800">
            <p className="text-lg md:text-xl leading-relaxed">
              Mi querida Kitty, quiero que este mensaje sea como una pequeña caja que puedas abrir cuando me necesites:
              palabras que te recuerden lo mucho que vales, cuánto inspiras y que, aunque en algún momento yo no esté
              físicamente a tu lado, mi recuerdo y mi cariño siempre estarán contigo.
            </p>

            <blockquote className="border-l-4 border-pink-300 pl-4 italic bg-gray-50 p-4 rounded">
              Guarda esto: soy tu rincón seguro. Cuando cierres los ojos, piensa en nuestras risas, en las aventuras
              que vendrán, y en que nadie puede borrar lo que ya hemos vivido. Si alguna vez dudas, vuelve aquí y
              recuérdate que tú eres capaz y mereces todo lo bueno.
            </blockquote>

            <div className="space-y-2">
              <p className="font-medium text-pink-600">Pequeños recordatorios que puedes llevar contigo:</p>
              <ul className="list-disc list-inside text-sm text-gray-800">
                <li>Respira: un minuto es suficiente para reencontrarte.</li>
                <li>No te exijas tanto; cada paso cuenta.</li>
                <li>Tu sonrisa es poderosa; úsala cuando necesites valor.</li>
                <li>Estoy orgulloso de ti, incluso en los días que no lo parezca.</li>
              </ul>
            </div>

            <p className="leading-relaxed">
              Aunque no pueda estar en cada momento, deseo que este mensaje sea la promesa de alguien que te acompaña
              en pensamiento y en corazón. Piénsalo como una carta que se queda aquí para que la leas mil veces:
              «Estoy contigo no solamente en los días claros, sino también en los nublados y siempre esperaré poder
              abrazarte de nuevo.»
            </p>

            <p className="italic text-sm text-gray-500">Siempre tu gordis, guardando tus sonrisas en mi memoria y esperando las próximas. 💕</p>

            <div className="pt-2 flex justify-end">
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
