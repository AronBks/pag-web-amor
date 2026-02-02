"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Calendar, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface RemoteImage {
  id: string
  url: string
  caption: string
  date: string
  created_at: string
}

const staticImages = [
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
  "/fotos-nosotros/foto 18.jpg",
]

const staticImageDates: Record<string, string> = {
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
  "/fotos-nosotros/foto 17.jpg": "2025-10-01",
  "/fotos-nosotros/foto 18.jpg": "2025-10-10",
}

function formatDateLong(dateStr: string) {
  if (!dateStr) return ""
  try {
    const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    let d: Date
    if (m) {
      d = new Date(parseInt(m[1]), parseInt(m[2]) - 1, parseInt(m[3]))
    } else {
      d = new Date(dateStr)
    }
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch (e) {
    return dateStr
  }
}

export function PhotoMosaic() {
  const [remoteImages, setRemoteImages] = React.useState<RemoteImage[]>([])
  const [loading, setLoading] = React.useState(true)

  const fetchImages = React.useCallback(() => {
    fetch("/api/love-gallery")
      .then(res => res.json())
      .then(data => {
        if (data.images) setRemoteImages(data.images)
      })
      .catch(err => console.error("Error fetching images:", err))
      .finally(() => setLoading(false))
  }, [])

  React.useEffect(() => {
    fetchImages()
    const handleUpdate = () => fetchImages()
    window.addEventListener('gallery-updated', handleUpdate)
    return () => window.removeEventListener('gallery-updated', handleUpdate)
  }, [fetchImages])

  const allImages = React.useMemo(() => {
    const remote = remoteImages.map(img => ({ 
      id: img.id, 
      url: img.url, 
      date: img.date, 
      caption: img.caption,
      isRemote: true 
    }))
    const statics = staticImages.map((url, i) => ({ 
      id: `static-${i}`, 
      url, 
      date: staticImageDates[url] || "", 
      caption: "",
      isRemote: false 
    }))
    
    // Shuffle only the static images once, then keep that order
    const shuffledStatics = [...statics].sort(() => Math.random() - 0.5);
    
    // Put remote images (newest ones) strictly at the beginning, then the shuffled local ones
    return [...remote, ...shuffledStatics]
  }, [remoteImages])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-bold text-pink-700 flex items-center gap-2">
          <Sparkles className="text-pink-400 w-5 h-5" />
          Muro de Recuerdos
        </h2>
        <span className="text-[10px] md:text-xs text-pink-400 font-medium bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
          {allImages.length} momentos guardados
        </span>
      </div>

      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center bg-pink-50/30 rounded-3xl border-2 border-dashed border-pink-100 italic text-pink-300">
          <Heart className="w-8 h-8 animate-bounce mb-2" />
          Cargando nuestros momentos...
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[200px]">
          <AnimatePresence mode="popLayout">
            {allImages.map((img, index) => {
              const isLarge = index % 5 === 0;
              return (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ 
                    duration: 0.5, 
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                  className={`relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border-2 border-white ${
                    isLarge ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
                  }`}
                >
                  <div className="w-full h-full relative">
                    <img
                      src={img.url}
                      alt="Recuerdo"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-5">
                      {img.caption && (
                        <p className="text-white text-xs md:text-sm font-semibold mb-1 line-clamp-2 italic">"{img.caption}"</p>
                      )}
                      {img.date && (
                        <div className="flex items-center gap-1 text-[10px] md:text-xs text-pink-200">
                          <Calendar className="w-3 h-3" />
                          {formatDateLong(img.date)}
                        </div>
                      )}
                    </div>

                    {/* New badge for remote images */}
                    {img.isRemote && (
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-pink-600 text-[8px] md:text-[10px] font-black px-3 py-1 rounded-full shadow-lg border border-pink-100 tracking-wider">
                        NEW RECUERDO ✨
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      <div className="text-center py-2">
        <p className="text-pink-400 text-xs italic flex items-center justify-center gap-2">
          <Heart className="w-3 h-3 animate-pulse" />
          Haz scroll para ver más momentos preciosos
        </p>
      </div>
    </div>
  )
}
