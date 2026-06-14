import HeroSection from '@/components/sections/HeroSection'
import AppSection from '@/components/sections/AppSection'
import FleetSection from '@/components/sections/FleetSection'
import PricingSection from '@/components/sections/PricingSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ExitIntentPopup from '@/components/modals/ExitIntentPopup'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AppSection />
      <FleetSection />
      <PricingSection />
      <TestimonialsSection />
      <ExitIntentPopup />
    </main>
  )
}
