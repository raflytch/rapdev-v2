'use client';

import { useExperiences } from '@/services/queries/experience.queries';
import { Card, CardContent } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';
import { Skeleton } from '@/components/atoms/skeleton';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';
import { format } from 'date-fns';

/**
 * Experience section skeleton loader
 */
function ExperienceSkeleton({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="border-2">
          <CardContent className="p-6">
            <div className={`flex gap-4 ${isMobile ? 'flex-col' : 'flex-row'}`}>
              <Skeleton className={`rounded-lg shrink-0 ${isMobile ? 'w-16 h-16' : 'w-16 h-16'}`} />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/**
 * Experience section component with API data
 */
export function ExperienceSection() {
  const { data, isLoading, isError } = useExperiences(1, 10);
  const isMobile = useIsMobile();

  return (
    <section id="experience" className="min-h-screen flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl w-full space-y-8">
        <div className="space-y-2">
          <h2 className={`font-bold text-foreground ${isMobile ? 'text-3xl' : 'text-3xl md:text-4xl'}`}>
            Experience
          </h2>
          <p className="text-muted-foreground">My professional journey and work history</p>
        </div>

        {isLoading && <ExperienceSkeleton isMobile={isMobile} />}

        {isError && (
          <Card className="border-2 border-destructive/50">
            <CardContent className="p-6 text-center text-destructive">
              Failed to load experiences. Please try again later.
            </CardContent>
          </Card>
        )}

        {data && (
          <div className="space-y-6">
            {data.data.map((exp) => (
              <Card key={exp.id} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className={isMobile ? 'p-4' : 'p-6'}>
                  <div className={`flex gap-4 ${isMobile ? 'flex-col' : 'flex-row'}`}>
                    {/* Company Logo */}
                    <div className="shrink-0">
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden border-2 border-border/50">
                        <Image
                          src={exp.logo}
                          alt={exp.company}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      {/* Header */}
                      <div>
                        <h3 className={`font-semibold text-foreground ${isMobile ? 'text-lg' : 'text-xl'}`}>
                          {exp.position}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                          <MapPin className="w-4 h-4" />
                          <span className={isMobile ? 'text-sm' : 'text-base'}>{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {format(new Date(exp.startDate), 'MMM yyyy')} -{' '}
                            {format(new Date(exp.endDate), 'MMM yyyy')}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <ul className={`space-y-2 text-foreground/90 ${isMobile ? 'text-sm' : 'text-base'}`}>
                        {exp.description.map((desc, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-primary mt-1.5">•</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs border">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

