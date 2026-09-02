import type { Metadata } from 'next'
import InstallationPage from '@/components/sections/InstallationPage'
import { installationPages } from '@/data/siteData'

export const metadata: Metadata = installationPages.caminhao.meta

export default function InstalacaoCaminhaoPage() {
  return <InstallationPage vehicleId="caminhao" />
}
