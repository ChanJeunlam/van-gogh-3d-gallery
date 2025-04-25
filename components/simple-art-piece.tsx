"use client"

import { Text } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { type Mesh, Vector3, DoubleSide } from "three"

interface SimpleArtPieceProps {
  position: [number, number, number]
  rotation: [number, number, number]
  color: string
  size: [number, number]
  title: string
  artist: string
  year: string
}

export function SimpleArtPiece({ position, rotation, color, size, title, artist, year }: SimpleArtPieceProps) {
  const frameRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

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

  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
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

      {/* Canvas/Painting */}
      <mesh position={[0, 0, frameDepth / 2 + 0.01]}>
        <planeGeometry args={size} />
        <meshBasicMaterial color={color} side={DoubleSide} />
      </mesh>

      {/* Information Text - only show when clicked or hovered */}
      {(clicked || hovered) && (
        <group position={[0, -frameHeight / 2 - 0.3, 0.1]}>
          <Text position={[0, 0, 0]} fontSize={0.15} color="#000000" anchorX="center" anchorY="top">
            {title}
          </Text>
          <Text position={[0, -0.2, 0]} fontSize={0.12} color="#333333" anchorX="center" anchorY="top">
            {artist}, {year}
          </Text>
        </group>
      )}
    </group>
  )
}
