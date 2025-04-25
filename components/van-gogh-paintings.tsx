"use client"

import { Canvas } from "@react-three/fiber"
import { useState } from "react"
import { Environment, OrbitControls, PerspectiveCamera, Text } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { type Mesh, Vector3 } from "three"

// 创建一个简单的梵高风格的画作组件
function VanGoghStylePainting({ position, rotation, color, size, title, artist, year }) {
  const frameRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // 画框尺寸
  const frameWidth = size[0] + 0.2
  const frameHeight = size[1] + 0.2
  const frameDepth = 0.1

  // 创建梵高风格的纹理效果
  const vanGoghEffect = () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const width = 256
    const height = 256

    canvas.width = width
    canvas.height = height

    if (ctx) {
      // 设置背景色
      ctx.fillStyle = color
      ctx.fillRect(0, 0, width, height)

      // 添加梵高风格的笔触效果
      for (let i = 0; i < 1000; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const length = Math.random() * 10 + 5
        const angle = Math.random() * Math.PI * 2

        ctx.strokeStyle = adjustColor(color, Math.random() * 30 - 15)
        ctx.lineWidth = Math.random() * 2 + 1
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length)
        ctx.stroke()
      }
    }

    return canvas
  }

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

  useFrame(() => {
    if (frameRef.current && hovered) {
      frameRef.current.scale.lerp(new Vector3(1.05, 1.05, 1.05), 0.1)
    } else if (frameRef.current) {
      frameRef.current.scale.lerp(new Vector3(1, 1, 1), 0.1)
    }
  })

  return (
    <group position={position} rotation={rotation}>
      {/* 画框 */}
      <mesh
        ref={frameRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
        castShadow
      >
        <boxGeometry args={[frameWidth, frameHeight, frameDepth]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* 画布/画作 */}
      <mesh position={[0, 0, frameDepth / 2 + 0.01]}>
        <planeGeometry args={size} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* 信息文本 - 仅在点击或悬停时显示 */}
      {(clicked || hovered) && (
        <group position={[0, -frameHeight / 2 - 0.3, 0.1]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.15}
            color="#000000"
            anchorX="center"
            anchorY="top"
            font="/fonts/Inter_Bold.json"
          >
            {title}
          </Text>
          <Text
            position={[0, -0.2, 0]}
            fontSize={0.12}
            color="#333333"
            anchorX="center"
            anchorY="top"
            font="/fonts/Inter_Regular.json"
          >
            {artist}, {year}
          </Text>
        </group>
      )}
    </group>
  )
}

export default function VanGoghGallery() {
  const [showInfo, setShowInfo] = useState(true)

  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault position={[0, 1.5, 4]} fov={75} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 5]} intensity={1} castShadow />

      {/* 星夜 */}
      <VanGoghStylePainting
        position={[-2, 1, -3]}
        rotation={[0, 0, 0]}
        color="#1a237e"
        size={[2, 1.5]}
        title="The Starry Night"
        artist="Vincent van Gogh"
        year="1889"
      />

      {/* 向日葵 */}
      <VanGoghStylePainting
        position={[2, 1, -3]}
        rotation={[0, 0, 0]}
        color="#FDB813"
        size={[1.5, 2]}
        title="Sunflowers"
        artist="Vincent van Gogh"
        year="1888"
      />

      <OrbitControls enablePan={false} />
      <Environment preset="apartment" />
    </Canvas>
  )
}
