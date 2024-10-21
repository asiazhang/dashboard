'use client';

import SharedLayout, { MyLayoutProps } from '@/components/SharedLayout/SharedLayout';
import 'tdesign-react/dist/tdesign.css';

export default function RootLayout({ children }: MyLayoutProps) {
  return <SharedLayout>{children}</SharedLayout>;
}
