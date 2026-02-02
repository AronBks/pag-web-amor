"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Heart,
  Calendar,
  CalendarHeart,
  Camera,
  Star,
  Sparkles,
  Coffee,
  MapPin,
  Home,
  Gamepad2,
  Music4,
} from "lucide-react"
import { HerGallery } from "@/components/ui/her-gallery"
import { SpecialMessage } from "@/components/ui/special-message"
import BackButton from "@/components/ui/back-button"
import LoveCalendar from "@/components/ui/love-calendar"
import MusicDedicationSection from "@/components/ui/music-dedication"
import { GalleryUpload } from "./components/ui/gallery-upload"
import { PhotoMosaic } from "./components/ui/photo-mosaic"

export default function Component() {
  const [currentSection, setCurrentSection] = useState("main")
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)

  const datePlans = [
    {
      id: 1,
      title: "Café y Postres Nuevos 🧁",
      description: "Probar ese lugar que vimos en redes sociales",
      icon: <Coffee className="text-brown-600" size={32} />,
      details: "Ir a ese café que vimos y probar sus postres juntos: pedir algo nuevo, compartir una porción y tomar fotos para recordar la tarde.",
    },
    {
      id: 2,
      title: "Aventura Urbana 🌟",
      description: "Explorar rincones nuevos de la ciudad",
      icon: <MapPin className="text-blue-600" size={32} />,
      details: "Perdernos un rato por la ciudad, descubrir murales, cafeterías escondidas y miradores, y terminar con una sorpresa improvisada.",
    },
    {
      id: 3,
      title: "Gaming Night Mejorada 🎮",
      description: "Juegos nuevos, snacks y competencia sana",
      icon: <Gamepad2 className="text-purple-600" size={32} />,
      details: "Noche de juegos con snacks especiales, risas y desafíos; el objetivo: pasarlo increíble juntos (y sí, una pequeña competencia sana).",
    },
    {
      id: 4,
      title: "Date Night en Casa 🏠",
      description: "Cocinar algo especial y series/películas",
      icon: <Home className="text-green-600" size={32} />,
      details: "Cocinamos algo juntos, probamos una nueva receta, ponemos esa película que nos encanta y nos quedamos abrazados hasta quedarnos dormidos.",
    },
  ]

  const futureThings = [
    {
      id: 1,
      title: "Nuestro primer viaje juntos",
      hint: "Tengo algunos destinos en mente... ¿playa o montaña? 🏖️⛰️",
      icon: "✈️",
      description: "Planear una escapada memorable, solo nosotros dos",
    },
    {
      id: 2,
      title: "Escapada de fin de semana",
      hint: "Un plan cortito para desconectar y crear recuerdos juntos... 🌄☕",
      icon: "🚗",
      description: "Un fin de semana fuera para explorar y relajarnos, sin prisas y solo nosotros.",
    },
    {
      id: 3,
      title: "Crear más tradiciones nuestras",
      hint: "Como nuestros juegos, nuestras series, nuestros lugares especiales 💕",
      icon: "💖",
      description: "Cosas que sean únicamente nuestras y que recordemos siempre",
    },
  ]

  return (
    <div className="min-h-screen relative z-10 p-4">
      {/* Remove old floating elements since we have Hello Kitty background now */}

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <div className="flex justify-center items-center mb-6">
            <img
              src="/fotos-nosotros/foto principal.jpg"
              alt="Nosotros"
              className="w-40 h-40 rounded-full border-4 border-pink-300 shadow-lg object-cover transform transition-all duration-500 hover:scale-110 hover:shadow-2xl"
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
            <div className="space-y-8">
              <PhotoMosaic />
              
              <div className="max-w-2xl mx-auto px-2">
                <GalleryUpload onUploadSuccess={() => {
                  // This will trigger a refresh in components that fetch images
                  window.dispatchEvent(new CustomEvent('gallery-updated'))
                }} />
              </div>
            </div>

            {/* Main Card */}
            <Card className="bg-white/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 relative z-20">
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

                <div className="grid gap-4 mt-8 items-stretch sm:grid-cols-2 lg:grid-cols-4">
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
                    className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white p-6 h-auto flex flex-col gap-2 rounded-xl shadow-lg"
                  >
                    <Camera size={32} />
                    <span className="font-semibold">Un Rincón para Ti</span>
                    <span className="text-sm opacity-90">Una galería dedicada a ti</span>
                  </Button>

                  <Button
                    onClick={() => setCurrentSection("calendar")}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white p-6 h-auto flex flex-col gap-2 rounded-xl shadow-lg"
                  >
                    <CalendarHeart size={32} />
                    <span className="font-semibold">Nuestro Calendario</span>
                    <span className="text-sm opacity-90">Organiza planes y sorpresas juntos</span>
                  </Button>

                  <Button
                    onClick={() => setCurrentSection("music")}
                    className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white p-6 h-auto flex flex-col gap-2 rounded-xl shadow-lg"
                  >
                    <Music4 size={32} />
                    <span className="font-semibold">Música especial</span>
                    <span className="text-sm opacity-90">Dedicatorias con canciones</span>
                  </Button>
                </div>

                <div className="flex justify-center mt-6">
                  <div className="w-full md:w-2/3 lg:w-1/2">
                    <SpecialMessage />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Promises */}
            <Card className="bg-gradient-to-r from-pink-100/95 to-purple-100/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 relative z-20">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-pink-700 mb-2">Cosas que amo de estar contigo</h3>
                  <div className="flex justify-center">
                    <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-pink-50 to-pink-25 rounded-xl border border-pink-200 shadow-md shadow-romantic transform transition-all hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                            <Heart className="text-white" size={20} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-pink-700 mb-1 text-lg">Cada día descubro algo nuevo que amo de ti</h4>
                            <p className="text-gray-700 text-sm">
                              Tu mirada, tu risa y esos pequeños gestos que hacen que cada momento contigo sea único. 
                              Gracias por regalarme algo nuevo que admirar cada día.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-25 rounded-xl border border-purple-200 shadow-md shadow-romantic transform transition-all hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                            <Sparkles className="text-white" size={20} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-purple-700 mb-1 text-lg">Tu sonrisa lo cura todo</h4>
                            <p className="text-gray-700 text-sm">
                              En los días grises tu sonrisa es mi luz; tiene la magia de transformar cualquier preocupación en calma.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-25 rounded-xl border border-blue-200 shadow-md shadow-romantic transform transition-all hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                            <Star className="text-white" size={20} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-blue-700 mb-1 text-lg">Contigo, todo tiene sentido</h4>
                            <p className="text-gray-700 text-sm">Tu compañía me da fuerza y me recuerda que juntos podemos con lo que venga.</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-green-50 to-green-25 rounded-xl border border-green-200 shadow-md shadow-romantic transform transition-all hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                            <Heart className="text-white" size={20} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-green-700 mb-1 text-lg">Eres mi refugio y mi inspiración</h4>
                            <p className="text-gray-700 text-sm">Gracias por tu ternura y por enseñarme a ser mejor cada día.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {currentSection === "plans" && (
          <div className="space-y-6">
            <div className="text-center">
              <BackButton onClick={() => setCurrentSection("main")} label="← Volver" />
              <h2 className="text-3xl font-bold text-pink-700 mb-4">Planes que tengo en mente</h2>
              <p className="text-pink-500">Dime cuál te llama más la atención</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {datePlans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    selectedPlan === plan.id ? "ring-4 ring-pink-300 bg-pink-50" : "bg-white/80"
                  } border-pink-200 shadow-lg`}
                  onClick={() => setSelectedPlan(selectedPlan === plan.id ? null : plan.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">{plan.icon}</div>
                    <h3 className="text-xl font-bold text-pink-700 mb-2">{plan.title}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    {selectedPlan === plan.id && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg border border-pink-200">
                        <p className="text-sm text-gray-700 mb-3">{plan.details}</p>
                        <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                          Me gusta esta idea
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentSection === "future" && (
          <div className="space-y-6">
            <div className="text-center">
              <BackButton onClick={() => setCurrentSection("main")} label="← Volver" />
              <h2 className="text-3xl font-bold text-purple-700 mb-4">Cosas que quiero hacer contigo</h2>
              <p className="text-purple-500">Planes a futuro que tengo en mente...</p>
            </div>

            <div className="space-y-6">
              {futureThings.map((item) => (
                <Card key={item.id} className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full flex items-center justify-center">
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-purple-700 mb-2">{item.title}</h3>
                        <p className="text-gray-700 mb-2">{item.hint}</p>
                        <p className="text-sm text-purple-600 italic">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-gradient-to-r from-blue-100 to-purple-100 border-blue-200">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold text-blue-700 mb-2">Y muchas cosas más...</h3>
                  <p className="text-gray-700 text-sm">
                    Conforme vayamos siendo novios, se me van a ocurrir más ideas de cosas que hacer juntos.
                    <br />
                    <span className="italic">Lo importante es que las vamos a vivir juntos 💕</span>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentSection === "memories" && (
          <HerGallery onBack={() => setCurrentSection("main")} />
        )}

        {currentSection === "calendar" && (
          <LoveCalendar onBack={() => setCurrentSection("main")} />
        )}

        {currentSection === "music" && (
          <MusicDedicationSection onBack={() => setCurrentSection("main")} />
        )}
        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-lg font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Con cariño 💕
          </p>
          <p className="text-pink-400 text-sm mt-2">Tu gordis</p>
        </div>
      </div>
    </div>
  )
}
