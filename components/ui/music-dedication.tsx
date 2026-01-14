"use client"

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { format, parseISO } from "date-fns"
import { Heart, Music4, Quote, Sparkles, Volume2 } from "lucide-react"
import BackButton from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useMusicDedications, type MusicDedication as MusicDedicationEntry } from "@/hooks/use-music-dedications"

const getIsoDate = (date: Date) => format(date, "yyyy-MM-dd")

const formatLongDate = (date: Date) =>
  new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date)

const formatShortDate = (date: Date) =>
  new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
  }).format(date)

const formatTime = (date: Date) =>
  new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)

const extractYouTubeId = (url: string) => {
  if (url.includes("youtube.com/watch")) {
    return new URL(url).searchParams.get("v") ?? ""
  }
  if (url.includes("youtu.be/")) {
    return url.split("youtu.be/")[1]?.split("?")[0] ?? ""
  }
  return ""
}

const extractSpotifyId = (url: string) => {
  if (url.includes("spotify.com/track/")) {
    return url.split("spotify.com/track/")[1]?.split("?")[0] ?? ""
  }
  if (url.includes("spotify.com/playlist/")) {
    return url.split("spotify.com/playlist/")[1]?.split("?")[0] ?? ""
  }
  return ""
}

type EmbedOptions = {
  autoplay?: boolean
  mute?: boolean
}

const getEmbedUrl = (url: string, options?: EmbedOptions) => {
  if (!url) return ""

  const autoplay = options?.autoplay ?? true
  const mute = options?.mute ?? true

  const youtubeId = extractYouTubeId(url)
  if (youtubeId) {
    const params = new URLSearchParams({
      autoplay: autoplay ? "1" : "0",
      mute: mute ? "1" : "0",
      controls: "1",
      playsinline: "1",
      enablejsapi: "1",
    })
    return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`
  }

  const spotifyId = extractSpotifyId(url)
  if (spotifyId) {
    const base = url.includes("playlist")
      ? `https://open.spotify.com/embed/playlist/${spotifyId}`
      : `https://open.spotify.com/embed/track/${spotifyId}`
    const params = new URLSearchParams({ utm_source: "generator" })
    if (autoplay) {
      params.set("autoplay", "1")
    }
    return `${base}?${params.toString()}`
  }

  return url
}

const isSpotifyEmbed = (url: string) => url.includes("open.spotify.com/embed")
const isYoutubeEmbed = (url: string) => url.includes("youtube.com/embed")

const SUPPORTED_HOSTS = ["youtube.com", "youtu.be", "open.spotify.com", "spotify.com"]

const isValidUrl = (value: string) => {
  try {
    const parsed = new URL(value)
    return SUPPORTED_HOSTS.some((host) => parsed.hostname.includes(host))
  } catch (error) {
    return false
  }
}

const sortByCreatedDesc = (items: MusicDedicationEntry[]) =>
  [...items].sort(
    (eventA, eventB) => parseISO(eventB.created_at).getTime() - parseISO(eventA.created_at).getTime()
  )

const todayKey = getIsoDate(new Date())

export function MusicDedicationSection({ onBack }: { onBack: () => void }) {
  const { dedications, isLoading, saveDedication } = useMusicDedications()

  const [dedicationDate, setDedicationDate] = useState<string>(todayKey)
  const [songTitle, setSongTitle] = useState("")
  const [songUrl, setSongUrl] = useState("")
  const [dedication, setDedication] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isDirty, setIsDirty] = useState(false)

  const todaysSong = useMemo(
    () => dedications.find((event) => event.date === todayKey) ?? null,
    [dedications]
  )

  const recentSongs = useMemo(() => sortByCreatedDesc(dedications), [dedications])

  const songForSelectedDate = useMemo(
    () => dedications.find((event) => event.date === dedicationDate) ?? null,
    [dedications, dedicationDate]
  )

  const heroSong = todaysSong ?? recentSongs[0] ?? null
  const [isHeroUnmuted, setIsHeroUnmuted] = useState(false)
  const heroEmbedUrl = getEmbedUrl(heroSong?.url ?? "", { autoplay: true, mute: !isHeroUnmuted })
  const heroMessage = heroSong?.message?.trim() ?? ""

  useEffect(() => {
    setIsHeroUnmuted(false)
  }, [heroSong?.id])

  useEffect(() => {
    setSongTitle("")
    setSongUrl("")
    setDedication("")
    setIsDirty(false)
  }, [dedicationDate])

  const handleFieldChange = <T extends string>(setter: (value: string) => void) => {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(event.target.value)
      setIsDirty(true)
      setErrorMessage(null)
    }
  }

  const handleSaveSong = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedTitle = songTitle.trim()
    const trimmedUrl = songUrl.trim()
    const trimmedMessage = dedication.trim()

    if (!trimmedTitle) {
      setErrorMessage("Escribe el nombre de la canción especial.")
      return
    }

    if (!trimmedUrl) {
      setErrorMessage("Agrega un enlace (YouTube o Spotify) para reproducirla.")
      return
    }

    if (!isValidUrl(trimmedUrl)) {
      setErrorMessage("Solo se aceptan enlaces de YouTube o Spotify.")
      return
    }

    try {
      const result = await saveDedication({
        date: dedicationDate,
        title: trimmedTitle,
        url: trimmedUrl,
        message: trimmedMessage,
      })

      if (!result.success) {
        setErrorMessage(result.message ?? "No se pudo guardar la dedicatoria musical.")
        return
      }

      setErrorMessage(null)
      setSongTitle("")
      setSongUrl("")
      setDedication("")
      setIsDirty(false)
    } catch (error) {
      console.error("Error guardando la dedicatoria musical", error)
      setErrorMessage("Ocurrió un problema inesperado. Intenta de nuevo.")
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <Sparkles className="h-8 w-8 animate-spin text-pink-500" />
        <p className="text-sm text-gray-600">Preparando la música especial...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
        <BackButton onClick={onBack} label="← Volver" />

        <div className="space-y-3 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300 shadow-lg">
            <Music4 className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-pink-700">Playlist dedicada para ella</h2>
          <p className="text-pink-500">
            Guarda una canción distinta cada día y deja que suene de fondo con tu mensaje especial.
          </p>
        </div>

        {errorMessage && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <Card className="border-none bg-gradient-to-br from-rose-50 via-white to-purple-50 shadow-xl shadow-rose-100">
            <CardHeader className="pb-2">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-rose-500 shadow-sm">
                    <Music4 className="h-3.5 w-3.5" />
                    Canción del día
                  </div>
                  <CardTitle className="text-2xl font-bold text-pink-700">Canción que suena hoy</CardTitle>
                </div>
                <Badge className="self-start bg-gradient-to-r from-rose-400 to-fuchsia-400 text-white shadow sm:self-auto">Hoy</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              {heroSong ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-pink-700">{heroSong.title}</h3>
                      <p className="text-xs font-medium text-rose-500">
                        Guardada el {formatLongDate(parseISO(heroSong.date))} · {formatTime(parseISO(heroSong.created_at))}
                      </p>
                    </div>
                  </div>

                  {heroEmbedUrl ? (
                    <div className="overflow-hidden rounded-3xl border border-rose-200/70 bg-white/80 shadow-inner">
                      {isSpotifyEmbed(heroEmbedUrl) ? (
                        <iframe
                          title={`Reproductor de Spotify para ${heroSong.title}`}
                          src={heroEmbedUrl}
                          className="h-56 w-full sm:h-60 md:h-64"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        />
                      ) : isYoutubeEmbed(heroEmbedUrl) ? (
                        <div className="relative w-full overflow-hidden aspect-[4/3] sm:aspect-video">
                          <iframe
                            title={`Video de YouTube de ${heroSong.title}`}
                            src={heroEmbedUrl}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="h-full w-full"
                          />
                          {!isHeroUnmuted && (
                            <button
                              type="button"
                              className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 px-6 text-center text-sm font-medium text-white transition hover:bg-black/60"
                              onClick={() => setIsHeroUnmuted(true)}
                            >
                              <Volume2 className="h-6 w-6" />
                              <span>Toca aquí para escucharlo con sonido</span>
                            </button>
                          )}
                        </div>
                      ) : (
                        <audio autoPlay controls loop className="w-full">
                          <source src={heroEmbedUrl} />
                          Tu navegador no soporta el elemento de audio.
                        </audio>
                      )}
                    </div>
                  ) : (
                    <p className="rounded-2xl border border-dashed border-rose-200 bg-rose-50/70 p-4 text-sm text-gray-600">
                      Agrega un enlace para que la canción pueda reproducirse aquí automáticamente.
                    </p>
                  )}

                  {heroMessage && (
                    <div className="relative overflow-hidden rounded-3xl border border-rose-200/80 bg-gradient-to-br from-white via-rose-50 to-purple-50 p-6 shadow">
                      <Quote className="absolute -left-4 -top-4 h-16 w-16 text-rose-200/60" />
                      <Quote className="absolute -right-4 -bottom-4 h-16 w-16 rotate-180 text-purple-200/50" />
                      <div className="relative space-y-4">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.4em] text-rose-400">
                          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-rose-300" />
                          Mensaje del corazón
                          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-purple-300" />
                        </div>
                        <div className="space-y-3 text-base font-semibold leading-relaxed text-pink-700">
                          {heroMessage.split("\n").map((line, index) => (
                            <p key={`line-${index}`}>{line}</p>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-rose-400">
                          <Heart className="h-3.5 w-3.5" /> Hecho con amor
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-rose-400">
                    <Heart className="mr-1 inline h-3 w-3" /> Toca el reproductor para activarlo en tu celular y usa el volumen del teléfono para escucharlo mejor.
                  </p>
                </div>
              ) : (
                <p className="rounded-2xl border border-dashed border-rose-200 bg-rose-50/70 p-4 text-center text-sm text-gray-600">
                  Todavía no tienes una canción dedicada. Guarda una y se reproducirá aquí automáticamente.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-pink-200 bg-white/90">
            <CardHeader className="pb-0">
              <CardTitle className="text-xl text-pink-700">Guardar o actualizar tu canción</CardTitle>
              <CardDescription>Elige la fecha, escribe tu dedicatoria y guarda la melodía especial.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSaveSong}>
                <div className="grid gap-4 md:grid-cols-[minmax(0,200px)_1fr]">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-pink-600" htmlFor="dedication-date">
                      Día de la dedicatoria
                    </label>
                    <Input
                      id="dedication-date"
                      type="date"
                      value={dedicationDate}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setDedicationDate(event.target.value)
                        setSongTitle("")
                        setSongUrl("")
                        setDedication("")
                        setIsDirty(false)
                        setErrorMessage(null)
                      }}
                    />
                    <p className="text-xs text-gray-500">
                      Si eliges la fecha de hoy, se actualizará lo que suena ahora mismo.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-pink-600" htmlFor="song-title">
                      Nombre de la canción
                    </label>
                    <Input
                      id="song-title"
                      placeholder="Ej. Nuestra canción favorita"
                      value={songTitle}
                      onChange={handleFieldChange(setSongTitle)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-[minmax(0,200px)_1fr]">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-pink-600" htmlFor="song-url">
                      Enlace para reproducir
                    </label>
                    <Input
                      id="song-url"
                      placeholder="YouTube o Spotify"
                      value={songUrl}
                      onChange={handleFieldChange(setSongUrl)}
                    />
                    <p className="text-xs text-gray-500">
                      Solo se aceptan enlaces de YouTube o Spotify. El reproductor se actualiza automáticamente.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-pink-600" htmlFor="song-message">
                      Mensaje para ella
                    </label>
                    <Textarea
                      id="song-message"
                      placeholder="Cuéntale por qué elegiste esta canción y qué sientes cuando suena."
                      rows={4}
                      value={dedication}
                      onChange={handleFieldChange(setDedication)}
                    />
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-gray-500">
                    <span>
                      Guarda una nueva canción para esa fecha; se agregará a vuestra playlist.
                    </span>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 text-white hover:from-rose-500 hover:via-pink-500 hover:to-fuchsia-500 sm:w-auto"
                  >
                    Guardar dedicatoria musical
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card className="border-pink-200 bg-white/90">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl text-pink-700">Canciones que hemos dedicado</CardTitle>
            <CardDescription>Un repaso de las melodías que ya forman parte de su historia.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            {recentSongs.length === 0 ? (
              <p className="text-sm text-gray-600">
                Aún no hay canciones registradas. Cuando guardes una dedicatoria aparecerá aquí.
              </p>
            ) : (
              recentSongs.map((song) => {
                const embedUrl = getEmbedUrl(song.url, { autoplay: false, mute: true })
                const isEmbeddedLink = isSpotifyEmbed(embedUrl) || isYoutubeEmbed(embedUrl)

                return (
                  <div
                    key={song.id}
                    className="flex flex-col gap-4 rounded-2xl border border-rose-200 bg-gradient-to-r from-white via-rose-50 to-pink-50 p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <p className="font-semibold text-pink-700">{song.title}</p>
                        <p className="text-xs text-gray-500">
                          {formatShortDate(parseISO(song.date))} · {formatTime(parseISO(song.created_at))}
                        </p>
                        {song.message && (
                          <p className="overflow-hidden text-ellipsis text-sm text-gray-600">
                            {song.message}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {song.url && (
                          <a
                            href={song.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-3 py-1 text-xs font-semibold text-rose-500 transition hover:bg-rose-50"
                          >
                            Escuchar canción
                          </a>
                        )}
                      </div>
                    </div>

                    {song.url && (
                      <div className="overflow-hidden rounded-2xl border border-rose-200/70 bg-white/80">
                        {isEmbeddedLink ? (
                          isSpotifyEmbed(embedUrl) ? (
                            <iframe
                              title={`Spotify: ${song.title}`}
                              src={embedUrl}
                              className="h-40 w-full"
                              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            />
                          ) : (
                            <div className="aspect-video w-full">
                              <iframe
                                title={`YouTube: ${song.title}`}
                                src={embedUrl}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="h-full w-full"
                              />
                            </div>
                          )
                        ) : (
                          <a
                            href={song.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block rounded-xl border border-dashed border-rose-200 bg-rose-50/60 p-3 text-center text-sm text-rose-500"
                          >
                            Abre el enlace dedicado para escucharla
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>
      </div>
  )
}

export default MusicDedicationSection
