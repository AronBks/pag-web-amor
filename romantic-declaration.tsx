"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Sparkles, Star, Camera, Calendar, MapPin, Gamepad2, Coffee, Home } from "lucide-react"

export default function Component() {
  const [showMessage, setShowMessage] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const reasons = [
    "Eres tan dulce como Hello Kitty 🎀",
    "Tu curiosidad me enamora como Jorge el Curioso 🐵",
    "Contigo cada día es una nueva aventura",
    "Tu sonrisa ilumina mi mundo como el sol",
    "Eres mi persona favorita en todo el universo",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-200 p-4">
      {/* Floating Hearts Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-pink-300 animate-bounce opacity-60`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
            size={16 + Math.random() * 16}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <div className="flex justify-center items-center gap-4 mb-6">
            <img
              src="/placeholder.svg?height=80&width=80"
              alt="Hello Kitty"
              className="w-20 h-20 rounded-full border-4 border-pink-300 shadow-lg"
            />
            <Heart className="text-red-500 animate-pulse" size={40} />
            <img
              src="/placeholder.svg?height=80&width=80"
              alt="Jorge el Curioso"
              className="w-20 h-20 rounded-full border-4 border-yellow-300 shadow-lg"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-4">Para Mi Amor Especial</h1>
          <p className="text-xl text-pink-500 font-medium">
            Una declaración tan dulce como Hello Kitty y tan aventurera como Jorge 💕
          </p>
        </div>

        {/* Main Declaration Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
          <CardContent className="p-8 text-center space-y-6">
            <div className="flex justify-center mb-6">
              <Sparkles className="text-pink-400 animate-spin" size={48} />
            </div>

            <h2 className="text-3xl font-bold text-pink-700 mb-6">Mi Corazón Tiene Algo Que Decirte...</h2>

            <div className="text-lg text-gray-700 space-y-4 max-w-2xl mx-auto">
              <p className="leading-relaxed">
                Como Hello Kitty, eres la ternura hecha persona, llenas mi vida de dulzura y color. Como Jorge el
                Curioso, despiertas en mí las ganas de explorar el mundo contigo.
              </p>

              <p className="leading-relaxed font-medium text-pink-600">
                Cada día a tu lado es una nueva aventura, y quiero vivir todas las aventuras que nos quedan... ¡juntos!
              </p>
            </div>

            {!showMessage ? (
              <Button
                onClick={() => setShowMessage(true)}
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                💕 ¿Quieres ser mi novia? 💕
              </Button>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <div className="text-2xl font-bold text-pink-600">¡Espero tu respuesta! 💖</div>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={() => setCurrentStep(1)}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full"
                  >
                    ¡SÍ! 💕
                  </Button>
                  <Button
                    variant="outline"
                    className="border-pink-300 text-pink-600 hover:bg-pink-50 px-6 py-2 rounded-full"
                  >
                    Déjame pensarlo 🤔
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* If she says yes - Show special content */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <Card className="bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200 shadow-xl">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold text-pink-700 mb-6">¡Eres Increíble! 🎉💕</h2>
                <p className="text-xl text-pink-600 mb-6">
                  Ahora que somos novios oficiales, aquí tienes algunas promesas especiales:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <Card className="bg-white/60 border-pink-200">
                    <CardContent className="p-6 text-center">
                      <img
                        src="/placeholder.svg?height=100&width=100"
                        alt="Hello Kitty Promise"
                        className="w-24 h-24 mx-auto mb-4 rounded-full"
                      />
                      <h3 className="text-lg font-bold text-pink-600 mb-2">Promesa Hello Kitty</h3>
                      <p className="text-gray-700">
                        Seré tan dulce y cariñoso contigo como Hello Kitty. Te llenaré de amor y ternura todos los días.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/60 border-yellow-200">
                    <CardContent className="p-6 text-center">
                      <img
                        src="/placeholder.svg?height=100&width=100"
                        alt="Jorge Promise"
                        className="w-24 h-24 mx-auto mb-4 rounded-full"
                      />
                      <h3 className="text-lg font-bold text-yellow-600 mb-2">Promesa Jorge el Curioso</h3>
                      <p className="text-gray-700">
                        Exploraremos el mundo juntos, viviremos aventuras increíbles y nunca dejaremos de descubrir
                        cosas nuevas.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Reasons why I love you */}
            <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-pink-700 text-center mb-6">Razones por las que te amo 💖</h2>
                <div className="space-y-4">
                  {reasons.map((reason, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-pink-50 rounded-lg border border-pink-200"
                    >
                      <Star className="text-yellow-500 flex-shrink-0" size={20} />
                      <span className="text-gray-700 font-medium">{reason}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Future plans */}
            <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-pink-200 shadow-xl">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-purple-700 mb-4">Nuestras Futuras Aventuras 🌟</h2>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-white/60 rounded-lg">
                    <span className="text-2xl mb-2 block">🎀</span>
                    <p className="text-sm text-gray-700">Citas súper tiernas y románticas</p>
                  </div>
                  <div className="p-4 bg-white/60 rounded-lg">
                    <span className="text-2xl mb-2 block">🐵</span>
                    <p className="text-sm text-gray-700">Aventuras y viajes increíbles</p>
                  </div>
                  <div className="p-4 bg-white/60 rounded-lg">
                    <span className="text-2xl mb-2 block">💕</span>
                    <p className="text-sm text-gray-700">Amor infinito y felicidad</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-pink-500 font-medium">Con todo mi amor 💕</p>
          <p className="text-pink-400 text-sm mt-2">Tu futuro novio que te ama muchísimo 🥰</p>
        </div>
      </div>
    </div>
  )
}
