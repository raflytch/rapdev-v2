'use client';

import { TextAnimate } from '@/components/atoms/text-animate';
import { Card, CardContent } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';
import { Button } from '@/components/atoms/button';
import { Separator } from '@/components/atoms/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/atoms/tooltip';
import { PointerHighlight } from '@/components/ui/pointer-highlight';
import { useIsMobile } from '@/hooks/use-mobile';
import { ABOUT_DATA, CONTACT_DATA } from '@/constants';
import { FileText } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import * as SimpleIcons from 'react-icons/si';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion } from 'motion/react';
import { useMemo } from 'react';

type IconComponent = React.ComponentType<{ className?: string }>;

const getLucideIcon = (iconName: string): IconComponent => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[iconName];
  return Icon ?? LucideIcons.Circle;
};

const getSimpleIcon = (iconName: string): IconComponent => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (SimpleIcons as any)[iconName];
  return Icon ?? SimpleIcons.SiReact;
};

const animationConfig = {
  initial: { opacity: 0, filter: 'blur(10px)', y: 20 },
  whileInView: { opacity: 1, filter: 'blur(0px)', y: 0 },
  viewport: { once: true },
};

interface SkillBadgeProps {
  skill: { name: string; icon: string };
  index: number;
}

function SkillBadge({ skill, index }: SkillBadgeProps) {
  const Icon = useMemo(() => getLucideIcon(skill.icon), [skill.icon]);

  return (
    <motion.div
      {...animationConfig}
      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
    >
      <Badge
        variant="secondary"
        className="w-full px-3 py-2.5 text-xs font-medium border-2 border-border/60 flex items-center justify-center gap-2 hover:border-primary/50 transition-colors duration-300 cursor-default"
      >
        <Icon className="w-4 h-4 shrink-0" />
        <span className="truncate">{skill.name}</span>
      </Badge>
    </motion.div>
  );
}

interface TechBadgeProps {
  tech: { name: string; icon: string };
  index: number;
}

function TechBadge({ tech, index }: TechBadgeProps) {
  const Icon = useMemo(() => getSimpleIcon(tech.icon), [tech.icon]);

  return (
    <motion.div
      {...animationConfig}
      transition={{ delay: 1.4 + index * 0.05, duration: 0.4 }}
    >
      <Badge
        variant="outline"
        className="px-3 py-1.5 text-sm font-normal border-2 border-border/50 flex items-center gap-1.5 hover:border-primary/50 transition-colors duration-300 cursor-default"
      >
        <Icon className="w-3.5 h-3.5" />
        {tech.name}
      </Badge>
    </motion.div>
  );
}

interface SocialButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  tooltip: string;
  size: 'default' | 'lg';
}

function SocialButton({ href, icon, label, tooltip, size }: SocialButtonProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size={size}
            className="border-2 hover:border-primary/50 transition-colors duration-300"
            asChild
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              {icon}
              {label}
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function AboutSection() {
  const isMobile = useIsMobile();

  const buttonSize = isMobile ? 'default' : 'lg';
  const headingClass = isMobile
    ? 'text-4xl'
    : 'text-5xl md:text-6xl lg:text-7xl';
  const subtitleClass = isMobile ? 'text-lg' : 'text-xl md:text-2xl';
  const descriptionClass = isMobile ? 'text-base' : 'text-lg';
  const gridClass = isMobile ? 'grid-cols-2' : 'grid-cols-3 md:grid-cols-5';

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="max-w-5xl w-full space-y-6">
        <div className="space-y-4">
          <PointerHighlight
            containerClassName="w-fit"
            pointerClassName="text-blue-500"
          >
            <TextAnimate
              animation="blurInUp"
              by="word"
              as="h1"
              className={`font-bold text-foreground ${headingClass}`}
              delay={0.1}
              duration={1.2}
              once
            >
              {ABOUT_DATA.name}
            </TextAnimate>
          </PointerHighlight>

          <TextAnimate
            animation="blurInUp"
            by="word"
            as="p"
            className={`text-muted-foreground font-medium ${subtitleClass}`}
            delay={0.3}
            duration={1}
            once
          >
            {ABOUT_DATA.title}
          </TextAnimate>

          <motion.div
            className="flex flex-wrap gap-3 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <SocialButton
              href={CONTACT_DATA.linkedin}
              icon={<FaLinkedin className="w-5 h-5 mr-2" />}
              label="LinkedIn"
              tooltip="Connect on LinkedIn"
              size={buttonSize}
            />

            <SocialButton
              href={CONTACT_DATA.github}
              icon={<FaGithub className="w-5 h-5 mr-2" />}
              label="GitHub"
              tooltip="View GitHub Projects"
              size={buttonSize}
            />

            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="default"
                    size={buttonSize}
                    className="border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
                    asChild
                  >
                    <a
                      href={CONTACT_DATA.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View CV"
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      See my CV
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View my Curriculum Vitae</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        </div>

        <Separator className="my-8" />

        <Card className="border-2 hover:border-border/80 transition-colors duration-300">
          <CardContent className="pt-6">
            <TextAnimate
              animation="blurInUp"
              by="word"
              as="p"
              className={`leading-relaxed text-foreground/90 ${descriptionClass}`}
              delay={0.5}
              duration={1.5}
              once
            >
              {ABOUT_DATA.description}
            </TextAnimate>
          </CardContent>
        </Card>

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
          <div className={`grid gap-3 ${gridClass}`}>
            {ABOUT_DATA.skills.map((skill, index) => (
              <SkillBadge key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>

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
            {ABOUT_DATA.techStack.map((tech, index) => (
              <TechBadge key={tech.name} tech={tech} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
