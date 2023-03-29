'use client';

import { AuthContextProvider } from '../context/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <AuthContextProvider>
        <body>{children}</body>
      </AuthContextProvider>
    </html>
  )
}
