# Configurar Supabase para el Calendario

Sigue estos pasos para que el calendario se guarde y se comparta entre todas las personas que visiten la página.

## 1. Crear proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta (o inicia sesión).
2. Crea un **nuevo proyecto**. Elige una organización gratuita, asigna un nombre y una región cercana.
3. Guarda la contraseña temporal de la base de datos (te servirá si más adelante quieres conectarte con otra herramienta).

## 2. Obtener URL y claves

1. Cuando el proyecto esté listo, entra a **Project Settings → API**.
2. Copia los valores de:
   - `Project URL` → se usará como `SUPABASE_URL`.
   - `service_role key` → se usará como `SUPABASE_SERVICE_ROLE_KEY` (no compartas esta clave; es solo para el backend).

> **Importante:** nunca publiques el service role key en el navegador. En este proyecto solo se usa dentro de la carpeta `app/api`, así que no se envía al cliente.

## 3. Crear la tabla `love_events`

1. En el dashboard de Supabase, abre **SQL Editor**.
2. Crea la tabla (o actualízala) ejecutando la siguiente sentencia:

```sql
create extension if not exists "pgcrypto";

create table if not exists love_events (
   id uuid primary key default gen_random_uuid(),
   date date not null,
   title text not null,
   notes text,
   done boolean not null default false,
   created_at timestamptz not null default now(),
   category text not null default 'love'
);

create index if not exists love_events_date_category_idx
   on love_events (date, category);
```

Si ya tenías la tabla creada sin la columna `category`, agrégala con este comando y asigna el valor por defecto a los registros existentes:

```sql
alter table love_events
   add column if not exists category text not null default 'love';

update love_events
   set category = coalesce(nullif(category, ''), 'love');
```

3. Asegúrate de que **RLS (Row Level Security)** esté activado (Supabase lo activa por defecto). Como usaremos el service role key, no hace falta crear políticas adicionales por ahora.

## 4. Variables de entorno en local

1. Crea un archivo `.env.local` en la raíz del proyecto.
2. Copia lo siguiente y reemplaza con tus valores reales:

```env
SUPABASE_URL="https://TU-PROYECTO.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="TU_SERVICE_ROLE_KEY"
```

3. Reinicia el servidor local (`npm run dev`) para que Next.js relea las variables.

## 5. Variables de entorno en Vercel

1. En tu proyecto de Vercel, ve a **Settings → Environment Variables**.
2. Agrega las mismas variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Vuelve a desplegar la app (o usa "Redeploy") para que Vercel use los nuevos valores.

## 6. Probar

1. Ejecuta `npm run dev` y abre `http://localhost:3000`.
2. Agrega un plan en el calendario romántico y otro en la agenda fitness. Comprueba que cada uno queda en su categoría correcta y que se mantienen después de recargar.
3. Despliega en Vercel y vuelve a probar con el enlace público. Los cambios se compartirán con cualquier persona que abra la página.

---

Si en algún momento quieres restablecer todo, puedes vaciar la tabla desde Supabase: `DELETE FROM love_events;`. Recuerda que los datos se conservarán mientras la tabla exista en la base de datos.
