import { NextRequest, NextResponse } from "next/server"
import { supabaseServerClient } from "@/lib/supabase-server"

const TABLE_NAME = "love_events"

const getCategory = (value: string | null) => (value?.trim().length ? value : "love")

export async function GET(request: NextRequest) {
  const supabase = supabaseServerClient()
  const category = getCategory(request.nextUrl.searchParams.get("category"))

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("id, date, title, notes, created_at, done, category")
    .eq("category", category)
    .order("date", { ascending: true })
    .order("created_at", { ascending: true })

  if (error) {
    console.error("No se pudieron obtener los eventos", error)
    return NextResponse.json({ message: "Error al cargar el calendario" }, { status: 500 })
  }

  return NextResponse.json({ events: data ?? [] })
}

export async function POST(request: NextRequest) {
  const supabase = supabaseServerClient()

  try {
    const body = (await request.json()) as { date?: string; title?: string; notes?: string; category?: string }
    const { date, title, notes, category } = body
    const finalCategory = getCategory(category ?? null)

    if (!date || !title) {
      return NextResponse.json({ message: "Faltan datos del plan" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert({ date, title, notes: notes ?? "", category: finalCategory })
      .select("id, date, title, notes, created_at, done, category")
      .single()

    if (error || !data) {
      console.error("No se pudo crear el evento", error)
      return NextResponse.json({ message: "No se pudo guardar el plan" }, { status: 500 })
    }

    return NextResponse.json({ event: data }, { status: 201 })
  } catch (error) {
    console.error("Error inesperado al crear el evento", error)
    return NextResponse.json({ message: "Error al guardar el plan" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const supabase = supabaseServerClient()

  try {
    const body = (await request.json()) as {
      id?: string
      updates?: Record<string, unknown>
      category?: string
    }
    const { id, updates, category } = body
    const finalCategory = getCategory(category ?? null)

    if (!id || !updates) {
      return NextResponse.json({ message: "Faltan datos para actualizar" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(updates)
      .eq("id", id)
      .eq("category", finalCategory)
      .select("id, date, title, notes, created_at, done, category")
      .single()

    if (error || !data) {
      console.error("No se pudo actualizar el evento", error)
      return NextResponse.json({ message: "No se pudo actualizar el plan" }, { status: 500 })
    }

    return NextResponse.json({ event: data })
  } catch (error) {
    console.error("Error inesperado al actualizar el evento", error)
    return NextResponse.json({ message: "Error al actualizar el plan" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = supabaseServerClient()

  const id = request.nextUrl.searchParams.get("id")
  const category = getCategory(request.nextUrl.searchParams.get("category"))

  if (!id) {
    return NextResponse.json({ message: "Falta el identificador del plan" }, { status: 400 })
  }

  const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id).eq("category", category)

  if (error) {
    console.error("No se pudo eliminar el evento", error)
    return NextResponse.json({ message: "No se pudo eliminar el plan" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
