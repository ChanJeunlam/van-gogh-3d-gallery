"use client"

import { DoubleSide } from "three"
import { useMemo } from "react"
import { CanvasTexture } from "three"

export default function GalleryRoom() {
  // 创建程序化墙壁纹理
  const wallTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const width = 512
    const height = 512

    canvas.width = width
    canvas.height = height

    if (ctx) {
      // 设置背景色
      ctx.fillStyle = "#f5f5f5"
      ctx.fillRect(0, 0, width, height)

      // 添加一些纹理细节
      for (let y = 0; y < height; y += 4) {
        for (let x = 0; x < width; x += 4) {
          const value = Math.floor(Math.random() * 10)
          if (value === 0) {
            ctx.fillStyle = "#e0e0e0"
            ctx.fillRect(x, y, 4, 4)
          } else if (value === 1) {
            ctx.fillStyle = "#eeeeee"
            ctx.fillRect(x, y, 4, 4)
          }
        }
      }
    }

    const texture = new CanvasTexture(canvas)
    texture.wrapS = texture.wrapT = 1000 // RepeatWrapping
    texture.repeat.set(2, 1)
    return texture
  }, [])

  return (
    <group>
      {/* Ceiling */}
      <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f0e6d2" side={DoubleSide} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial map={wallTexture} side={DoubleSide} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial map={wallTexture} side={DoubleSide} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 2.5, -5]} rotation={[0, 0, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial map={wallTexture} side={DoubleSide} />
      </mesh>

      {/* Front Wall with Door */}
      <mesh position={[-2.5, 2.5, 5]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial map={wallTexture} side={DoubleSide} />
      </mesh>

      <mesh position={[2.5, 2.5, 5]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial map={wallTexture} side={DoubleSide} />
      </mesh>
    </group>
  )
}
