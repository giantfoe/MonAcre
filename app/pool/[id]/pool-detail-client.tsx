"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// ... other imports from your original file

interface PoolDetailClientProps {
  params: { id: string }
}

export default function PoolDetailClient({ params }: PoolDetailClientProps) {
  const [investAmount, setInvestAmount] = useState("")
  
  // All your client-side logic from the original file
  // ... existing code ...
  
  return (
    // Your existing JSX
    // ... existing code ...
  )
}