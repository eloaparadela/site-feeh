import type { Metadata } from 'next'
import InstallationPage from '@/components/sections/InstallationPage'
import { installationPages } from '@/data/siteData'

export const metadata: Metadata = installationPages.utilitario.meta

export default function InstalacaoUtilitarioPage() {
  return <InstallationPage vehicleId="utilitario" />
}
