// Remove the "use client" directive
// Import necessary components

import { Metadata } from 'next'
import PoolDetailClient from './pool-detail-client'

// Define the params type correctly for Next.js App Router
interface PageProps {
  params: {
    id: string
  }
}

// Update the component to use the correct props typing
export default function PoolPage({ params }: { params: { id: string } }) {
  // Fetch any server-side data here if needed
  
  // Pass the data to a client component
  return <PoolDetailClient params={params} />
}

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }] // Example static paths
}
