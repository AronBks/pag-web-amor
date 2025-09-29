"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

const herPhotos = [
  "/fotos-nosotros/ella1.jpg",
  "/fotos-nosotros/ella2.jpg",
  "/fotos-nosotros/ella3.jpg",
  "/fotos-nosotros/ella4.jpg",
  "/fotos-nosotros/ella5.jpg",
  "/fotos-nosotros/ella6.jpg",
  "/fotos-nosotros/ella7.jpg",
  "/fotos-nosotros/ella8.jpg",
  "/fotos-nosotros/ella9.jpg",
  "/fotos-nosotros/ella10.jpg",
  "/fotos-nosotros/ella11.jpg",
  "/fotos-nosotros/ella12.jpg",
  "/fotos-nosotros/ella13.jpg",
  "/fotos-nosotros/ella14.jpg",
  "/fotos-nosotros/ella15.jpg",
];

interface HerGalleryProps {
  onBack: () => void;
}

export function HerGallery({ onBack }: HerGalleryProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-6 border-pink-300 text-pink-600"
        >
          ← Volver
        </Button>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent mb-4">
          Mi Persona Favorita
        </h2>
        <p className="text-gray-600">Una pequeña galería para la chica más increíble del mundo.</p>
      </div>

      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {herPhotos.map((src, index) => {
          if (src.includes("ella9.jpg")) {
            return (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-pink-50 border-pink-200">
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
          return (
            <div key={index} className="break-inside-avoid">
              <img
                src={src}
                alt={`Foto de mi novia ${index + 1}`}
                className="w-full h-auto rounded-xl shadow-lg object-cover transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              />
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