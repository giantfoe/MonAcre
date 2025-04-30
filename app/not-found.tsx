import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Load client component without SSR
const NotFoundClient = dynamic(
  () => import('@/components/not-found-client'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return <NotFoundClient />;
}