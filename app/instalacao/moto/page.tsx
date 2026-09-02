import type { Metadata } from 'next'
import InstallationPage from '@/components/sections/InstallationPage'
import { installationPages } from '@/data/siteData'

export const metadata: Metadata = installationPages.moto.meta

export default function InstalacaoMotoPage() {
  return <InstallationPage vehicleId="moto" />
}
