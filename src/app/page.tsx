'use client';

import { useState } from 'react';
import { LoadingScreen } from '@/components/loading-screen';
import { NavigationDock } from '@/components/navigation-dock';
import { ScrollToTop } from '@/components/scroll-to-top';
import { AboutSection } from '@/components/sections/about';
import { ExperienceSection } from '@/components/sections/experience';
import { ProjectsSection } from '@/components/sections/projects';
import { EducationSection } from '@/components/sections/education';
import { ContactSection } from '@/components/sections/contact';

/**
 * Home page with loading screen and resume sections
 */
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="relative">
      <main className="scroll-smooth">
        <div className="space-y-0">
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <EducationSection />
          <ContactSection />
        </div>
      </main>

      <ScrollToTop />
      <NavigationDock />
    </div>
  );
}
