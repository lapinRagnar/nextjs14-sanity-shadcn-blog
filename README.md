https://www.youtube.com/watch?v=Lydgf-Hvla4

# I. configuration du projet
## 1. installer sanity

```bash
npm create sanity@latest -- --template clean --create-project "next14-blog" --dataset production
```

## 2. configurer un schemas
on creer un fichier sanity\schemas\blog.ts avec
> app\sanity\schemas\blog.ts
```ts

export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titre du blog'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'slog du blog',
    },
    {
      name: 'titleImage',
      type: 'image',
      title: 'Image du blog',
    }, 
    {
      name: 'smallDescription',
      type: 'text',
      title: 'Pesite description'
    },
    {
      name: 'content',
      type: 'array',
      title: 'Contenu du blog',
      of: [
        {
          type: 'block'
        }
      ]
    }
  ]
}

```

et dans le sanity\schemas\index.ts on importe notre blog schema

> app\sanity\schemas\index.ts
```ts
import blog from "./blog"

export const schemaTypes = [blog]

```

## 3. lancer le sanity studio
```cmd
cd sanity
npm run dev 
```
maintenant on lancer le studio sur : http://localhost:3333/

et on peut creer un blog avec le studio

on creer 3 ou 4 blog sur le studio


## II. la suite

### on cree la navbar

> app\components\Navbar.tsx
```tsx

const Navbar = () => {
  return (
    <div>Navbar</div>
  )
}

export default Navbar
```

et on met notre navbar dans layout




> app\layout.tsx
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/app/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <Navbar />

        <div>
          {children}
        </div>
      </body>
    </html>
  )
}





```

la version finale de la navbar : 

> app\components\Navbar.tsx
``` tsx
import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav 
      className="w-full flex items-center justify-between max-w-7xl mx-auto p-5
      bg-gradient-to-b from-gray-900 to-gray-600 
      "
      >
      <Link href={"/"}>
         <div className="flex items-center justify-center">

          <Image src={"/logo4-1.png"} width={150} height={100} alt="logo" />
          <span className="text-gray-300 text-2xl text-bold">
            Blog
          </span>

         </div>
      
      </Link>
      <div>user</div>
    </nav>
  )
}

export default Navbar
```


### installation de schacn ui

```cmd
npx shadcn-ui@latest init
```

### conifgurer le themes avec shadcn ui
on va dans le site de shadcn, on copie le theme

et on le met dans globals.css

> app\globals.css
```css 
@tailwind base;
@tailwind components;
@tailwind utilities;
 

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 20 14.3% 4.1%;
    --card: 0 0% 100%;
    --card-foreground: 20 14.3% 4.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 20 14.3% 4.1%;
    --primary: 24.6 95% 53.1%;
    --primary-foreground: 60 9.1% 97.8%;
    --secondary: 60 4.8% 95.9%;
    --secondary-foreground: 24 9.8% 10%;
    --muted: 60 4.8% 95.9%;
    --muted-foreground: 25 5.3% 44.7%;
    --accent: 60 4.8% 95.9%;
    --accent-foreground: 24 9.8% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 60 9.1% 97.8%;
    --border: 20 5.9% 90%;
    --input: 20 5.9% 90%;
    --ring: 24.6 95% 53.1%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 20 14.3% 4.1%;
    --foreground: 60 9.1% 97.8%;
    --card: 20 14.3% 4.1%;
    --card-foreground: 60 9.1% 97.8%;
    --popover: 20 14.3% 4.1%;
    --popover-foreground: 60 9.1% 97.8%;
    --primary: 20.5 90.2% 48.2%;
    --primary-foreground: 60 9.1% 97.8%;
    --secondary: 12 6.5% 15.1%;
    --secondary-foreground: 60 9.1% 97.8%;
    --muted: 12 6.5% 15.1%;
    --muted-foreground: 24 5.4% 63.9%;
    --accent: 12 6.5% 15.1%;
    --accent-foreground: 60 9.1% 97.8%;
    --destructive: 0 72.2% 50.6%;
    --destructive-foreground: 60 9.1% 97.8%;
    --border: 12 6.5% 15.1%;
    --input: 12 6.5% 15.1%;
    --ring: 20.5 90.2% 48.2%;
  }
}

 
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### installation de dark mode switcher avec shadcn ui

 ##### - installer le next-themes
la doc : https://ui.shadcn.com/docs/dark-mode/next

```cmd
npm install next-themes
```
##### - Create a theme provider

on creer un fichier
> components/theme-provider.tsx
```tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

```


##### - Wrap your root layout


> app/layout.tsx
```tsx {.typescript .numberLines .lineAnchors highlight=[5,24-29, 37]} 
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/app/components/Navbar'
import { ThemeProvider } from './components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={inter.className}>
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <Navbar />

          <div>
            {children}
          </div>

        </ThemeProvider>

      </body>

    </html>
  )
}

```


##### - Add a mode toggle

```cmd
npx shadcn-ui@latest add dropdown-menu
npm i @radix-ui/react-icons
```

dans app\components\ModeToggle.tsx

> app\components\ModeToggle.tsx
```tsx
"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

```

##### - et enfin, on le met dans notre navbar comme ceci

> app\components\Navbar.tsx
```tsx
<ModeToggle />
```





