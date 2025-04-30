import { Metadata } from 'next';
import NotFoundClient from '@/components/not-found-client';

export const metadata: Metadata = {
  title: 'Page Not Found | SolFund',
};

export default function NotFound() {
  return <NotFoundClient />;
}