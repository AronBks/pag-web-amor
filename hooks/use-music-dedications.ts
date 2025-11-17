"use client"

import { useCallback, useEffect, useState } from "react"

export type MusicDedication = {
  id: string
  date: string
  title: string
  url: string
  message: string | null
  created_at: string
}

const DEFAULT_ERROR = "Ocurrió un error inesperado. Intenta de nuevo."

type RemoteResult = { success: true; dedication: MusicDedication } | { success: false; message: string }

type SaveInput = {
  date: string
  title: string
  url: string
  message: string
}

export function useMusicDedications() {
  const [dedications, setDedications] = useState<MusicDedication[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadDedications = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/love-songs", { cache: "no-store" })
      if (!response.ok) {
        throw new Error("No se pudieron obtener las canciones dedicadas")
      }

      const data = (await response.json()) as { dedications: MusicDedication[] }
      setDedications(data.dedications)
    } catch (error) {
      console.error("Error cargando dedicatorias musicales", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadDedications()
  }, [loadDedications])

  const saveDedication = useCallback(async ({ date, title, url, message }: SaveInput): Promise<RemoteResult> => {
    try {
      const response = await fetch("/api/love-songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, title, url, message }),
      })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null
        return { success: false, message: payload?.message ?? DEFAULT_ERROR }
      }

      const data = (await response.json()) as { dedication: MusicDedication }
      setDedications((previous) => {
        const filtered = previous.filter((item) => item.id !== data.dedication.id && item.date !== data.dedication.date)
        return [data.dedication, ...filtered]
      })

      return { success: true, dedication: data.dedication }
    } catch (error) {
      console.error("Error guardando dedicatoria musical", error)
      return { success: false, message: DEFAULT_ERROR }
    }
  }, [])

  const deleteDedication = useCallback(async (id: string): Promise<{ success: true } | { success: false; message: string }> => {
    try {
      const response = await fetch(`/api/love-songs?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null
        return { success: false, message: payload?.message ?? DEFAULT_ERROR }
      }

      setDedications((previous) => previous.filter((item) => item.id !== id))
      return { success: true }
    } catch (error) {
      console.error("Error eliminando dedicatoria musical", error)
      return { success: false, message: DEFAULT_ERROR }
    }
  }, [])

  return {
    dedications,
    isLoading,
    loadDedications,
    saveDedication,
    deleteDedication,
  }
}

export default useMusicDedications
