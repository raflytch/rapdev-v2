'use client';

import { Dock, DockIcon } from '@/components/atoms/dock';
import { AnimatedThemeToggler } from '@/components/atoms/animated-theme-toggler';
import { User, Briefcase, GraduationCap, FolderGit2, Mail } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * Navigation dock component with menu items and theme toggler
 */
export function NavigationDock() {
  const isMobile = useIsMobile();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 pointer-events-none">
      <div className="pointer-events-auto">
        <Dock
          iconSize={isMobile ? 36 : 40}
          iconMagnification={isMobile ? 48 : 60}
          iconDistance={isMobile ? 100 : 140}
          className="bg-background/80 backdrop-blur-xl border-2 border-border/50"
        >
          <DockIcon onClick={() => scrollToSection('about')}>
            <User className="w-5 h-5" />
          </DockIcon>
          <DockIcon onClick={() => scrollToSection('experience')}>
            <Briefcase className="w-5 h-5" />
          </DockIcon>
          <DockIcon onClick={() => scrollToSection('projects')}>
            <FolderGit2 className="w-5 h-5" />
          </DockIcon>
          <DockIcon onClick={() => scrollToSection('education')}>
            <GraduationCap className="w-5 h-5" />
          </DockIcon>
          <DockIcon onClick={() => scrollToSection('contact')}>
            <Mail className="w-5 h-5" />
          </DockIcon>
          <DockIcon>
            <AnimatedThemeToggler className="w-5 h-5 bg-transparent border-0" />
          </DockIcon>
        </Dock>
      </div>
    </div>
  );
}
