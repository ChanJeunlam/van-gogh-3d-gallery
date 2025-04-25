"use client"

import { DoubleSide } from "three"
import { useMemo } from "react"
import { CanvasTexture } from "three"

export default function GalleryFloor() {
  // 调整颜色亮度的辅助函数
  const adjustColor = (hex, percent) => {
    const num = Number.parseInt(hex.replace("#", ""), 16)
    const r = (num >> 16) + percent
    const g = ((num >> 8) & 0x00ff) + percent
    const b = (num & 0x0000ff) + percent

    return `rgb(${clamp(r, 0, 255)}, ${clamp(g, 0, 255)}, ${clamp(b, 0, 255)})`
  }

  // 限制值在指定范围内的辅助函数
  const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

  // 创建程序化地板纹理
  const floorTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const width = 512
    const height = 512

    canvas.width = width
    canvas.height = height

    if (ctx) {
      // 设置背景色
      ctx.fillStyle = "#d0d0d0"
      ctx.fillRect(0, 0, width, height)

      // 创建木地板纹理
      const boardWidth = 64
      const boardHeight = 256

      for (let y = 0; y < height; y += boardHeight) {
        for (let x = 0; x < width; x += boardWidth) {
          // 随机木板颜色
          const brightness = Math.random() * 20 - 10
          ctx.fillStyle = adjustColor("#d0d0d0", brightness)
          ctx.fillRect(x, y, boardWidth, boardHeight)

          // 添加木纹
          for (let i = 0; i < 8; i++) {
            const lineY = y + Math.random() * boardHeight
            ctx.strokeStyle = adjustColor("#d0d0d0", Math.random() * 15 - 15)
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(x, lineY)
            ctx.lineTo(x + boardWidth, lineY)
            ctx.stroke()
          }

          // 添加木板间隙
          ctx.fillStyle = "#b0b0b0"
          ctx.fillRect(x, y, boardWidth, 2)
          ctx.fillRect(x, y, 2, boardHeight)
        }
      }
    }

    const texture = new CanvasTexture(canvas)
    texture.wrapS = texture.wrapT = 1000 // RepeatWrapping
    texture.repeat.set(4, 4)
    return texture
  }, [])

  return (
    <group>
      {/* Main floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial map={floorTexture} side={DoubleSide} />
      </mesh>

      {/* Add a second floor below to prevent seeing through when looking up */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#d0d0d0" side={DoubleSide} />
      </mesh>
    </group>
  )
}
