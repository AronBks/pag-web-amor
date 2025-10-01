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
          if (src.includes("ella1.jpg")) {
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
                <Card className="bg-pink-50 border-pink-200">
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
                <Card className="bg-pink-50 border-pink-200">
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
                <Card className="bg-pink-50 border-pink-200">
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
                <Card className="bg-pink-50 border-pink-200">
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
                <Card className="bg-pink-50 border-pink-200">
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
                <Card className="bg-pink-50 border-pink-200">
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
                <Card className="bg-pink-50 border-pink-200">
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
                <Card className="bg-pink-50 border-pink-200">
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
          if (src.includes("ella4.jpg")) {
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
                <Card className="bg-pink-50 border-pink-200">
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
                <Card className="bg-pink-50 border-pink-200">
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
          if (src.includes("ella5.jpg")) {
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
                <Card className="bg-pink-50 border-pink-200">
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