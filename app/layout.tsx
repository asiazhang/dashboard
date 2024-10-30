import { MyLayoutProps } from '@/app/lib/common';
import SharedLayout from '@/components/SharedLayout/SharedLayout';
import { StoreProvider } from './StoreProvider';

import 'tdesign-react/dist/tdesign.css';
import '@/app/styles/theme.css';

export default async function RootLayout({ children }: MyLayoutProps) {
  return (
    <html>
      <body>
        <StoreProvider>
          <SharedLayout>{children}</SharedLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
