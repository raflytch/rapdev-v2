'use client';

import { useProjects } from '@/services/queries/project.queries';
import { Card, CardContent } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';
import { Skeleton } from '@/components/atoms/skeleton';
import { Button } from '@/components/atoms/button';
import { ExternalLink, Github } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';

/**
 * Projects section skeleton loader
 */
function ProjectsSkeleton({ isMobile }: { isMobile: boolean }) {
  return (
    <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="border-2">
          <div className="p-4">
            <Skeleton className="w-full h-48 rounded-lg" />
          </div>
          <CardContent className="p-6 pt-0 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/**
 * Projects section component with API data
 */
export function ProjectsSection() {
  const { data, isLoading, isError } = useProjects(1, 10);
  const isMobile = useIsMobile();

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl w-full space-y-8">
        <div className="space-y-2">
          <h2 className={`font-bold text-foreground ${isMobile ? 'text-3xl' : 'text-3xl md:text-4xl'}`}>
            Projects
          </h2>
          <p className="text-muted-foreground">Showcase of my work and side projects</p>
        </div>

        {isLoading && <ProjectsSkeleton isMobile={isMobile} />}

        {isError && (
          <Card className="border-2 border-destructive/50">
            <CardContent className="p-6 text-center text-destructive">
              Failed to load projects. Please try again later.
            </CardContent>
          </Card>
        )}

        {data && (
          <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
            {data.data.map((project) => (
              <Card 
                key={project.id} 
                className="border-2 hover:border-primary/50 transition-colors overflow-hidden flex flex-col"
              >
                {/* Project Image with Padding */}
                <div className="p-4 pb-0">
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-border/50">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <CardContent className="p-6 flex flex-col flex-1">
                  {/* Title & Subtitle */}
                  <div>
                    <h3 className={`font-semibold text-foreground ${isMobile ? 'text-lg' : 'text-xl'}`}>
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{project.subtitle}</p>
                  </div>

                  {/* Description - Fixed height */}
                  <p className={`text-foreground/90 line-clamp-3 mt-4 ${isMobile ? 'text-sm' : 'text-sm'}`}>
                    {project.description}
                  </p>

                  {/* Tags - Fixed height area */}
                  <div className="flex flex-wrap gap-1.5 mt-4 min-h-[60px]">
                    {project.tags.slice(0, isMobile ? 4 : 6).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border h-fit">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > (isMobile ? 4 : 6) && (
                      <Badge variant="outline" className="text-xs border h-fit">
                        +{project.tags.length - (isMobile ? 4 : 6)}
                      </Badge>
                    )}
                  </div>

                  {/* Actions - Always at bottom */}
                  <div className="flex gap-2 mt-auto pt-4">
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      asChild
                    >
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-2"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
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

