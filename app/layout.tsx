import 'tdesign-react/dist/tdesign.css';
import { MyLayoutProps } from '@/app/lib/common';

export default async function RootLayout({ children }: MyLayoutProps) {

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
