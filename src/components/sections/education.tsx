'use client';

import { useEducation } from '@/services/queries/education.queries';
import { Card, CardContent } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';
import { Skeleton } from '@/components/atoms/skeleton';
import { PointerHighlight } from '@/components/ui/pointer-highlight';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';
import { format } from 'date-fns';

/**
 * Education section skeleton loader
 */
function EducationSkeleton({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="space-y-6">
      {[1, 2].map((i) => (
        <Card key={i} className="border-2">
          <CardContent className="p-6">
            <div className={`flex gap-4 ${isMobile ? 'flex-col' : 'flex-row'}`}>
              <Skeleton className="w-20 h-20 rounded-lg shrink-0" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/**
 * Education section component with API data
 */
export function EducationSection() {
  const { data, isLoading, isError } = useEducation(1, 10);
  const isMobile = useIsMobile();

  return (
    <section id="education" className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-5xl w-full space-y-6">
        <div className="space-y-2">
          <PointerHighlight
            containerClassName="w-fit"
            pointerClassName="text-green-500"
          >
            <h2 className={`font-bold text-foreground ${isMobile ? 'text-3xl' : 'text-3xl md:text-4xl'}`}>
              Education
            </h2>
          </PointerHighlight>
          <p className="text-muted-foreground">My academic background and achievements</p>
        </div>

        {isLoading && <EducationSkeleton isMobile={isMobile} />}

        {isError && (
          <Card className="border-2 border-destructive/50">
            <CardContent className="p-6 text-center text-destructive">
              Failed to load education. Please try again later.
            </CardContent>
          </Card>
        )}

        {data && (
          <div className="space-y-6">
            {data.data.map((edu) => (
              <Card key={edu.id} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className={isMobile ? 'p-4' : 'p-6'}>
                  <div className={`flex gap-6 ${isMobile ? 'flex-col' : 'flex-row'}`}>
                    {/* Institution Logo */}
                    <div className="shrink-0">
                      <div className="w-20 h-20 relative rounded-lg overflow-hidden border-2 border-border/50">
                        <Image
                          src={edu.logo}
                          alt={edu.institution}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      {/* Header */}
                      <div>
                        <h3 className={`font-semibold text-foreground ${isMobile ? 'text-lg' : 'text-xl'}`}>
                          {edu.degree}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                          <GraduationCap className="w-4 h-4" />
                          <span className={isMobile ? 'text-sm' : 'text-base'}>{edu.institution}</span>
                        </div>
                        <div className={`flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2 ${isMobile ? 'gap-2' : 'gap-4'}`}>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {format(new Date(edu.startDate), 'MMM yyyy')} -{' '}
                              {format(new Date(edu.endDate), 'MMM yyyy')}
                            </span>
                          </div>
                          <Badge variant="secondary" className="border">
                            GPA: {edu.gpa}
                          </Badge>
                        </div>
                      </div>

                      {/* Achievements */}
                      {edu.achievements.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <Award className="w-4 h-4 text-primary" />
                            <span>Achievements</span>
                          </div>
                          <ul className={`space-y-2 text-foreground/90 ${isMobile ? 'text-sm' : 'text-base'}`}>
                            {edu.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="text-primary mt-1.5">•</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
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
