import './globals.css'

export const metadata = {
  title: 'Kujaga — Guardian Digital 24/7',
  description: 'Autonomous Identity Security Agent for Indonesian Public Figures. Zero triggers needed.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}