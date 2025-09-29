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
]

export function ImageCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })])

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-pink-200 shadow-xl overflow-hidden">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-pink-700 mb-2">Nuestros Momentos Especiales 📸</h2>
          <p className="text-gray-600">Una colección de nuestros recuerdos más bonitos.</p>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((src, index) => (
              <div className="flex-grow-0 flex-shrink-0 w-full min-w-0 pl-4" key={index}>
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-2 border-white bg-pink-50 flex items-center justify-center">
                  <img src={src} alt={`Foto ${index + 1}`} className="w-full h-full object-contain" />
                </div>
              </div>
            ))}
          </div>
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
