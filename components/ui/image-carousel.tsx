"use client"

import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"

const images = [
  "/fotos-nosotros/foto 1.jpg",
  "/fotos-nosotros/foto 2.jpg",
  "/fotos-nosotros/foto 3.jpg",
  "/fotos-nosotros/foto 4.jpg",
  "/fotos-nosotros/foto 5.jpg",
  "/fotos-nosotros/foto 6.jpg",
  "/fotos-nosotros/foto 7.jpg",
  "/fotos-nosotros/foto 8.jpg",
  "/fotos-nosotros/foto 9.jpg",
  "/fotos-nosotros/foto 10.jpg",
  "/fotos-nosotros/foto 11.jpg",
  "/fotos-nosotros/foto 12.jpg",
  "/fotos-nosotros/foto 13.jpg",
  "/fotos-nosotros/foto 14.jpg",
  "/fotos-nosotros/foto 15.jpg",
  "/fotos-nosotros/foto 16.jpg",
  "/fotos-nosotros/foto 17.jpg",
]
const imageDates: Record<string, string> = {
  "/fotos-nosotros/foto 1.jpg": "2025-06-10",
  "/fotos-nosotros/foto 2.jpg": "2025-06-10",
  "/fotos-nosotros/foto 3.jpg": "2025-06-25",
  "/fotos-nosotros/foto 4.jpg": "2025-07-07",
  "/fotos-nosotros/foto 5.jpg": "2025-07-09",
  "/fotos-nosotros/foto 6.jpg": "2025-07-11",
  "/fotos-nosotros/foto 7.jpg": "2025-07-19",
  "/fotos-nosotros/foto 8.jpg": "2025-07-19",
  "/fotos-nosotros/foto 9.jpg": "2025-08-02",
  "/fotos-nosotros/foto 10.jpg": "2025-09-08",
  "/fotos-nosotros/foto 11.jpg": "2025-09-17",
  "/fotos-nosotros/foto 12.jpg": "2025-09-22",
  "/fotos-nosotros/foto 13.jpg": "2025-09-26",
  "/fotos-nosotros/foto 14.jpg": "2025-09-27",
  "/fotos-nosotros/foto 15.jpg": "2025-09-15",
  "/fotos-nosotros/foto 16.jpg": "2025-09-21",
  "/fotos-nosotros/foto 17.jpg": "",
}

function formatDateLong(dateStr: string) {
  try {
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

export function ImageCarousel() {
  // randomize order on each page load (memoized)
  const shuffledImages = React.useMemo(() => {
    const a = images.slice()
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }, [])

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [Autoplay({ delay: 3500, stopOnInteraction: true })])
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  React.useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => {
      if (emblaApi) emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  const scrollPrev = React.useCallback(() => {
    if (!emblaApi) return
    if (emblaApi.canScrollPrev()) emblaApi.scrollPrev()
  }, [emblaApi])
  const scrollNext = React.useCallback(() => {
    if (!emblaApi) return
    if (emblaApi.canScrollNext()) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-pink-200 shadow-xl overflow-hidden">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-pink-700 mb-2">Nuestros Momentos Especiales 📸</h2>
          <p className="text-gray-600">Una colección de nuestros recuerdos más bonitos.</p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex transition-transform duration-700 ease-in-out">
              {shuffledImages.map((src, index) => (
                  <div className="flex-grow-0 flex-shrink-0 w-full min-w-0" key={index}>
                    <div className="rounded-xl overflow-hidden shadow-lg border-2 border-white bg-pink-50 flex items-center justify-center relative">
                      <img src={src} alt={`Foto ${index + 1}`} className="max-w-full max-h-[60vh] object-contain" />
                    {imageDates[src] && (
                      <div className="absolute left-4 top-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7 10h5v5H7z" opacity=".9" />
                          <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v13a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM5 9h14v10H5z"/>
                        </svg>
                        <span className="text-[11px] leading-none">{formatDateLong(imageDates[src])}</span>
                      </div>
                    )}
                    {/* no overlay; image is centered and fully visible */}
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* swipe-only carousel: indicators removed to keep it minimal and touch-first */}
        </div>

        <div className="text-center mt-4 text-sm text-pink-500 flex items-center justify-center gap-2">
          <Heart size={16} className="animate-pulse" />
          <span>Desliza para ver más momentos</span>
          <Heart size={16} className="animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}
