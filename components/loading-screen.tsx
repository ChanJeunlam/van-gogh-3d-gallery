"use client"

import { useProgress } from "@react-three/drei"
import { useEffect } from "react"

interface LoadingScreenProps {
  setIsLoading: (loading: boolean) => void
}

export default function LoadingScreen({ setIsLoading }: LoadingScreenProps) {
  const { progress, loaded, total } = useProgress()

  useEffect(() => {
    if (loaded === total && total > 0) {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [loaded, total, setIsLoading])

  return null
}
