import { NextRequest, NextResponse } from "next/server"
import { supabaseServerClient } from "@/lib/supabase-server"

const TABLE_NAME = "love_songs"

export async function GET() {
  try {
    const supabase = supabaseServerClient()

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("id, date, title, url, message, created_at")
      .order("date", { ascending: false })
      .order("created_at", { ascending: false })

    if (error) {
      console.error("No se pudieron obtener las canciones dedicadas", error)
      return NextResponse.json({ message: "Error al cargar la playlist de la base de datos" }, { status: 500 })
    }

    return NextResponse.json({ dedications: data ?? [] })
  } catch (error: any) {
    console.error("Configuration error in GET /api/love-songs:", error)
    return NextResponse.json({ 
      message: "Error de configuración: Asegúrate de configurar las variables de Supabase en Vercel." 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = supabaseServerClient()

    const body = (await request.json()) as {
      date?: string
      title?: string
      url?: string
      message?: string
    }

    const { date, title, url, message } = body

    if (!date || !title || !url) {
      return NextResponse.json({ message: "Faltan datos para guardar la canción" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert({
        date,
        title,
        url,
        message: message ?? "",
      })
      .select("id, date, title, url, message, created_at")
      .single()

    if (error || !data) {
      console.error("No se pudo guardar la dedicatoria musical", error)
      return NextResponse.json({ 
        message: "No se pudo guardar la canción en la tabla 'love_songs'. ¿Has creado la tabla correctamente?" 
      }, { status: 500 })
    }

    return NextResponse.json({ dedication: data }, { status: 201 })
  } catch (error: any) {
    console.error("Error inesperado al guardar la dedicatoria musical:", error)
    return NextResponse.json({ 
      message: error.message || "Error al guardar la canción. Revisa la configuración de Supabase." 
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = supabaseServerClient()

  const id = request.nextUrl.searchParams.get("id")

  if (!id) {
    return NextResponse.json({ message: "Falta el identificador de la canción" }, { status: 400 })
  }

  const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id)

  if (error) {
    console.error("No se pudo eliminar la canción dedicada", error)
    return NextResponse.json({ message: "No se pudo eliminar la canción" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
