import './globals.css'
 
export const metadata = {
  title: 'Fastodo',
  description: 'A fast and flexible web-based todo list app. No account required.',
}
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
