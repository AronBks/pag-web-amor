"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Heart, Loader2, Upload, X } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface GalleryUploadProps {
  onUploadSuccess?: () => void
}

export function GalleryUpload({ onUploadSuccess }: GalleryUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [caption, setCaption] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "Archivo demasiado grande",
          description: "La imagen no debe superar los 5MB",
          variant: "destructive",
        })
        return
      }
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("caption", caption)

    try {
      const response = await fetch("/api/love-gallery", {
        method: "POST",
        body: formData,
      })

      let errorMessage = "Error al subir la imagen"
      
      if (!response.ok) {
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch (e) {
          // If response is not JSON (e.g. 500 HTML error page)
          errorMessage = `Error del servidor (${response.status}). Asegúrate de haber configurado el Storage y la tabla en Supabase.`
        }
        throw new Error(errorMessage)
      }

      toast({
        title: "¡Imagen subida! ✨",
        description: "Tu recuerdo ha sido guardado correctamente.",
      })

      setFile(null)
      setPreview(null)
      setCaption("")
      if (onUploadSuccess) onUploadSuccess()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="border-pink-200 bg-white/80 backdrop-blur-sm shadow-md overflow-hidden">
      <CardHeader className="bg-pink-50/50 pb-4">
        <CardTitle className="text-xl flex items-center gap-2 text-pink-700">
          <Camera className="w-5 h-5 text-pink-500" />
          Añadir Nuevo Recuerdo
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {!preview ? (
          <div className="border-2 border-dashed border-pink-200 rounded-xl p-8 text-center hover:bg-pink-50/50 transition-colors cursor-pointer relative">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <Upload className="w-10 h-10 text-pink-300 mx-auto mb-2" />
            <p className="text-pink-600 font-medium">Pulsa para elegir una foto</p>
            <p className="text-pink-400 text-sm mt-1">PNG, JPG hasta 5MB</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative group aspect-video rounded-xl overflow-hidden border border-pink-100">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <button
                onClick={() => { setFile(null); setPreview(null); }}
                className="absolute top-2 right-2 bg-pink-500 hover:bg-pink-600 text-white p-1.5 rounded-full shadow-lg transition-transform hover:scale-110"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="caption" className="text-pink-700">Mensaje o fecha (opcional)</Label>
              <Input
                id="caption"
                placeholder="Ej: Nuestra primera cita..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="border-pink-200 focus:ring-pink-500"
              />
            </div>

            <Button
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-6 rounded-xl shadow-lg transition-all hover:shadow-pink-200 transform hover:scale-[1.01] active:scale-95"
              disabled={isUploading}
              onClick={handleUpload}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Guardando tu momento mágico...
                </>
              ) : (
                <span className="flex items-center gap-2">
                  <Heart className="w-5 h-5 fill-current" />
                  ¡Subir Recuerdo Inolvidable! ❤️
                </span>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
