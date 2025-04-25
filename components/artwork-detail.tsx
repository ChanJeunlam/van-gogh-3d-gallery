"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useState } from "react"

interface ArtworkDetailProps {
  artwork: {
    id: number
    title: string
    originalTitle: string
    artist: string
    year: string
    technique: string
    description: string
    meaning: string
    imageUrl: string
    color: string
  }
  onClose: () => void
}

export default function ArtworkDetail({ artwork, onClose }: ArtworkDetailProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{artwork.title}</CardTitle>
              <CardDescription>
                {artwork.originalTitle}, {artwork.year}
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">关闭</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="relative aspect-[4/3] w-full">
            {!imageError ? (
              <div className="w-full h-full relative">
                <Image
                  src={artwork.imageUrl || "/placeholder.svg"}
                  alt={artwork.title}
                  fill
                  className="object-contain"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="w-full h-full rounded-md" style={{ backgroundColor: artwork.color }} />
            )}
          </div>
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">艺术家</h3>
              <p>{artwork.artist}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">创作年份</h3>
              <p>{artwork.year}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">技法</h3>
              <p>{artwork.technique}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">作品描述</h3>
              <p>{artwork.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">作品意境</h3>
              <p>{artwork.meaning}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={onClose}>返回画廊</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
