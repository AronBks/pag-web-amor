"use client"

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import type { DayContentProps } from "react-day-picker"
import { compareAsc, format, parseISO, startOfDay } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import BackButton from "@/components/ui/back-button"
import { Badge } from "@/components/ui/badge"
import { CalendarHeart, CheckCircle2, Circle, Clock, Heart, PencilLine, Sparkles, Trash2 } from "lucide-react"
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

export function LoveCalendar({ onBack }: { onBack: () => void }) {
  const { events, isLoading, addEvent, updateEventStatus, deleteEvent } = useRemoteCalendar("love")
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date())
  const [title, setTitle] = useState("")
  const [notes, setNotes] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [pendingDelete, setPendingDelete] = useState<RemoteCalendarEvent | null>(null)

  const selectedDayKey = useMemo(() => getIsoDate(selectedDate), [selectedDate])

  const eventsForSelectedDay = useMemo(() => {
    return events
      .filter((calendarEvent: RemoteCalendarEvent) => calendarEvent.date === selectedDayKey)
      .sort((eventA: RemoteCalendarEvent, eventB: RemoteCalendarEvent) =>
        compareAsc(parseISO(eventA.created_at), parseISO(eventB.created_at))
      )
  }, [events, selectedDayKey])

  const upcomingEvents = useMemo(() => {
    return events
      .filter((calendarEvent: RemoteCalendarEvent) =>
        compareAsc(parseISO(calendarEvent.date), startOfDay(new Date())) >= 0
      )
      .slice(0, 5)
  }, [events])

  const daysWithPlans = useMemo(() => {
    const unique = new Map<string, Date>()
    events.forEach((calendarEvent: RemoteCalendarEvent) => {
      if (!unique.has(calendarEvent.date)) {
        unique.set(calendarEvent.date, parseISO(calendarEvent.date))
      }
    })
    return Array.from(unique.values())
  }, [events])

  const handleAddEvent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!title.trim()) return

    const result = await addEvent({
      date: selectedDayKey,
      title: title.trim(),
      notes: notes.trim(),
    })

    if (!result.success) {
      setErrorMessage(result.message ?? "No se pudo guardar el plan. Intenta de nuevo.")
      return
    }

    setTitle("")
    setNotes("")
    setErrorMessage(null)
  }

  const handleToggleStatus = async (id: string, done: boolean) => {
    const result = await updateEventStatus(id, done)
    if (!result.success) {
      setErrorMessage(result.message ?? "No se pudo actualizar el plan. Intenta de nuevo.")
    } else {
      setErrorMessage(null)
    }
  }

  const handleDelete = async (id: string) => {
    const result = await deleteEvent(id)
    if (!result.success) {
      setErrorMessage(result.message ?? "No se pudo eliminar el plan. Intenta de nuevo.")
    } else {
      setErrorMessage(null)
    }
    return result
  }

  const confirmDelete = async () => {
    if (!pendingDelete) return
    await handleDelete(pendingDelete.id)
    setPendingDelete(null)
  }

  const renderDay = ({ date }: DayContentProps) => {
    const dayNumber = format(date, "d")
    const iso = getIsoDate(date)
    const isSelected = iso === selectedDayKey
    const hasPlan = events.some((calendarEvent) => calendarEvent.date === iso)

    return (
      <span className="relative flex h-9 w-9 items-center justify-center font-medium">
        {dayNumber}
        {(isSelected || hasPlan) && (
          <Heart
            aria-hidden
            className={cn(
              "absolute -bottom-1 right-1 h-3 w-3",
              isSelected ? "text-pink-500" : "text-pink-300"
            )}
          />
        )}
      </span>
    )
  }

  const selectedDayCount = eventsForSelectedDay.length

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <Sparkles className="h-8 w-8 animate-spin text-pink-500" />
        <p className="text-sm text-gray-600">Cargando nuestro calendario...</p>
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
            <AlertDialogTitle>¿Eliminar este plan?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDelete
                ? `Se eliminará "${pendingDelete.title}" del ${formatLongDate(parseISO(pendingDelete.date))}.`
                : "Se eliminará el plan seleccionado."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingDelete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
              onClick={() => void confirmDelete()}
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

      <div className="space-y-2 text-center">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 shadow-lg">
            <CalendarHeart className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-pink-700">Nuestro Calendario</h2>
        <p className="text-pink-500">
          Un espacio para organizar nuestros planes, sorpresas y momentos especiales 💘
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="bg-white/90">
          <CardHeader className="pb-0">
            <CardTitle className="text-2xl text-pink-700">Agenda romántica</CardTitle>
            <CardDescription>
              Selecciona un día para ver o agregar los planes que soñamos hacer juntos.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date: Date | undefined) => date && setSelectedDate(date)}
              modifiers={{ hasPlan: daysWithPlans }}
              modifiersClassNames={{ hasPlan: "!bg-pink-200 !text-pink-900" }}
              components={{ DayContent: renderDay }}
              className="self-center rounded-2xl border border-pink-200 bg-white shadow-inner"
            />

            <div className="rounded-2xl border border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50 p-4 text-center shadow-inner">
              <p className="text-sm font-medium text-pink-600">Día seleccionado</p>
              <p className="text-xl font-semibold text-pink-700">{formatLongDate(selectedDate)}</p>
              <p className="text-sm text-gray-600">
                {selectedDayCount > 0
                  ? `${selectedDayCount} plan${selectedDayCount === 1 ? "" : "es"} listo${
                      selectedDayCount === 1 ? "" : "s"
                    }`
                  : "Aún no hay planes para este día. ¿Agregamos uno?"}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="bg-white/90">
            <CardHeader className="pb-0">
              <CardTitle className="text-xl text-purple-700">Crear un plan juntos</CardTitle>
              <CardDescription>
                Piensa en algo bonito para ese día y guárdalo para que no se nos olvide.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleAddEvent}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-pink-600" htmlFor="plan-title">
                    Nombre del plan
                  </label>
                  <Input
                    id="plan-title"
                    placeholder="Ej. Picnic sorpresa en el parque"
                    value={title}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-pink-600" htmlFor="plan-notes">
                    Detalles o notas
                  </label>
                  <Textarea
                    id="plan-notes"
                    placeholder="¿Qué llevamos? ¿A qué hora? ¿Qué detalle romántico no puede faltar?"
                    value={notes}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setNotes(event.target.value)}
                    rows={4}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
                >
                  <PencilLine className="mr-2 h-4 w-4" />
                  Guardar plan para este día
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-white/90">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-pink-700">Próximos momentos</CardTitle>
                  <CardDescription>
                    Lo que viene pronto para seguir celebrando nuestro amor.
                  </CardDescription>
                </div>
                <Sparkles className="h-5 w-5 text-pink-500" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.length === 0 && (
                <p className="text-sm text-gray-600">
                  Todavía no tenemos nada planificado. ¡Es el momento perfecto para soñar algo nuevo!
                </p>
              )}

              {upcomingEvents.map((calendarEvent) => {
                const eventDate = parseISO(calendarEvent.date)
                const isToday = getIsoDate(eventDate) === getIsoDate(new Date())

                return (
                  <div
                    key={calendarEvent.id}
                    className="rounded-2xl border border-pink-200 bg-pink-50/70 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge
                            className={cn(
                              "bg-pink-100 text-pink-700",
                              isToday && "bg-purple-100 text-purple-700"
                            )}
                          >
                            <Clock className="mr-1 h-3 w-3" />
                            {isToday ? "Hoy" : formatShortDate(eventDate)}
                          </Badge>
                          {calendarEvent.done && (
                            <Badge className="bg-green-100 text-green-700">Listo</Badge>
                          )}
                        </div>
                        <p className="font-semibold text-pink-700">{calendarEvent.title}</p>
                        {calendarEvent.notes && (
                          <p className="text-sm text-gray-600">{calendarEvent.notes}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => setPendingDelete(calendarEvent)}
                        aria-label="Eliminar plan"
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

      <Card className="bg-white/90">
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl text-pink-700">
            Planes para {formatLongDate(selectedDate)}
          </CardTitle>
          <CardDescription>
            Marca lo que ya hicimos o elimina lo que ya no nos haga falta.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {selectedDayCount === 0 && (
            <div className="rounded-2xl border border-dashed border-pink-300 bg-pink-50/70 p-6 text-center">
              <p className="text-sm text-gray-600">
                Este día aún está en blanco. ¿Te gustaría agregar algo especial?
              </p>
            </div>
          )}

          {eventsForSelectedDay.map((calendarEvent) => (
            <div
              key={calendarEvent.id}
              className="flex flex-wrap items-start gap-4 rounded-2xl border border-pink-200 bg-gradient-to-r from-white via-pink-50 to-purple-50 p-4"
            >
              <button
                type="button"
                onClick={() => handleToggleStatus(calendarEvent.id, !calendarEvent.done)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-200 bg-white text-pink-600 transition hover:scale-105"
                aria-label={calendarEvent.done ? "Marcar como pendiente" : "Marcar como listo"}
              >
                {calendarEvent.done ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : (
                  <Circle className="h-6 w-6" />
                )}
              </button>
              <div className="flex-1 space-y-2">
                <p className="text-lg font-semibold text-pink-700">{calendarEvent.title}</p>
                {calendarEvent.notes && (
                  <p className="text-sm text-gray-600">{calendarEvent.notes}</p>
                )}
                <p className="text-xs text-gray-500">
                  Guardado el {formatFullDateTime(parseISO(calendarEvent.created_at))}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-red-500"
                onClick={() => setPendingDelete(calendarEvent)}
                aria-label="Eliminar plan"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
      </div>
    </>
  )
}

export default LoveCalendar
