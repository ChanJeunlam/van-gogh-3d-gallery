"use client"

import { Text } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState, useMemo } from "react"
import { type Mesh, Vector3, DoubleSide, CanvasTexture } from "three"

interface VanGoghArtworkProps {
  position: [number, number, number]
  rotation: [number, number, number]
  size: [number, number]
  title: string
  artist: string
  year: string
  color: string
  style?: "starry" | "sunflower" | "almond" | "iris" | "cafe" | "portrait" | "scream"
  onClick: () => void
}

export default function VanGoghArtwork({
  position,
  rotation,
  size,
  title,
  artist,
  year,
  color,
  style = "starry",
  onClick,
}: VanGoghArtworkProps) {
  const frameRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // 调整颜色亮度的辅助函数
  const adjustColor = (hex: string, percent: number) => {
    let r, g, b
    try {
      const num = Number.parseInt(hex.slice(1), 16)
      r = (num >> 16) + percent
      g = ((num >> 8) & 0x00ff) + percent
      b = (num & 0x0000ff) + percent
    } catch (e) {
      // 默认颜色
      r = 100 + percent
      g = 100 + percent
      b = 100 + percent
    }

    return `rgb(${clamp(r, 0, 255)}, ${clamp(g, 0, 255)}, ${clamp(b, 0, 255)})`
  }

  // 限制值在指定范围内的辅助函数
  const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max)

  // 创建程序化纹理
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const width = 1024
    const height = 1024

    canvas.width = width
    canvas.height = height

    if (!ctx) return new CanvasTexture(canvas)

    // 设置背景色
    ctx.fillStyle = color
    ctx.fillRect(0, 0, width, height)

    // 根据不同风格创建不同的纹理效果
    switch (style) {
      case "starry":
        createStarryNight(ctx, width, height, color)
        break
      case "sunflower":
        createSunflowers(ctx, width, height, color)
        break
      case "almond":
        createAlmondBlossoms(ctx, width, height, color)
        break
      case "iris":
        createIrises(ctx, width, height, color)
        break
      case "cafe":
        createCafeTerrace(ctx, width, height, color)
        break
      case "portrait":
        createPortrait(ctx, width, height, color)
        break
      case "scream":
        createScream(ctx, width, height, color)
        break
      default:
        createVanGoghStyle(ctx, width, height, color)
    }

    return new CanvasTexture(canvas)
  }, [color, style])

  // 创建星夜风格
  function createStarryNight(ctx: CanvasRenderingContext2D, width: number, height: number, color: string) {
    // 深蓝色背景
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, "#0a1a3f")
    gradient.addColorStop(1, "#1a237e")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // 添加星星
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * width
      const y = Math.random() * (height * 0.7)
      const radius = Math.random() * 3 + 1
      const glow = ctx.createRadialGradient(x, y, 0, x, y, radius * 3)
      glow.addColorStop(0, "rgba(255, 255, 200, 0.8)")
      glow.addColorStop(1, "rgba(255, 255, 200, 0)")
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(x, y, radius * 3, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "rgba(255, 255, 200, 0.8)"
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    // 添加旋转的星云
    for (let i = 0; i < 5; i++) {
      const centerX = Math.random() * width
      const centerY = Math.random() * (height * 0.5)
      let radiusX = Math.random() * 100 + 50
      let radiusY = Math.random() * 100 + 50

      ctx.strokeStyle = "rgba(255, 255, 200, 0.5)"
      ctx.lineWidth = 2
      for (let j = 0; j < 20; j++) {
        ctx.beginPath()
        for (let angle = 0; angle < Math.PI * 4; angle += 0.1) {
          const x = centerX + Math.cos(angle) * radiusX * (1 - angle / (Math.PI * 4))
          const y = centerY + Math.sin(angle) * radiusY * (1 - angle / (Math.PI * 4))
          if (angle === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
        radiusX -= 5
        radiusY -= 5
        if (radiusX <= 0 || radiusY <= 0) break
      }
    }

    // 添加村庄轮廓
    ctx.fillStyle = "#001"
    ctx.beginPath()
    ctx.moveTo(0, height * 0.7)
    ctx.lineTo(width, height * 0.7)
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()
    ctx.fill()

    // 添加房屋
    for (let i = 0; i < 10; i++) {
      const x = i * (width / 10) + Math.random() * 20
      const y = height * 0.7
      const houseWidth = Math.random() * 30 + 20
      const houseHeight = Math.random() * 30 + 20
      ctx.fillStyle = "#111"
      ctx.fillRect(x, y - houseHeight, houseWidth, houseHeight)

      // 窗户
      if (Math.random() > 0.5) {
        ctx.fillStyle = "rgba(255, 255, 150, 0.5)"
        ctx.fillRect(x + houseWidth * 0.3, y - houseHeight * 0.6, houseWidth * 0.4, houseHeight * 0.3)
      }
    }

    // 添加柏树
    ctx.fillStyle = "#0a3"
    for (let i = 0; i < 3; i++) {
      const x = Math.random() * width
      const y = height * 0.7
      const treeWidth = 20
      const treeHeight = 100 + Math.random() * 50

      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + treeWidth, y)
      ctx.lineTo(x + treeWidth / 2, y - treeHeight)
      ctx.closePath()
      ctx.fill()
    }

    // 添加梵高风格的笔触
    addVanGoghBrushStrokes(ctx, width, height, color, 3000)
  }

  // 创建向日葵风格
  function createSunflowers(ctx: CanvasRenderingContext2D, width: number, height: number, color: string) {
    // 黄色背景
    ctx.fillStyle = "#FDB813"
    ctx.fillRect(0, 0, width, height)

    // 添加花瓶
    ctx.fillStyle = "#964B00"
    ctx.beginPath()
    ctx.ellipse(width / 2, height * 0.8, width * 0.2, height * 0.05, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(width / 2 - width * 0.15, height * 0.8)
    ctx.bezierCurveTo(
      width / 2 - width * 0.2,
      height * 0.6,
      width / 2 - width * 0.1,
      height * 0.4,
      width / 2 - width * 0.1,
      height * 0.3,
    )
    ctx.lineTo(width / 2 + width * 0.1, height * 0.3)
    ctx.bezierCurveTo(
      width / 2 + width * 0.1,
      height * 0.4,
      width / 2 + width * 0.2,
      height * 0.6,
      width / 2 + width * 0.15,
      height * 0.8,
    )
    ctx.closePath()
    ctx.fill()

    // 添加向日葵
    for (let i = 0; i < 7; i++) {
      const centerX = width / 2 + (Math.random() - 0.5) * width * 0.3
      const centerY = height * 0.25 + (Math.random() - 0.5) * height * 0.2
      const radius = Math.random() * 50 + 30

      // 花瓣
      ctx.fillStyle = "#FFA500"
      for (let j = 0; j < 20; j++) {
        const angle = (j / 20) * Math.PI * 2
        const petalLength = radius * 0.8
        const x1 = centerX + Math.cos(angle) * radius
        const y1 = centerY + Math.sin(angle) * radius
        const x2 = centerX + Math.cos(angle) * (radius + petalLength)
        const y2 = centerY + Math.sin(angle) * (radius + petalLength)

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.closePath()
        ctx.fill()
      }

      // 花心
      ctx.fillStyle = "#654321"
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 0.7, 0, Math.PI * 2)
      ctx.fill()

      // 花心纹理
      ctx.fillStyle = "#543210"
      for (let j = 0; j < 100; j++) {
        const angle = Math.random() * Math.PI * 2
        const dist = Math.random() * radius * 0.6
        const x = centerX + Math.cos(angle) * dist
        const y = centerY + Math.sin(angle) * dist
        const size = Math.random() * 4 + 2

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // 添加梵高风格的笔触
    addVanGoghBrushStrokes(ctx, width, height, color, 3000)
  }

  // 创建杏花风格
  function createAlmondBlossoms(ctx: CanvasRenderingContext2D, width: number, height: number, color: string) {
    // 淡蓝色背景
    ctx.fillStyle = "#81C784"
    ctx.fillRect(0, 0, width, height)

    // 添加树枝
    ctx.strokeStyle = "#8B4513"
    ctx.lineWidth = 5
    drawBranch(ctx, width / 2, height, -Math.PI / 2, height * 0.4, 10)

    // 添加花朵
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * width
      const y = Math.random() * height * 0.7
      drawFlower(ctx, x, y, Math.random() * 10 + 5)
    }

    // 添加梵高风格的笔触
    addVanGoghBrushStrokes(ctx, width, height, color, 2000)
  }

  // 递归绘制树枝
  function drawBranch(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    angle: number,
    length: number,
    width: number,
  ) {
    if (length < 10) return

    const endX = x + Math.cos(angle) * length
    const endY = y + Math.sin(angle) * length

    ctx.lineWidth = width
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(endX, endY)
    ctx.stroke()

    // 随机在树枝上添加花朵
    if (length < 60 && Math.random() > 0.7) {
      drawFlower(ctx, endX, endY, Math.random() * 10 + 5)
    }

    // 递归绘制子树枝
    const branchCount = Math.floor(Math.random() * 3) + 1
    for (let i = 0; i < branchCount; i++) {
      const newAngle = angle + ((Math.random() - 0.5) * Math.PI) / 2
      const newLength = length * (0.6 + Math.random() * 0.3)
      const newWidth = width * 0.7
      drawBranch(ctx, endX, endY, newAngle, newLength, newWidth)
    }
  }

  // 绘制花朵
  function drawFlower(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
    // 花瓣
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2
      const petalX = x + Math.cos(angle) * radius
      const petalY = y + Math.sin(angle) * radius

      ctx.beginPath()
      ctx.ellipse(petalX, petalY, radius, radius / 2, angle, 0, Math.PI * 2)
      ctx.fill()
    }

    // 花心
    ctx.fillStyle = "rgba(255, 255, 150, 0.8)"
    ctx.beginPath()
    ctx.arc(x, y, radius / 3, 0, Math.PI * 2)
    ctx.fill()
  }

  // 创建鸢尾花风格
  function createIrises(ctx: CanvasRenderingContext2D, width: number, height: number, color: string) {
    // 绿色背景
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, "#5E35B1")
    gradient.addColorStop(1, "#3949AB")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // 添加鸢尾花
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * width
      const y = height * 0.3 + Math.random() * height * 0.6
      drawIris(ctx, x, y, Math.random() * 30 + 40)
    }

    // 添加梵高风格的笔触
    addVanGoghBrushStrokes(ctx, width, height, color, 3000)
  }

  // 绘制鸢尾花
  function drawIris(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    // 茎
    ctx.strokeStyle = "#0B6623"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x, y + size * 2)
    ctx.stroke()

    // 叶子
    ctx.fillStyle = "#0B8A20"
    ctx.beginPath()
    ctx.ellipse(x - size / 3, y + size, size / 4, size, Math.PI / 4, 0, Math.PI * 2)
    ctx.fill()

    // 花瓣
    ctx.fillStyle = "#4B0082"
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2
      const petalX = x + (Math.cos(angle) * size) / 3
      const petalY = y + (Math.sin(angle) * size) / 3

      ctx.beginPath()
      ctx.ellipse(petalX, petalY, size / 2, size / 4, angle, 0, Math.PI * 2)
      ctx.fill()
    }

    // 花心
    ctx.fillStyle = "#FFF5EE"
    ctx.beginPath()
    ctx.arc(x, y, size / 6, 0, Math.PI * 2)
    ctx.fill()
  }

  // 创建夜间咖啡馆风格
  function createCafeTerrace(ctx: CanvasRenderingContext2D, width: number, height: number, color: string) {
    // 深蓝色背景（夜空）
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, "#0a1a3f")
    gradient.addColorStop(0.5, "#1a237e")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // 添加星星
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * width
      const y = Math.random() * (height * 0.4)
      const radius = Math.random() * 2 + 1
      ctx.fillStyle = "rgba(255, 255, 200, 0.8)"
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    // 咖啡馆建筑
    ctx.fillStyle = "#4E3B31"
    ctx.fillRect(width * 0.1, height * 0.4, width * 0.8, height * 0.6)

    // 咖啡馆窗户
    for (let i = 0; i < 5; i++) {
      const x = width * 0.2 + i * width * 0.15
      const y = height * 0.5
      ctx.fillStyle = "#FFF59D"
      ctx.fillRect(x, y, width * 0.1, height * 0.15)
    }

    // 咖啡馆露台
    ctx.fillStyle = "#8D6E63"
    ctx.fillRect(width * 0.2, height * 0.7, width * 0.6, height * 0.3)

    // 桌子
    for (let i = 0; i < 3; i++) {
      const x = width * 0.3 + i * width * 0.2
      const y = height * 0.8
      ctx.fillStyle = "#FFF59D"
      ctx.beginPath()
      ctx.arc(x, y, width * 0.05, 0, Math.PI * 2)
      ctx.fill()

      // 椅子
      for (let j = 0; j < 3; j++) {
        const angle = (j / 3) * Math.PI * 2
        const chairX = x + Math.cos(angle) * width * 0.08
        const chairY = y + Math.sin(angle) * width * 0.08
        ctx.fillStyle = "#D7CCC8"
        ctx.beginPath()
        ctx.arc(chairX, chairY, width * 0.02, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // 添加梵高风格的笔触
    addVanGoghBrushStrokes(ctx, width, height, color, 3000)
  }

  // 创建肖像风格（蒙娜丽莎）
  function createPortrait(ctx: CanvasRenderingContext2D, width: number, height: number, color: string) {
    // 棕色背景
    ctx.fillStyle = "#795548"
    ctx.fillRect(0, 0, width, height)

    // 脸部轮廓
    ctx.fillStyle = "#E0C9A6"
    ctx.beginPath()
    ctx.ellipse(width / 2, height * 0.4, width * 0.15, height * 0.2, 0, 0, Math.PI * 2)
    ctx.fill()

    // 头发
    ctx.fillStyle = "#3E2723"
    ctx.beginPath()
    ctx.ellipse(width / 2, height * 0.35, width * 0.2, height * 0.25, 0, 0, Math.PI * 2)
    ctx.fill()

    // 脸部
    ctx.fillStyle = "#E0C9A6"
    ctx.beginPath()
    ctx.ellipse(width / 2, height * 0.4, width * 0.15, height * 0.2, 0, 0, Math.PI * 2)
    ctx.fill()

    // 眼睛
    ctx.fillStyle = "#3E2723"
    ctx.beginPath()
    ctx.ellipse(width / 2 - width * 0.05, height * 0.35, width * 0.02, height * 0.01, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(width / 2 + width * 0.05, height * 0.35, width * 0.02, height * 0.01, 0, 0, Math.PI * 2)
    ctx.fill()

    // 嘴巴（微笑）
    ctx.strokeStyle = "#3E2723"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(width / 2, height * 0.45, width * 0.05, 0.1, Math.PI - 0.1)
    ctx.stroke()

    // 身体
    ctx.fillStyle = "#5D4037"
    ctx.beginPath()
    ctx.moveTo(width / 2 - width * 0.2, height * 0.6)
    ctx.lineTo(width / 2 + width * 0.2, height * 0.6)
    ctx.lineTo(width / 2 + width * 0.3, height)
    ctx.lineTo(width / 2 - width * 0.3, height)
    ctx.closePath()
    ctx.fill()

    // 添加梵高风格的笔触
    addVanGoghBrushStrokes(ctx, width, height, color, 2000)
  }

  // 创建呐喊风格
  function createScream(ctx: CanvasRenderingContext2D, width: number, height: number, color: string) {
    // 橙红色背景
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, "#FF5722")
    gradient.addColorStop(0.5, "#E64A19")
    gradient.addColorStop(1, "#BF360C")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // 桥
    ctx.fillStyle = "#3E2723"
    ctx.beginPath()
    ctx.moveTo(0, height * 0.7)
    ctx.lineTo(width, height * 0.7)
    ctx.lineTo(width, height * 0.8)
    ctx.lineTo(0, height * 0.8)
    ctx.closePath()
    ctx.fill()

    // 扭曲的人形
    ctx.fillStyle = "#455A64"
    // 头
    ctx.beginPath()
    ctx.ellipse(width / 2, height * 0.4, width * 0.1, height * 0.15, 0, 0, Math.PI * 2)
    ctx.fill()

    // 身体
    ctx.beginPath()
    ctx.moveTo(width / 2, height * 0.55)
    ctx.bezierCurveTo(
      width / 2 - width * 0.1,
      height * 0.6,
      width / 2 - width * 0.1,
      height * 0.65,
      width / 2,
      height * 0.7,
    )
    ctx.bezierCurveTo(
      width / 2 + width * 0.1,
      height * 0.65,
      width / 2 + width * 0.1,
      height * 0.6,
      width / 2,
      height * 0.55,
    )
    ctx.closePath()
    ctx.fill()

    // 手
    ctx.beginPath()
    ctx.ellipse(width / 2 - width * 0.15, height * 0.5, width * 0.05, height * 0.1, Math.PI / 4, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(width / 2 + width * 0.15, height * 0.5, width * 0.05, height * 0.1, -Math.PI / 4, 0, Math.PI * 2)
    ctx.fill()

    // 脸部表情（惊恐）
    ctx.fillStyle = "#ECEFF1"
    ctx.beginPath()
    ctx.ellipse(width / 2, height * 0.4, width * 0.08, height * 0.12, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "#000"
    // 眼睛
    ctx.beginPath()
    ctx.ellipse(width / 2 - width * 0.03, height * 0.37, width * 0.02, height * 0.02, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(width / 2 + width * 0.03, height * 0.37, width * 0.02, height * 0.02, 0, 0, Math.PI * 2)
    ctx.fill()

    // 嘴巴（尖叫）
    ctx.beginPath()
    ctx.ellipse(width / 2, height * 0.45, width * 0.04, height * 0.06, 0, 0, Math.PI * 2)
    ctx.fill()

    // 添加梵高风格的笔触
    addVanGoghBrushStrokes(ctx, width, height, color, 3000)
  }

  // 创建通用梵高风格
  function createVanGoghStyle(ctx: CanvasRenderingContext2D, width: number, height: number, color: string) {
    // 设置背景色
    ctx.fillStyle = color
    ctx.fillRect(0, 0, width, height)

    // 添加梵高风格的笔触
    addVanGoghBrushStrokes(ctx, width, height, color, 3000)
  }

  // 添加梵高风格的笔触
  function addVanGoghBrushStrokes(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    color: string,
    count: number,
  ) {
    for (let i = 0; i < count; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const length = Math.random() * 20 + 5
      const angle = Math.random() * Math.PI * 2
      const thickness = Math.random() * 3 + 1

      ctx.strokeStyle = adjustColor(color, Math.random() * 50 - 25)
      ctx.lineWidth = thickness
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length)
      ctx.stroke()
    }
  }

  // Frame dimensions
  const frameWidth = size[0] + 0.2
  const frameHeight = size[1] + 0.2
  const frameDepth = 0.1

  useFrame(() => {
    if (frameRef.current && hovered) {
      frameRef.current.scale.lerp(new Vector3(1.05, 1.05, 1.05), 0.1)
    } else if (frameRef.current) {
      frameRef.current.scale.lerp(new Vector3(1, 1, 1), 0.1)
    }
  })

  const handleClick = () => {
    setClicked(!clicked)
    onClick()
  }

  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <mesh
        ref={frameRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
        castShadow
      >
        <boxGeometry args={[frameWidth, frameHeight, frameDepth]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Canvas/Painting */}
      <mesh position={[0, 0, frameDepth / 2 + 0.01]}>
        <planeGeometry args={size} />
        <meshBasicMaterial map={texture} side={DoubleSide} />
      </mesh>

      {/* Information Text - only show when hovered */}
      {hovered && (
        <group position={[0, -frameHeight / 2 - 0.1, 0.1]}>
          <Text position={[0, 0, 0]} fontSize={0.18} color="#000000" anchorX="center" anchorY="top">
            {title}
          </Text>
          <Text position={[0, -0.25, 0]} fontSize={0.14} color="#333333" anchorX="center" anchorY="top">
            {artist}, {year}
          </Text>
        </group>
      )}
    </group>
  )
}
