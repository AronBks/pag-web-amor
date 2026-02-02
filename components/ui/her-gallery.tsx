"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Trash2 } from "lucide-react"
import { GalleryUpload } from "./gallery-upload"
import { useState, useEffect } from "react"

interface RemoteImage {
  id: string
  url: string
  caption: string
  date: string
  created_at: string
}

const herPhotos = [
  "/fotos-nosotros/ella1.jpg",
  "/fotos-nosotros/ella2.jpg",
  "/fotos-nosotros/ella3.jpg",
  "/fotos-nosotros/ella4.jpg",
  "/fotos-nosotros/ella5.jpg",
  "/fotos-nosotros/ella6.jpg",
  "/fotos-nosotros/ella7.jpg",
  "/fotos-nosotros/ella8.jpg",
  "/fotos-nosotros/ella10.jpg",
  "/fotos-nosotros/ella11.jpg",
  "/fotos-nosotros/ella12.jpg",
  "/fotos-nosotros/ella13.jpg",
  "/fotos-nosotros/ella14.jpg",
  "/fotos-nosotros/ella15.jpg",
  "/fotos-nosotros/ella16.jpg",
  "/fotos-nosotros/ella17.jpg",
  "/fotos-nosotros/ella18.jpg",
  "/fotos-nosotros/ella19.jpg",
  "/fotos-nosotros/ella20.jpg",
  "/fotos-nosotros/ella22.jpg",
  "/fotos-nosotros/ella23.jpg",
  "/fotos-nosotros/ella25.png",
  "/fotos-nosotros/ella26.jpg",
];

// map each photo to an ISO-ish date string we can format. Keep simple strings here.
const herPhotoDates: Record<string, string> = {
  "/fotos-nosotros/ella1.jpg": "",
  "/fotos-nosotros/ella2.jpg": "2025-07-10",
  "/fotos-nosotros/ella3.jpg": "2025-06-15",
  "/fotos-nosotros/ella4.jpg": "2025-05-05",
  "/fotos-nosotros/ella5.jpg": "2025-04-20",
  "/fotos-nosotros/ella6.jpg": "2025-03-12",
  "/fotos-nosotros/ella7.jpg": "2025-02-28",
  "/fotos-nosotros/ella8.jpg": "2025-01-01",
  "/fotos-nosotros/ella10.jpg": "2024-11-18",
  "/fotos-nosotros/ella11.jpg": "2024-10-07",
  "/fotos-nosotros/ella12.jpg": "2024-09-22",
  "/fotos-nosotros/ella13.jpg": "2025-08-02",
  "/fotos-nosotros/ella14.jpg": "2024-07-14",
  "/fotos-nosotros/ella15.jpg": "2024-06-09",
  "/fotos-nosotros/ella16.jpg": "",
  "/fotos-nosotros/ella17.jpg": "",
  "/fotos-nosotros/ella18.jpg": "",
  "/fotos-nosotros/ella19.jpg": "",
  "/fotos-nosotros/ella20.jpg": "",
  "/fotos-nosotros/ella22.jpg": "",
  "/fotos-nosotros/ella23.jpg": "",
  "/fotos-nosotros/ella25.png": "",
  "/fotos-nosotros/ella26.jpg": "",
}

function formatDateLong(dateStr: string) {
  try {
    // Parse YYYY-MM-DD to avoid timezone shifts when using new Date(string)
    const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    let d: Date
    if (m) {
      const year = parseInt(m[1], 10)
      const month = parseInt(m[2], 10) - 1
      const day = parseInt(m[3], 10)
      d = new Date(year, month, day)
    } else {
      d = new Date(dateStr)
    }
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch (e) {
    return dateStr
  }
}

interface HerGalleryProps {
  onBack: () => void;
}

export function HerGallery({ onBack }: HerGalleryProps) {
  const [remoteImages, setRemoteImages] = useState<RemoteImage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/love-gallery")
      if (response.ok) {
        const data = await response.json()
        setRemoteImages(data.images || [])
      }
    } catch (error) {
      console.error("Error fetching images:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
    
    // Listen for updates from the main page upload
    const handleUpdate = () => fetchImages()
    window.addEventListener('gallery-updated', handleUpdate)
    return () => window.removeEventListener('gallery-updated', handleUpdate)
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que quieres borrar este momento?")) return
    try {
      const response = await fetch(`/api/love-gallery?id=${id}`, { method: 'DELETE' })
      if (response.ok) {
        setRemoteImages(remoteImages.filter(img => img.id !== id))
      }
    } catch (error) {
      console.error("Error deleting image:", error)
    }
  }

  return (
    <div className="space-y-12 relative z-20">
      <div className="text-center">
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-6 border-pink-400 text-pink-700 bg-white/95 backdrop-blur-md hover:bg-pink-50"
        >
          ← Volver
        </Button>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent mb-4">
          Mi Persona Favorita 🐱💕
        </h2>
        <p className="text-pink-700 font-medium">Una pequeña galería para la chica más increíble del mundo 🌸</p>
      </div>

      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {/* Render Remote Images first */}
        {remoteImages.map((image) => (
          <div key={image.id} className="break-inside-avoid">
            <Card className="bg-white/95 backdrop-blur-md border-pink-200 shadow-xl overflow-hidden group hover:scale-[1.02] transition-transform">
              <CardContent className="p-0 relative">
                <img
                  src={image.url}
                  alt={image.caption || "Recuerdo subido"}
                  className="w-full h-auto"
                />
                <div className="p-3">
                  {image.caption && <p className="text-sm text-pink-700 font-medium">{image.caption}</p>}
                  <p className="text-[10px] text-gray-500 mt-1">{formatDateLong(image.date)}</p>
                </div>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </CardContent>
            </Card>
          </div>
        ))}

        {herPhotos.map((src, index) => {
          if (src.includes("ella1.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <div className="relative">
                      <img
                        src={src}
                        alt="Foto especial de mi novia"
                        className="w-full h-auto rounded-lg shadow-md mb-4"
                      />
                      {herPhotoDates[src] && (
                        <div className="absolute left-3 top-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 10h5v5H7z" opacity=".9" />
                            <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v13a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM5 9h14v10H5z"/>
                          </svg>
                          <span className="text-[11px] leading-none">{formatDateLong(herPhotoDates[src])}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Cuando sonríes así, todo se calma — tu risa es mi canción favorita y mi lugar seguro.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Contigo, incluso los días simples se vuelven inolvidables.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella6.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Me quedo mirando esa luz en tu piel y pienso en todas las tardes que quiero compartir contigo.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Estar cerca de ti es mi lugar favorito.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella11.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Me encanta cómo te queda esa luz; cada mechón parece contar una historia que quiero conocer.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Eres todo lo bonito de mis días.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella2.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        En esta imagen, veo a la madre más amorosa cuidando de nuestro pequeño conejito.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Juntos forman un cuadro perfecto de ternura y felicidad.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella7.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Tus ojos tienen una luz que me atrapa — tan profundos y sinceros que cada mirada tuya me calma el alma.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Perderme en tu mirada es mi forma favorita de estar contigo.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella12.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Tu reflejo en el espejo muestra la fuerza y confianza que admiro tanto en ti.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Cada detalle de ti es un recordatorio de lo increíble que eres.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella3.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Hay algo en tu mirada que transforma cualquier lugar en nuestro pequeño mundo — elegante, sincera y totalmente tuya.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Gracias por ser la mejor compañía en cada aventura.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella8.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        En cada momento, incluso en los más simples, tu belleza y esencia iluminan todo a tu alrededor.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Eres mi paz y mi alegría.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella13.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Quería que ese ramo te recordara cuánto te valoro — pero viéndote ahora, entiendo que ningún ramo puede igualar tu esencia.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Gracias por aceptar mis detalles y por llenar todo de color con tu sonrisa.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }

          if (src.includes("ella26.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Hay momentos en los que tu calma transforma el ruido en paz  en esta foto veo esa serenidad que solo tú sabes dar.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Gracias por enseñarme que la belleza también es tranquilidad.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella4.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Me encanta cómo llevas ese estilo: elegante, natural y con una confianza que me inspira.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Gracias por mostrar siempre tu mejor versión; me haces querer ser mejor también.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella14.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Cada momento contigo, incluso a través de una pantalla, se siente especial.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Tu sonrisa ilumina mi día y me hace sentir más cerca de ti.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella10.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Me encanta cómo te ves en esta foto — tan natural y llena de vida. Cada vez que te veo así, siento que todo está bien.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Gracias por ser mi compañía y por esos pequeños momentos que hacen nuestro día único.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella9.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Incluso cuando duermes, te ves hermosa.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Amo cada momento contigo, hasta los más tranquilos.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella5.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Esta foto me recuerda lo afortunado que soy de caminar a tu lado; tu mirada tiene esa mezcla de ternura y fuerza que me inspira todos los días.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Gracias por cada paso que damos juntos, por los sueños compartidos y por tu compañía incondicional.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella15.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Nuestra foto juntos"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Aquí estamos, en ese momento perfecto donde todo lo demás desaparece y solo existimos nosotros.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Gracias por esos besos que me hacen sentir en casa; cada uno es un recuerdo que atesoro.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella16.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Esa expresión tuya, entre sueños y luces, me recuerda que las cosas pequeñas son las que hacen grandes los recuerdos.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Siempre encuentro poesía en tus gestos — gracias por regalarme instantes que guardo como tesoros.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella17.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Esas dos colitas te quedan como un hechizo; te ves juguetona y libre, y no puedo evitar sonreír.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Tu estilo siempre encuentra la forma perfecta de sorprenderme — pequeñas locuras, grandes recuerdos.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella18.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia con nuestro conejo"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Tayron en tus brazos y tú son la definición de ternura; esa mirada dice más que mil palabras.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Gracias por cuidar de nuestras pequeñas alegrías — contigo, incluso un conejo se siente en casa.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella19.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        En esta foto veo tu calma y esa ternura que siempre te acompaña — me encanta cómo cuidas cada detalle.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Tus pequeños gestos convierten lo cotidiano en algo mágico; gracias por dejarme ser testigo.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella20.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Hay algo en esa mirada que me hace prometer mil aventuras; me encanta cómo eliges vivir con intensidad y ternura.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Tu presencia transforma cualquier lugar en hogar — gracias por ser mi brújula y mi calma.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella21.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia con sus conejos"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Verte con los tres pequeños juntos me llena el corazón — tu cariño los hace crecer felices y seguros.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Gracias por tanta ternura y por enseñarles a amar; tus hijos de pelaje son afortunados de tenerte.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella22.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia con sus conejos"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        En tus manos, hasta lo más suave parece más valiente; tus dos conejos lo saben y te siguen donde vas.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Tu ternura es su refugio — y verlo me recuerda lo afortunados que somos de tenerte.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella23.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia con su conejito acostado"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Ese conejito acostadito parece un bebé abrazado a tu ternura; me derrito viendo lo protectora que eres.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Gracias por regalarle cariño y por esos momentos suaves que llenan de paz el día.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
          if (src.includes("ella24.png")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <img
                      src={src}
                      alt="Foto especial de mi novia con tiara"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">
                        Con esa tiara pareces un sueño hecho princesa — preciosa y llena de fuerza a la vez.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Me encanta cómo te ves cuando brillas; siempre reina en mi corazón.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
              if (src.includes("ella25.png")) {
                return (
                  <div key={index} className="break-inside-avoid">
                    <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                      <CardContent className="p-4">
                        <img
                          src={src}
                          alt="Foto especial de mi novia"
                          className="w-full h-auto rounded-lg shadow-md mb-4"
                        />
                        <div className="text-center">
                          <p className="text-sm text-pink-700 font-semibold">
                            Recuerdo las noches en las que dormíamos juntos; tus abrazos eran mi refugio y mi calma.
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            Aunque ahora la distancia nos separe, siempre serás mi lugar seguro. Nunca lo olvidaré.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              }
          if (index >= 15) {
            // New photos (ella16..ella23): show placeholder card with optional date
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50/95 backdrop-blur-md border-pink-300 shadow-2xl ring-1 ring-pink-200/50 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <div className="relative">
                      <img src={src} alt={`Foto nueva ${index + 1}`} className="w-full h-auto rounded-lg shadow-md mb-4" />
                      {herPhotoDates[src] && herPhotoDates[src].length > 0 && (
                        <div className="absolute left-3 top-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 10h5v5H7z" opacity=".9" />
                            <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v13a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM5 9h14v10H5z"/>
                          </svg>
                          <span className="text-[11px] leading-none">{formatDateLong(herPhotoDates[src])}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-pink-700 font-semibold">Pronto agregaré un mensaje bonito para esta foto.</p>
                      <p className="text-xs text-gray-600 mt-1">Si quieres, dime qué quieres que ponga aquí.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }

          return (
            <div key={index} className="break-inside-avoid">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={src}
                  alt={`Foto de mi novia ${index + 1}`}
                  className="w-full h-auto rounded-xl shadow-lg object-cover transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-70 transition-opacity duration-500"></div>
                <div className="absolute left-4 bottom-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-500 text-sm font-semibold">
                  Ver recuerdo
                </div>
              </div>
            </div>
          );
        })}
      </div>
       <Card className="bg-gradient-to-r from-blue-100 to-purple-100 border-blue-200 mt-6">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-bold text-blue-700 mb-2">Eres arte</h3>
            <p className="text-gray-700 text-sm">
              Podría pasar horas viéndote y nunca me cansaría de tu belleza.
              <br />
              <span className="italic">Gracias por dejarme ser parte de tu vida 💕</span>
            </p>
          </CardContent>
        </Card>
    </div>
  );
}
