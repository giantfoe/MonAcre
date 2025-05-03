// Remove the "use client" directive
// Import necessary components

import { Metadata } from 'next'
import PoolDetailClient from './pool-detail-client'

// Update the interface to match Next.js App Router expectations
export interface PageProps {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function PoolDetailPage({ params }: PageProps) {
  // Fetch any server-side data here if needed
  
  // Pass the data to a client component
  return <PoolDetailClient params={params} />
}

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }] // Example static paths
}
