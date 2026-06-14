import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ThemeProvider from '@/components/providers/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Prosat — Sistema de Rastreamento Veicular',
  description:
    'Rastreamento veicular profissional para carros, motos, caminhões e frotas. Monitoramento 24h, app intuitivo e preço justo.',
  keywords: ['rastreamento veicular', 'rastreador', 'monitoramento', 'frotas', 'segurança veicular', 'Prosat'],
  openGraph: {
    title: 'Prosat — Sistema de Rastreamento Veicular',
    description: 'Rastreamento veicular 24h para carros, motos, caminhões e frotas.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable} data-theme="light">
      <head>
        {/*
          Script anti-flash: aplica o tema salvo no localStorage ANTES da
          primeira pintura, evitando o piscar de tema errado no carregamento.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('prosat-theme') || 'light';
                document.documentElement.setAttribute('data-theme', t);
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          {/* Mobile: header só tem a faixa superior (64px). Desktop: faixa + nav (64+56=120px) */}
          <div className="pt-16 lg:pt-[120px]">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
