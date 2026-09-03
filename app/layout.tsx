import TanStackProvider from '@/components/TanStackProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}