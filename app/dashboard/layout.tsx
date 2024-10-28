'use client';

// import SharedLayout from '@/components/SharedLayout/SharedLayout';
import 'tdesign-react/dist/tdesign.css';
import { MyLayoutProps } from '@/app/lib/common';

export default function RootLayout({ children }: MyLayoutProps) {
  return <> {children} </>;
}
