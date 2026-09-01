import './globals.css';

export const metadata = {
  title: 'Mahir Elzenna | Personal Platform',
  description: 'Executive Manager & Business Operations Specialist',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body>{children}</body>
    </html>
  );
}
