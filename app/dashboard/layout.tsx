'use client';

import { MyLayoutProps } from '@/app/lib/common';

import 'tdesign-react/dist/tdesign.css';
import '@/app/styles/theme.css';

export default function RootLayout({ children }: MyLayoutProps) {
  return <> {children} </>;
}
