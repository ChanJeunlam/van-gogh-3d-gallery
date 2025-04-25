"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import GalleryRoom from "./gallery-room"
import GalleryFloor from "./gallery-floor"
import VanGoghArtwork from "./van-gogh-artwork"
import InfoPanel from "./info-panel"
import ArtworkDetail from "./artwork-detail"

// 画作数据
const artworks = [
  {
    id: 1,
    title: "星夜",
    originalTitle: "The Starry Night",
    artist: "文森特·梵高",
    year: "1889",
    technique: "油画",
    description:
      "《星夜》是梵高在圣雷米精神病院期间创作的作品。画中旋转的星空、月亮和柏树表达了梵高内心的情感波动。这幅画以其强烈的色彩和动感的笔触著称，被认为是表现主义的代表作。",
    meaning:
      "梵高通过这幅画表达了他对宇宙的敬畏和对永恒的追求。旋转的星空象征着生命的动荡与宇宙的神秘，而村庄的宁静则代表着人类在浩瀚宇宙中的渺小与安宁。",
    imageUrl: "/images/starry-night.png",
    color: "#1a237e", // 深蓝色代表星夜
    style: "starry",
    position: [-4.9, 2, 0],
    rotation: [0, Math.PI / 2, 0],
    size: [3, 2.4],
  },
  {
    id: 2,
    title: "向日葵",
    originalTitle: "Sunflowers",
    artist: "文森特·梵高",
    year: "1888",
    technique: "油画",
    description:
      "《向日葵》系列是梵高最著名的作品之一。他在阿尔勒期间创作了多幅向日葵画作，用来装饰他的黄房子，迎接好友高更的到访。这些画以明亮的黄色和金色为主，充满活力和温暖。",
    meaning:
      "向日葵对梵高来说象征着友谊和希望。这些充满阳光的花朵代表了他对生活的热爱和对美好未来的向往。每一朵向日葵都有自己的个性，就像人类一样独特而美丽。",
    imageUrl: "/images/sunflowers.png",
    color: "#FDB813", // 黄色代表向日葵
    style: "sunflower",
    position: [4.9, 2, 0],
    rotation: [0, -Math.PI / 2, 0],
    size: [2, 2.5],
  },
  {
    id: 3,
    title: "夜间露天咖啡馆",
    originalTitle: "Café Terrace at Night",
    artist: "文森特·梵高",
    year: "1888",
    technique: "油画",
    description:
      "《夜间露天咖啡馆》描绘了法国阿尔勒广场上的一家咖啡馆。梵高没有使用黑色，而是通过蓝色和黄色的对比来表现夜晚的氛围。这是他第一次在画作中使用星空背景。",
    meaning:
      "这幅画体现了梵高对城市夜生活的着迷。明亮的咖啡馆灯光与深蓝色的夜空形成鲜明对比，象征着人类文明之光在宇宙黑暗中的温暖。画中的星空预示了后来著名的《星夜》。",
    imageUrl: "/images/cafe-terrace.png",
    color: "#1565C0", // 蓝色代表夜间咖啡馆
    style: "cafe",
    position: [0, 2, -4.9],
    rotation: [0, 0, 0],
    size: [2.5, 3],
  },
  {
    id: 4,
    title: "杏花",
    originalTitle: "Almond Blossoms",
    artist: "文森特·梵高",
    year: "1890",
    technique: "油画",
    description:
      "《杏花》是梵高为庆祝侄子文森特的出生而创作的。画中盛开的杏花枝条衬托在蓝天背景上，充满了生命力和希望。这幅画受到日本浮世绘的影响，构图简洁而优雅。",
    meaning:
      "杏花在梵高眼中象征着新生命和希望。这幅画是他送给侄子的礼物，表达了对新生命的祝福。淡蓝色的背景和白色的花朵营造出宁静而喜悦的氛围，反映了梵高内心短暂的平静与幸福。",
    imageUrl: "/images/almond-blossoms.png",
    color: "#81C784", // 淡绿色代表杏花
    style: "almond",
    position: [-2.5, 2, -4.9],
    rotation: [0, 0, 0],
    size: [2, 2.5],
  },
  {
    id: 5,
    title: "鸢尾花",
    originalTitle: "Irises",
    artist: "文森特·梵高",
    year: "1889",
    technique: "油画",
    description:
      "《鸢尾花》是梵高在圣雷米精神病院花园中所见的景象。画中紫色的鸢尾花在绿色背景中显得格外生动。梵高用粗犷的笔触和鲜艳的色彩捕捉了花朵的生命力。",
    meaning:
      "鸢尾花在梵高的创作中代表着生命的韧性和美丽。即使在精神病院这样的环境中，他仍然能够发现并表现自然的美。这幅画也反映了他对色彩和自然形态的敏锐观察力。",
    imageUrl: "/images/irises.png",
    color: "#5E35B1", // 紫色代表鸢尾花
    style: "iris",
    position: [2.5, 2, -4.9],
    rotation: [0, 0, 0],
    size: [2, 2.5],
  },
  {
    id: 6,
    title: "蒙娜丽莎",
    originalTitle: "Mona Lisa",
    artist: "列奥纳多·达·芬奇",
    year: "1503-1519",
    technique: "油画",
    description:
      "《蒙娜丽莎》是达芬奇最著名的作品之一，描绘了一位神秘微笑的女性肖像。这幅画以其精湛的技法和主题的神秘感而闻名于世。",
    meaning:
      "蒙娜丽莎的微笑成为了艺术史上最具标志性的形象之一，象征着文艺复兴时期人文主义的精神和对人类情感的深入探索。",
    imageUrl: "/images/mona-lisa.png",
    color: "#795548", // 棕色代表蒙娜丽莎
    style: "portrait",
    position: [-3.5, 2, 4.9],
    rotation: [0, Math.PI, 0],
    size: [1.8, 2.5],
  },
  {
    id: 7,
    title: "呐喊",
    originalTitle: "The Scream",
    artist: "爱德华·蒙克",
    year: "1893",
    technique: "油画",
    description:
      "《呐喊》是表现主义的代表作，描绘了一个扭曲的人形在桥上发出尖叫，背景是血红色的天空。这幅画表达了现代人的焦虑和恐惧。",
    meaning:
      "《呐喊》被视为现代人精神危机的象征，表达了人类面对现代社会时的孤独、焦虑和恐惧。扭曲的形象和鲜艳的色彩强化了这种情感体验。",
    imageUrl: "/images/the-scream.png",
    color: "#FF5722", // 橙红色代表呐喊
    style: "scream",
    position: [3.5, 2, 4.9],
    rotation: [0, Math.PI, 0],
    size: [2, 2.5],
  },
]

export default function ArtGallery() {
  const [showInfo, setShowInfo] = useState(true)
  const [selectedArtwork, setSelectedArtwork] = useState(null)

  const handleEnterGallery = () => {
    setShowInfo(false)
  }

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork)
  }

  const handleCloseDetail = () => {
    setSelectedArtwork(null)
  }

  return (
    <>
      {showInfo && <InfoPanel onEnter={handleEnterGallery} />}
      {selectedArtwork && <ArtworkDetail artwork={selectedArtwork} onClose={handleCloseDetail} />}

      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 1.5, 4]} fov={75} />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[0, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          <GalleryRoom />
          <GalleryFloor />

          {artworks.map((artwork) => (
            <VanGoghArtwork
              key={artwork.id}
              position={artwork.position}
              rotation={artwork.rotation}
              size={artwork.size}
              title={artwork.originalTitle}
              artist={artwork.artist}
              year={artwork.year}
              color={artwork.color}
              style={artwork.style}
              onClick={() => handleArtworkClick(artwork)}
            />
          ))}

          <OrbitControls
            enablePan={false}
            minDistance={1}
            maxDistance={10}
            minPolarAngle={0.1}
            maxPolarAngle={Math.PI - 0.1}
          />
          <Environment preset="apartment" />
        </Suspense>
      </Canvas>
    </>
  )
}
