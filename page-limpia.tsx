"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Calendar, Camera, Star, Sparkles, Coffee, MapPin, Gamepad2, Home } from "lucide-react"

export default function Component() {
  const [currentSection, setCurrentSection] = useState("main")

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 p-4">
      {/* Floating Elements Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={`heart-${i}`}
            className={`absolute text-pink-300 animate-bounce opacity-60`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
            size={12 + Math.random() * 20}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <div className="flex justify-center items-center gap-6 mb-6">
            <img
              src="/placeholder.svg?height=80&width=80"
              alt="Nosotros"
              className="w-20 h-20 rounded-full border-4 border-pink-300 shadow-lg"
            />
            <Heart className="text-red-500 animate-pulse" size={40} />
            <img
              src="/placeholder.svg?height=80&width=80"
              alt="Juntos"
              className="w-20 h-20 rounded-full border-4 border-purple-300 shadow-lg"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Para Mi Kitty 🐱💕
          </h1>
          <p className="text-xl text-pink-500 font-medium">
            Ya llevamos varios meses juntos y cada día me enamoro más de ti ✨
          </p>
        </div>

        {currentSection === "main" && (
          <>
            {/* Photo Gallery Section */}
            <Card className="bg-white/90 backdrop-blur-sm border-pink-200 shadow-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-pink-700 mb-2">Nuestros Momentos Especiales 📸</h2>
                  <p className="text-gray-600">He ido agregando nuestras fotos favoritas poco a poco...</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-pink-100"
                    >
                      <div className="text-center">
                        <Camera className="text-pink-400 mb-2 mx-auto" size={24} />
                        <p className="text-xs text-pink-600 font-medium">Foto {i}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200">
                  <div className="flex justify-center mb-2">
                    <div className="bg-pink-100 rounded-full p-2">
                      <Camera className="text-pink-500" size={20} />
                    </div>
                  </div>
                  <h4 className="font-semibold text-pink-700 mb-1">📂 Carpeta para tus fotos</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    He creado la carpeta: <code className="bg-pink-100 px-2 py-1 rounded text-pink-700">public/fotos-nosotros/</code>
                  </p>
                  <p className="text-xs text-gray-500 italic">
                    💕 Sube las fotos ahí y yo las cargaré en la página para ti
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Main Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
              <CardContent className="p-8 text-center space-y-6">
                <div className="flex justify-center mb-6">
                  <Sparkles className="text-pink-400 animate-spin" size={48} />
                </div>

                <h2 className="text-3xl font-bold text-pink-700 mb-6">¡He estado actualizando esto para ti! 🎉</h2>

                <div className="text-lg text-gray-700 space-y-4 max-w-2xl mx-auto">
                  <p>
                    Mi querida Kitty, he estado trabajando en esta página especial para ti. Cada vez que vivimos 
                    algo bonito juntos, vengo aquí y agrego algo nuevo... fotos, recuerdos, planes nuevos. 💕
                  </p>

                  <p className="font-medium text-purple-600">
                    Después de todo este tiempo contigo, quería que tuvieras un lugar donde pudieras ver lo mucho 
                    que significas para mí. He ido guardando nuestros momentos y agregándolos poco a poco 😊✨
                  </p>
                  
                  <p className="text-pink-600 font-semibold">
                    Cada día encuentro una nueva razón para amarte más, mi gatita hermosa 🐱💖
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  <Button
                    onClick={() => setCurrentSection("plans")}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white p-6 h-auto flex flex-col gap-2 rounded-xl shadow-lg"
                  >
                    <Calendar size={32} />
                    <span className="font-semibold">Nuevos Planes</span>
                    <span className="text-sm opacity-90">Ideas frescas para nosotros</span>
                  </Button>

                  <Button
                    onClick={() => setCurrentSection("memories")}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white p-6 h-auto flex flex-col gap-2 rounded-xl shadow-lg"
                  >
                    <Heart size={32} />
                    <span className="font-semibold">Lo Que Siento</span>
                    <span className="text-sm opacity-90">Mis pensamientos sobre nosotros</span>
                  </Button>

                  <Button
                    onClick={() => setCurrentSection("future")}
                    className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white p-6 h-auto flex flex-col gap-2 rounded-xl shadow-lg"
                  >
                    <Star size={32} />
                    <span className="font-semibold">Proyectos Juntos</span>
                    <span className="text-sm opacity-90">Lo que quiero lograr contigo</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {currentSection === "plans" && (
          <Card className="bg-white/90 backdrop-blur-sm border-pink-200 shadow-xl">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-pink-700">Nuevos Planes Para Nosotros</h2>
                <Button
                  onClick={() => setCurrentSection("main")}
                  variant="outline"
                  className="border-pink-300 text-pink-600"
                >
                  ← Volver
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/80 border-pink-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Coffee className="text-brown-600" size={32} />
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">Café y Postres Nuevos 🧁</h3>
                        <p className="text-sm text-gray-600">Probar ese lugar que vimos en redes sociales</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">Vamos a ese café aesthetic que encontramos, pedimos algo diferente y nos tomamos fotos bonitas para nuestras historias</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 border-pink-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <MapPin className="text-blue-600" size={32} />
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">Aventura Urbana 🌟</h3>
                        <p className="text-sm text-gray-600">Explorar rincones nuevos de la ciudad</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">Actuamos como turistas en nuestra propia ciudad, visitamos murales, miradores o lugares que hemos visto en Instagram</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 border-pink-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Gamepad2 className="text-purple-600" size={32} />
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">Gaming Night Mejorada 🎮</h3>
                        <p className="text-sm text-gray-600">Juegos nuevos, snacks y competencia sana</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">Compramos esos snacks que tanto nos gustan, probamos juegos nuevos y vemos quién es mejor... spoiler: siempre gano yo 😏</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 border-pink-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Home className="text-green-600" size={32} />
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">Date Night en Casa 🏠</h3>
                        <p className="text-sm text-gray-600">Cocinar algo especial y series/películas</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">Cocinamos esa receta que guardamos en TikTok, ponemos una serie nueva o esa película que queremos ver, y nos acurrucamos</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}

        {currentSection === "memories" && (
          <Card className="bg-white/90 backdrop-blur-sm border-pink-200 shadow-xl">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-pink-700">Lo Que Siento Por Ti</h2>
                <Button
                  onClick={() => setCurrentSection("main")}
                  variant="outline"
                  className="border-pink-300 text-pink-600"
                >
                  ← Volver
                </Button>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-pink-700 mb-4">Cada día me enamoro más de ti 💕</h3>
                  <p className="text-gray-700">
                    No es solo una frase bonita, es la verdad. Cada mañana que despierto pensando en ti, 
                    cada mensaje tuyo que me hace sonreír, cada momento que pasamos juntos... todo me 
                    confirma que eres la persona perfecta para mí.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">Eres mi gatita especial 🐱</h3>
                  <p className="text-gray-700">
                    Me encanta como eres curiosa como un gatito, como te emocionas por las cosas pequeñas, 
                    como me miras cuando estás feliz. Eres adorable en todo lo que haces y no puedo evitar 
                    derretirme cada vez que sonríes.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-pink-100 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">Nuestros momentos son únicos ✨</h3>
                  <p className="text-gray-700">
                    Desde nuestras pláticas largas hasta nuestros silencios cómodos, desde nuestras aventuras 
                    hasta nuestros planes caseros... cada momento contigo se siente especial y lo guardo 
                    como un tesoro en mi corazón.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentSection === "future" && (
          <Card className="bg-white/90 backdrop-blur-sm border-pink-200 shadow-xl">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-pink-700">Proyectos Juntos</h2>
                <Button
                  onClick={() => setCurrentSection("main")}
                  variant="outline"
                  className="border-pink-300 text-pink-600"
                >
                  ← Volver
                </Button>
              </div>

              <div className="space-y-6">
                <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">✈️</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-pink-700 mb-2">Nuestro primer viaje juntos</h3>
                        <p className="text-gray-700 mb-3">Planear una escapada memorable, solo nosotros dos</p>
                        <div className="bg-white/80 p-3 rounded-lg border border-pink-200">
                          <p className="text-sm text-pink-600 italic">Ya tengo algunos destinos en mente... ¿playa o montaña? 🏖️⛰️</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">🎉</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-purple-700 mb-2">Algo muy especial que tengo preparado</h3>
                        <p className="text-gray-700 mb-3">Una sorpresa que va a hacer que este año sea inolvidable</p>
                        <div className="bg-white/80 p-3 rounded-lg border border-purple-200">
                          <p className="text-sm text-purple-600 italic">Es una sorpresa que llevo planeando desde hace tiempo... 🎁✨</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-50 to-pink-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">💖</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-blue-700 mb-2">Crear más tradiciones nuestras</h3>
                        <p className="text-gray-700 mb-3">Cosas que sean únicamente nuestras y que recordemos siempre</p>
                        <div className="bg-white/80 p-3 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-600 italic">Como nuestros juegos, nuestras series, nuestros lugares especiales 💕</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
