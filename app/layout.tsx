'use client';

import SharedLayout, { MyLayoutProps } from '@/components/SharedLayout/SharedLayout';
import 'tdesign-react/dist/tdesign.css';

export default function RootLayout({ children }: MyLayoutProps) {
  return (
    <html>
      <body>
        <SharedLayout>{children}</SharedLayout>
      </body>
    </html>
  );
}
