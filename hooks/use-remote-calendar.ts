"use client"

import { useCallback, useEffect, useState } from "react"
import { compareAsc, parseISO } from "date-fns"

export type RemoteCalendarEvent = {
  id: string
  date: string
  title: string
  notes: string | null
  created_at: string
  done: boolean
  category: string
}

const sortEvents = (list: RemoteCalendarEvent[]) => {
  return [...list].sort((eventA, eventB) => {
    const byDate = compareAsc(parseISO(eventA.date), parseISO(eventB.date))
    if (byDate !== 0) {
      return byDate
    }
    return compareAsc(parseISO(eventA.created_at), parseISO(eventB.created_at))
  })
}

const DEFAULT_ERROR = "Ocurrió un error inesperado. Intenta de nuevo."

type RemoteResult = { success: true } | { success: false; message: string }

type CreateEventInput = {
  date: string
  title: string
  notes: string
}

export function useRemoteCalendar(category: string) {
  const [events, setEvents] = useState<RemoteCalendarEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadEvents = useCallback(async (): Promise<RemoteResult> => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/love-calendar?category=${category}`, { cache: "no-store" })
      if (!response.ok) {
        throw new Error("No se pudieron obtener los planes")
      }

      const data = (await response.json()) as { events: RemoteCalendarEvent[] }
      setEvents(sortEvents(data.events))
      return { success: true }
    } catch (error) {
      console.error("Error cargando eventos", error)
      return { success: false, message: "No se pudo cargar el calendario." }
    } finally {
      setIsLoading(false)
    }
  }, [category])

  useEffect(() => {
    void loadEvents()
  }, [loadEvents])

  const addEvent = useCallback(
    async ({ date, title, notes }: CreateEventInput): Promise<RemoteResult> => {
      try {
        const response = await fetch("/api/love-calendar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date,
            title,
            notes,
            category,
          }),
        })

        if (!response.ok) {
          throw new Error("No se pudo guardar el plan")
        }

        const data = (await response.json()) as { event: RemoteCalendarEvent }
        setEvents((previous) => sortEvents([...previous, data.event]))
        return { success: true }
      } catch (error) {
        console.error("Error guardando plan", error)
        return { success: false, message: DEFAULT_ERROR }
      }
    },
    [category]
  )

  const updateEventStatus = useCallback(
    async (id: string, done: boolean): Promise<RemoteResult> => {
      try {
        const response = await fetch("/api/love-calendar", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, category, updates: { done } }),
        })

        if (!response.ok) {
          throw new Error("No se pudo actualizar el plan")
        }

        const data = (await response.json()) as { event: RemoteCalendarEvent }
        setEvents((previous) => {
          const updated = previous.map((calendarEvent) =>
            calendarEvent.id === id ? data.event : calendarEvent
          )
          return sortEvents(updated)
        })
        return { success: true }
      } catch (error) {
        console.error("Error actualizando plan", error)
        return { success: false, message: DEFAULT_ERROR }
      }
    },
    [category]
  )

  const deleteEvent = useCallback(
    async (id: string): Promise<RemoteResult> => {
      try {
        const response = await fetch(`/api/love-calendar?id=${id}&category=${category}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("No se pudo eliminar el plan")
        }

        setEvents((previous) => previous.filter((calendarEvent) => calendarEvent.id !== id))
        return { success: true }
      } catch (error) {
        console.error("Error eliminando plan", error)
        return { success: false, message: DEFAULT_ERROR }
      }
    },
    [category]
  )

  return {
    events,
    isLoading,
    loadEvents,
    addEvent,
    updateEventStatus,
    deleteEvent,
  }
}
