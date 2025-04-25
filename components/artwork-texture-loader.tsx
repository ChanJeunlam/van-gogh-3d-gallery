"use client"

import { useEffect, useState } from "react"
import { TextureLoader } from "three"

export function useArtworkTexture(url: string) {
  const [texture, setTexture] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loader = new TextureLoader()

    loader.load(
      url,
      (loadedTexture) => {
        console.log(`Successfully loaded texture: ${url}`)
        setTexture(loadedTexture)
        setLoading(false)
        setError(false)
      },
      undefined,
      (err) => {
        console.error(`Failed to load texture: ${url}`, err)
        setError(true)
        setLoading(false)
      },
    )

    return () => {
      if (texture) {
        texture.dispose()
      }
    }
  }, [url])

  return { texture, error, loading }
}
