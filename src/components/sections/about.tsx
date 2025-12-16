'use client';

import { TextAnimate } from '@/components/atoms/text-animate';
import { Card, CardContent } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';
import { Button } from '@/components/atoms/button';
import { Separator } from '@/components/atoms/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { ABOUT_DATA, CONTACT_DATA } from '@/constants';
import * as LucideIcons from 'lucide-react';
import * as SimpleIcons from 'react-icons/si';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion } from 'motion/react';

/**
 * Get icon component from lucide-react by name (for skills)
 */
const getLucideIcon = (iconName: string) => {
  const Icon = (LucideIcons as any)[iconName];
  return Icon ? Icon : LucideIcons.Circle;
};

/**
 * Get icon component from react-icons/si by name (for tech stack)
 */
const getSimpleIcon = (iconName: string) => {
  const Icon = (SimpleIcons as any)[iconName];
  return Icon ? Icon : SimpleIcons.SiReact;
};


/**
 * About section with clean UI, animated text, and icons
 */
export function AboutSection() {
  const isMobile = useIsMobile();

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="max-w-5xl w-full space-y-6">
        {/* Name and Title */}
        <div className="space-y-4">
          <TextAnimate
            animation="blurInUp"
            by="word"
            as="h1"
            className={`font-bold text-foreground ${
              isMobile ? 'text-4xl' : 'text-5xl md:text-6xl lg:text-7xl'
            }`}
            delay={0.1}
            duration={1.2}
            once
          >
            {ABOUT_DATA.name}
          </TextAnimate>

          <TextAnimate
            animation="blurInUp"
            by="word"
            as="p"
            className={`text-muted-foreground font-medium ${
              isMobile ? 'text-lg' : 'text-xl md:text-2xl'
            }`}
            delay={0.3}
            duration={1}
            once
          >
            {ABOUT_DATA.title}
          </TextAnimate>

          {/* Social Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              size={isMobile ? 'default' : 'lg'}
              className="border-2"
              asChild
            >
              <a href={CONTACT_DATA.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </a>
            </Button>
            <Button
              variant="outline"
              size={isMobile ? 'default' : 'lg'}
              className="border-2"
              asChild
            >
              <a href={CONTACT_DATA.github} target="_blank" rel="noopener noreferrer">
                <FaGithub className="w-5 h-5 mr-2" />
                GitHub
              </a>
            </Button>
          </div>
        </div>

        <Separator className="my-8" />


        {/* Description Card */}
        <Card className="border-2">
          <CardContent className="pt-6">
            <TextAnimate
              animation="blurInUp"
              by="word"
              as="p"
              className={`leading-relaxed text-foreground/90 ${
                isMobile ? 'text-base' : 'text-lg'
              }`}
              delay={0.5}
              duration={1.5}
              once
            >
              {ABOUT_DATA.description}
            </TextAnimate>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <div className="space-y-4">
          <TextAnimate
            animation="blurInUp"
            by="text"
            as="h3"
            className="text-sm font-semibold text-muted-foreground uppercase tracking-wider"
            delay={0.7}
            duration={0.5}
            once
          >
            Expertise
          </TextAnimate>
          <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-3 md:grid-cols-5'}`}>
            {ABOUT_DATA.skills.map((skill, index) => {
              const Icon = getLucideIcon(skill.icon);
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.8 + index * 0.1,
                    duration: 0.5,
                  }}
                >
                  <Badge
                    variant="secondary"
                    className="w-full px-3 py-2.5 text-xs font-medium border-2 border-border/60 flex items-center justify-center gap-2 hover:border-border transition-colors"
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{skill.name}</span>
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="space-y-4">
          <TextAnimate
            animation="blurInUp"
            by="text"
            as="h3"
            className="text-sm font-semibold text-muted-foreground uppercase tracking-wider"
            delay={1.3}
            duration={0.5}
            once
          >
            Tech Stack & Tools
          </TextAnimate>
          <div className="flex flex-wrap gap-2">
            {ABOUT_DATA.techStack.map((tech, index) => {
              const Icon = getSimpleIcon(tech.icon);
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 1.4 + index * 0.05,
                    duration: 0.4,
                  }}
                >
                  <Badge
                    variant="outline"
                    className="px-3 py-1.5 text-sm font-normal border-2 border-border/50 flex items-center gap-1.5 hover:border-border/80 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tech.name}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}




