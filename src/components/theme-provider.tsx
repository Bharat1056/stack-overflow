"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [client, setClient] = React.useState(false)
  React.useEffect(() => {
    setClient(true)
  }, [])

  if (client) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
  }
}
