import { useState, useEffect } from 'react'

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [localStorageValue, setLocalStorageValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key)
      return storedValue ? (JSON.parse(storedValue) as T) : defaultValue
    } catch (error) {
      console.error('Error reading localStorage:', error)
      return defaultValue
    }
  })

  useEffect(() => {
    if (localStorageValue !== undefined && localStorageValue !== null) {
      localStorage.setItem(key, JSON.stringify(localStorageValue))
    } else {
      localStorage.removeItem(key) // Auto-remove empty values
    }
  }, [key, localStorageValue])

  const setValue = (valueOrFn: T | ((prev: T) => T)) => {
    setLocalStorageValue((prev) => (typeof valueOrFn === 'function' ? (valueOrFn as (prev: T) => T)(prev) : valueOrFn))
  }

  const reset = () => {
    localStorage.removeItem(key)
    setLocalStorageValue(defaultValue)
  }

  return [localStorageValue, setValue, reset] as const
}
