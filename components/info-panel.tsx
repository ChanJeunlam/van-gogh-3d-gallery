"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface InfoPanelProps {
  onEnter: () => void
}

export default function InfoPanel({ onEnter }: InfoPanelProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
      <Card className="w-[90%] max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">梵高艺术画廊</CardTitle>
          <CardDescription className="text-center">欢迎来到梵高作品的3D交互式画廊</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">这是一个虚拟的3D画廊，您可以在沉浸式环境中欣赏梵高的著名作品。</p>
          <p className="mb-4">
            <strong>操作方法：</strong>
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>点击并拖动鼠标可以环顾四周</li>
            <li>滚动鼠标滚轮可以放大和缩小</li>
            <li>将鼠标悬停在画作上可以查看基本信息</li>
            <li>点击画作可以查看详细的中文介绍</li>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={onEnter} className="px-8">
            进入画廊
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
