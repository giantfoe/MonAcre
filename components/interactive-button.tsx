"use client"

import { Button } from "@/components/ui/button"

interface InteractiveButtonProps {
  onClick: () => void
  className?: string
  children: React.ReactNode
}

export default function InteractiveButton({ 
  onClick, 
  className, 
  children 
}: InteractiveButtonProps) {
  return (
    <Button onClick={onClick} className={className}>
      {children}
    </Button>
  )
}