import type { Metadata } from "next"
import './globals.css'

export const metadata: Metadata = {
  title: 'Para mi Kitty - Un lugar especial',
  description: 'Una página creada con cariño para guardar fotos, recuerdos y planes especiales.',
  generator: 'pag-web-amor',
  metadataBase: new URL('https://github.com/AronBks/pag-web-amor'),
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
