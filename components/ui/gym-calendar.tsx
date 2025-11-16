"use client"

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import type { DayContentProps } from "react-day-picker"
import { format, parseISO, startOfDay } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import BackButton from "@/components/ui/back-button"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  AlarmClock,
  CheckCircle2,
  Circle,
  Dumbbell,
  NotebookPen,
  Flame,
  Sparkles,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRemoteCalendar, type RemoteCalendarEvent } from "@/hooks/use-remote-calendar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"

const getIsoDate = (date: Date) => format(date, "yyyy-MM-dd")

const capitalise = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

const formatLongDate = (date: Date) =>
  capitalise(
    new Intl.DateTimeFormat("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(date)
  )

const formatShortDate = (date: Date) =>
  new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
  }).format(date)

const formatFullDateTime = (date: Date) => {
  const datePart = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
  const timePart = new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
  return `${datePart} a las ${timePart}`
}

const sortByCreatedDesc = (items: RemoteCalendarEvent[]) =>
  [...items].sort(
    (eventA, eventB) => parseISO(eventB.created_at).getTime() - parseISO(eventA.created_at).getTime()
  )

type PendingDeletion =
  | { type: "session"; item: RemoteCalendarEvent }
  | { type: "note"; item: RemoteCalendarEvent }

export function GymCalendar({ onBack }: { onBack: () => void }) {
  const {
    events: sessionEvents,
    isLoading: sessionsLoading,
    addEvent: addSession,
    updateEventStatus,
    deleteEvent: deleteSession,
  } = useRemoteCalendar("gym")
  const {
    events: noteEvents,
    isLoading: notesLoading,
    addEvent: addNote,
    deleteEvent: deleteNote,
  } = useRemoteCalendar("gym-notes")
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date())
  const [title, setTitle] = useState("")
  const [notes, setNotes] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [pendingDelete, setPendingDelete] = useState<PendingDeletion | null>(null)
  const [noteTitle, setNoteTitle] = useState("")
  const [noteDetails, setNoteDetails] = useState("")
  const [noteError, setNoteError] = useState<string | null>(null)

  const isLoading = sessionsLoading || notesLoading

  const selectedDayKey = useMemo(() => getIsoDate(selectedDate), [selectedDate])

  const sessionsForSelectedDay = useMemo(() => {
    return sessionEvents.filter((session) => session.date === selectedDayKey)
  }, [sessionEvents, selectedDayKey])

  const upcomingSessions = useMemo(() => {
    const today = startOfDay(new Date()).getTime()
    return sessionEvents
      .filter((session) => parseISO(session.date).getTime() >= today)
      .slice(0, 6)
  }, [sessionEvents])

  const daysWithSessions = useMemo(() => {
    const unique = new Map<string, Date>()
    sessionEvents.forEach((session) => {
      if (!unique.has(session.date)) {
        unique.set(session.date, parseISO(session.date))
      }
    })
    return Array.from(unique.values())
  }, [sessionEvents])

  const completedSessions = useMemo(
    () => sessionEvents.filter((session) => session.done).length,
    [sessionEvents]
  )

  const nextSession = upcomingSessions[0]

  const handleAddSession = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!title.trim()) return

    const result = await addSession({
      date: selectedDayKey,
      title: title.trim(),
      notes: notes.trim(),
    })

    if (!result.success) {
      setErrorMessage(result.message ?? "No se pudo guardar el entrenamiento. Intenta de nuevo.")
      return
    }

    setTitle("")
    setNotes("")
    setErrorMessage(null)
  }

  const handleToggleStatus = async (id: string, done: boolean) => {
    const result = await updateEventStatus(id, done)
    if (!result.success) {
      setErrorMessage(result.message ?? "No se pudo actualizar el entrenamiento. Intenta de nuevo.")
    } else {
      setErrorMessage(null)
    }
  }

  const handleSessionDelete = async (id: string) => {
    const result = await deleteSession(id)
    if (!result.success) {
      setErrorMessage(result.message ?? "No se pudo eliminar el entrenamiento. Intenta de nuevo.")
    } else {
      setErrorMessage(null)
    }
    return result
  }

  const handleNoteDelete = async (id: string) => {
    const result = await deleteNote(id)
    if (!result.success) {
      setNoteError(result.message ?? "No se pudo eliminar la nota. Intenta de nuevo.")
    } else {
      setNoteError(null)
    }
    return result
  }

  const confirmDelete = async () => {
    if (!pendingDelete) return

    if (pendingDelete.type === "session") {
      await handleSessionDelete(pendingDelete.item.id)
    } else {
      await handleNoteDelete(pendingDelete.item.id)
    }

    setPendingDelete(null)
  }

  const handleAddNote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!noteTitle.trim() && !noteDetails.trim()) {
      setNoteError("Escribe al menos un título o algunas notas para guardar.")
      return
    }

    const result = await addNote({
      date: selectedDayKey,
      title: noteTitle.trim() || "Nota sin título",
      notes: noteDetails.trim(),
    })

    if (!result.success) {
      setNoteError(result.message ?? "No se pudo guardar la nota. Intenta de nuevo.")
      return
    }

    setNoteTitle("")
    setNoteDetails("")
    setNoteError(null)
  }

  const renderDay = ({ date }: DayContentProps) => {
    const dayNumber = format(date, "d")
    const iso = getIsoDate(date)
    const isSelected = iso === selectedDayKey
    const hasSession = sessionEvents.some((session: RemoteCalendarEvent) => session.date === iso)

    return (
      <span className="relative flex h-9 w-9 items-center justify-center font-semibold">
        {dayNumber}
        {(isSelected || hasSession) && (
          <Activity
            aria-hidden
            className={cn(
              "absolute -bottom-1 right-1 h-3 w-3",
              isSelected ? "text-pink-500" : "text-rose-300"
            )}
          />
        )}
      </span>
    )
  }

  const selectedDayCount = sessionsForSelectedDay.length
  const notesForSelectedDay = useMemo(() => {
    return noteEvents.filter((note) => note.date === selectedDayKey)
  }, [noteEvents, selectedDayKey])

  const recentNotes = useMemo(() => {
    return sortByCreatedDesc(noteEvents).slice(0, 5)
  }, [noteEvents])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <Sparkles className="h-8 w-8 animate-spin text-pink-500" />
        <p className="text-sm text-gray-600">Sincronizando tus entrenamientos...</p>
      </div>
    )
  }

  return (
    <>
      <AlertDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => {
          if (!open) {
            setPendingDelete(null)
          }
        }}
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingDelete?.type === "note"
                ? "¿Eliminar esta nota compartida?"
                : "¿Eliminar este entrenamiento?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDelete?.item
                ? `Se eliminará "${pendingDelete.item.title}" del ${formatLongDate(
                    parseISO(pendingDelete.item.date)
                  )}.`
                : "Se eliminará el elemento seleccionado."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingDelete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 text-white hover:from-rose-500 hover:via-pink-500 hover:to-fuchsia-500"
              onClick={async () => {
                await confirmDelete()
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="space-y-6">
      <BackButton onClick={onBack} label="← Volver" />

      {errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      <div className="space-y-3 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-300 via-pink-300 to-fuchsia-300 shadow-lg">
          <Dumbbell className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-pink-700">Agenda Fitness</h2>
        <p className="text-pink-500">
          Planifica tus entrenamientos, registra tus victorias y mantén la energía en lo más alto.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <Card className="border-pink-200 bg-white/90">
          <CardHeader className="pb-0">
            <CardTitle className="text-2xl text-pink-700">Calendario de entrenamientos</CardTitle>
            <CardDescription>
              Selecciona un día para revisar o programar las sesiones que te acercan a tus metas.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              modifiers={{ hasSession: daysWithSessions }}
              modifiersClassNames={{ hasSession: "!bg-rose-200 !text-rose-900" }}
              components={{ DayContent: renderDay }}
              className="self-center rounded-2xl border border-pink-200 bg-gradient-to-br from-white via-rose-50 to-pink-50 shadow-inner"
            />

            <div className="rounded-2xl border border-pink-200 bg-gradient-to-r from-rose-50 to-pink-50 p-4 text-center shadow-inner">
              <p className="text-sm font-semibold text-pink-600">Sesión seleccionada</p>
              <p className="text-xl font-semibold text-pink-700">{formatLongDate(selectedDate)}</p>
              <p className="text-sm text-gray-600">
                {selectedDayCount > 0
                  ? `${selectedDayCount} entrenamiento${selectedDayCount === 1 ? "" : "s"} preparado${
                      selectedDayCount === 1 ? "" : "s"
                    }`
                  : "Ningún entrenamiento programado. ¿Agendamos uno?"}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="border-pink-200 bg-white/90">
            <CardHeader className="pb-0">
              <CardTitle className="text-xl text-pink-700">Registrar entrenamiento</CardTitle>
              <CardDescription>
                Define tu sesión, agrega notas para recordar el plan y mantente enfocado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleAddSession}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-pink-600" htmlFor="session-title">
                    Título del entrenamiento
                  </label>
                  <Input
                    id="session-title"
                    placeholder="Ej. Fuerza tren superior"
                    value={title}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-pink-600" htmlFor="session-notes">
                    Detalles clave
                  </label>
                  <Textarea
                    id="session-notes"
                    placeholder="Series, repeticiones, intensidad o recordatorios para la sesión"
                    value={notes}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setNotes(event.target.value)}
                    rows={4}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 text-white hover:from-rose-500 hover:via-pink-500 hover:to-fuchsia-500"
                >
                  <Flame className="mr-2 h-4 w-4" />
                  Guardar entrenamiento
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-pink-200 bg-white/90">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-xl text-pink-700">Próximas sesiones</CardTitle>
                  <CardDescription>
                    Mantén el enfoque en lo que se viene para seguir sumando victorias.
                  </CardDescription>
                </div>
                <AlarmClock className="h-5 w-5 text-rose-500" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingSessions.length === 0 && (
                <p className="text-sm text-gray-600">
                  No hay sesiones planificadas. ¡Agenda una y mantén la racha activa!
                </p>
              )}

              {upcomingSessions.map((session) => {
                const sessionDate = parseISO(session.date)
                const isToday = getIsoDate(sessionDate) === getIsoDate(new Date())

                return (
                  <div
                    key={session.id}
                    className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge
                            className={cn(
                              "bg-rose-100 text-rose-700",
                              isToday && "bg-pink-100 text-pink-700"
                            )}
                          >
                            <Activity className="mr-1 h-3 w-3" />
                            {isToday ? "Hoy" : formatShortDate(sessionDate)}
                          </Badge>
                          {session.done && <Badge className="bg-purple-100 text-purple-700">Completado</Badge>}
                        </div>
                        <p className="font-semibold text-pink-700">{session.title}</p>
                        {session.notes && (
                          <p className="text-sm text-gray-600">{session.notes}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => setPendingDelete({ type: "session", item: session })}
                        aria-label="Eliminar entrenamiento"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Card className="border-pink-200 bg-white/90">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl text-pink-700">Métricas rápidas</CardTitle>
            <CardDescription>
              Un vistazo a tu progreso reciente para mantener alta la motivación.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-3">
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-rose-600">Total sesiones</p>
              <p className="text-2xl font-bold text-pink-700">{sessionEvents.length}</p>
            </div>
            <div className="rounded-xl border border-pink-200 bg-pink-50 p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-pink-600">Completadas</p>
              <p className="text-2xl font-bold text-pink-700">{completedSessions}</p>
            </div>
            <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-purple-600">Siguiente sesión</p>
              <p className="text-base font-semibold text-pink-700">
                {nextSession ? formatLongDate(parseISO(nextSession.date)) : "Por definir"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-pink-200 bg-white/90">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl text-pink-700">Sesiones del día</CardTitle>
            <CardDescription>
              Marca lo que ya completaste o ajusta lo que haga falta.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            {selectedDayCount === 0 && (
              <div className="rounded-2xl border border-dashed border-rose-300 bg-rose-50/70 p-6 text-center">
                <p className="text-sm text-gray-600">
                  Este día aún está libre. Añade un entrenamiento para mantener la constancia.
                </p>
              </div>
            )}

            {sessionsForSelectedDay.map((session: RemoteCalendarEvent) => (
              <div
                key={session.id}
                className="flex flex-wrap items-start gap-4 rounded-2xl border border-rose-200 bg-gradient-to-r from-white via-rose-50 to-pink-50 p-4"
              >
                <button
                  type="button"
                  onClick={() => handleToggleStatus(session.id, !session.done)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-rose-200 bg-white text-pink-600 transition hover:scale-105"
                  aria-label={session.done ? "Marcar como pendiente" : "Marcar como completado"}
                >
                  {session.done ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
                </button>
                <div className="flex-1 space-y-2">
                  <p className="text-lg font-semibold text-pink-700">{session.title}</p>
                  {session.notes && <p className="text-sm text-gray-600">{session.notes}</p>}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => setPendingDelete({ type: "session", item: session })}
                  aria-label="Eliminar entrenamiento"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-pink-200 bg-white/90">
        <CardHeader className="pb-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-xl text-pink-700">Notas compartidas</CardTitle>
              <CardDescription>
                Un espacio para escribir cómo nos sentimos, qué comimos o cualquier detalle del entrenamiento.
              </CardDescription>
            </div>
            <NotebookPen className="h-6 w-6 text-pink-500" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          {noteError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {noteError}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleAddNote}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-pink-500">
                Día seleccionado
              </p>
              <p className="text-base font-semibold text-pink-700">{formatLongDate(selectedDate)}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-pink-600" htmlFor="note-title">
                Título o resumen
              </label>
              <Input
                id="note-title"
                placeholder="Ej. Almuerzo saludable, Estuvimos motivados, Dolor muscular leve"
                value={noteTitle}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setNoteTitle(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-pink-600" htmlFor="note-details">
                Notas para recordar
              </label>
              <Textarea
                id="note-details"
                placeholder="Describe sensaciones, alimentación, estado de ánimo o cualquier detalle que quieras compartir."
                value={noteDetails}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setNoteDetails(event.target.value)}
                rows={4}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 text-white hover:from-rose-500 hover:via-pink-500 hover:to-fuchsia-500"
            >
              Guardar nota
            </Button>
          </form>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-pink-600">
              Notas para {formatLongDate(selectedDate)}
            </h3>
            {notesForSelectedDay.length === 0 ? (
              <p className="text-sm text-gray-600">
                Aún no registraste notas para este día. Comparte cómo nos fue o qué queremos recordar.
              </p>
            ) : (
              <div className="space-y-3">
                {notesForSelectedDay.map((note) => (
                  <div
                    key={note.id}
                    className="flex items-start justify-between gap-3 rounded-2xl border border-rose-200 bg-gradient-to-r from-white via-rose-50 to-pink-50 p-4"
                  >
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-pink-700">{note.title}</p>
                      {note.notes && (
                        <p className="text-sm text-gray-600 whitespace-pre-wrap">{note.notes}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        Registrado el {formatFullDateTime(parseISO(note.created_at))}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => setPendingDelete({ type: "note", item: note })}
                      aria-label="Eliminar nota"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-pink-600">Historial reciente</h3>
            {recentNotes.length === 0 ? (
              <p className="text-sm text-gray-600">
                Cuando agregues notas aparecerá aquí un resumen de las últimas actualizaciones.
              </p>
            ) : (
              <ul className="space-y-2 text-sm text-gray-700">
                {recentNotes.map((note) => (
                  <li
                    key={`recent-${note.id}`}
                    className="flex items-start justify-between gap-3 rounded-xl border border-rose-100 bg-rose-50/70 px-3 py-2"
                  >
                    <div>
                      <p className="font-medium text-pink-700">{note.title}</p>
                      <p className="text-xs text-gray-500">
                        {formatShortDate(parseISO(note.date))} · {formatFullDateTime(parseISO(note.created_at))}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
      </div>
    </>
  )
}

export default GymCalendar
