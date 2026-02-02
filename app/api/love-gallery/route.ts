import { NextRequest, NextResponse } from "next/server"
import { supabaseServerClient } from "@/lib/supabase-server"

const TABLE_NAME = "love_gallery"
const BUCKET_NAME = "gallery"

export async function GET() {
  const supabase = supabaseServerClient()

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching gallery images:", error)
    return NextResponse.json({ message: "Error al cargar la galería" }, { status: 500 })
  }

  return NextResponse.json({ images: data ?? [] })
}

export async function POST(request: NextRequest) {
  const supabase = supabaseServerClient()

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const caption = formData.get("caption") as string | null

    if (!file) {
      return NextResponse.json({ message: "No se proporcionó ningún archivo" }, { status: 400 })
    }

    // 1. Upload file to Supabase Storage
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false
      })

    if (uploadError) {
      console.error("Error uploading to storage:", uploadError)
      return NextResponse.json({ message: "Error al subir la imagen al almacenamiento" }, { status: 500 })
    }

    // 2. Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName)

    // 3. Save reference in database
    const { data: dbData, error: dbError } = await supabase
      .from(TABLE_NAME)
      .insert({
        url: publicUrl,
        caption: caption ?? "",
        date: new Date().toISOString().split('T')[0]
      })
      .select()
      .single()

    if (dbError) {
      console.error("Error saving to database:", dbError)
      // Optional: Cleanup uploaded file if DB fails
      await supabase.storage.from(BUCKET_NAME).remove([fileName])
      return NextResponse.json({ message: "Error al guardar la referencia en la base de datos" }, { status: 500 })
    }

    return NextResponse.json({ image: dbData }, { status: 201 })
  } catch (error) {
    console.error("Unexpected error during upload:", error)
    return NextResponse.json({ message: "Error inesperado al subir la imagen" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = supabaseServerClient()
  const id = request.nextUrl.searchParams.get("id")

  if (!id) {
    return NextResponse.json({ message: "Falta el ID de la imagen" }, { status: 400 })
  }

  try {
    // 1. Get image info to delete from storage
    const { data: image, error: fetchError } = await supabase
      .from(TABLE_NAME)
      .select("url")
      .eq("id", id)
      .single()

    if (fetchError || !image) {
      return NextResponse.json({ message: "No se encontró la imagen" }, { status: 404 })
    }

    // Extract file name from URL (assuming standard Supabase URL)
    const urlParts = image.url.split('/')
    const fileName = urlParts[urlParts.length - 1]

    // 2. Delete from DB
    const { error: dbError } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq("id", id)

    if (dbError) {
      throw dbError
    }

    // 3. Delete from Storage
    await supabase.storage.from(BUCKET_NAME).remove([fileName])

    return NextResponse.json({ message: "Imagen eliminada correctamente" })
  } catch (error) {
    console.error("Error deleting image:", error)
    return NextResponse.json({ message: "Error al eliminar la imagen" }, { status: 500 })
  }
}
