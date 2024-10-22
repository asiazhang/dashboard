'use client';

import { MyLayoutProps } from '@/components/SharedLayout/SharedLayout';
import 'tdesign-react/dist/tdesign.css';
import { StoreProvider } from '../StoreProvider';

export default function RootLayout({ children }: MyLayoutProps) {
  return <StoreProvider>{children}</StoreProvider>;
}
