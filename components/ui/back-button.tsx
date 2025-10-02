"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react"

interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
}

export function BackButton({ label = "Volver", ...props }: BackButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2 border-pink-300 text-pink-600 hover:shadow-md"
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>{label}</span>
    </Button>
  )
}

export default BackButton
