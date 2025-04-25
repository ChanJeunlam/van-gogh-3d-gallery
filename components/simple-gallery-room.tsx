import { DoubleSide } from "three"

export function SimpleGalleryRoom() {
  return (
    <group>
      {/* Ceiling */}
      <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f0e6d2" side={DoubleSide} />
      </mesh>

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#d0d0d0" side={DoubleSide} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#f5f5f5" side={DoubleSide} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#f5f5f5" side={DoubleSide} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 2.5, -5]} rotation={[0, 0, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#f5f5f5" side={DoubleSide} />
      </mesh>

      {/* Front Wall with Door */}
      <mesh position={[-2.5, 2.5, 5]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial color="#f5f5f5" side={DoubleSide} />
      </mesh>

      <mesh position={[2.5, 2.5, 5]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial color="#f5f5f5" side={DoubleSide} />
      </mesh>
    </group>
  )
}
