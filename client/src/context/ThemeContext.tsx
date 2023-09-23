import { useState, createContext } from "react"

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void
}

type ThemeProviderProps = {
  children: React.ReactNode
}

export const ThemeContext = createContext<ThemeContextType>({theme: 'light', toggleTheme: () => null})

export function ThemeProvider({children}: ThemeProviderProps) {

  
  const [theme, settheme] = useState(localStorage.getItem('theme') || 'light')

  const toggleTheme = () => {
    settheme(theme === 'light' ? 'dark' : 'light')
    localStorage.setItem('theme', theme)
  }


  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

