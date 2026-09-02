import type { Metadata } from 'next'
import InstallationPage from '@/components/sections/InstallationPage'
import { installationPages } from '@/data/siteData'

export const metadata: Metadata = installationPages['carro-leve'].meta

export default function InstalacaoCarroLevePage() {
  return <InstallationPage vehicleId="carro-leve" />
}
