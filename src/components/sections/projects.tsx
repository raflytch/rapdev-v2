'use client';

import { useState } from 'react';
import { useProjects, useProjectById } from '@/services/queries/project.queries';
import { Card, CardContent } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';
import { Skeleton } from '@/components/atoms/skeleton';
import { Button } from '@/components/atoms/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/atoms/dialog';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';
import { format } from 'date-fns';

/**
 * Projects section skeleton loader
 */
function ProjectsSkeleton({ isMobile }: { isMobile: boolean }) {
  return (
    <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'}`}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="border-2">
          <div className="p-3">
            <Skeleton className="w-full h-40 rounded-lg" />
          </div>
          <CardContent className="p-4 pt-0 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <div className="flex gap-1.5">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/**
 * Project detail modal skeleton
 */
function ProjectDetailSkeleton({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="space-y-4">
      <Skeleton className={`w-full rounded-lg ${isMobile ? 'h-48' : 'h-64'}`} />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  );
}

/**
 * Projects section component with API data and modal
 */
export function ProjectsSection() {
  const { data, isLoading, isError } = useProjects(1, 10);
  const isMobile = useIsMobile();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const { data: projectDetail, isLoading: isLoadingDetail } = useProjectById(selectedProjectId);

  const handleOpenProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const handleCloseProject = () => {
    setSelectedProjectId(null);
  };

  return (
    <>
      <section id="projects" className="min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl w-full space-y-6">
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
            <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'}`}>
              {data.data.map((project) => (
                <Card
                  key={project.id}
                  className="border-2 hover:border-primary/50 transition-colors overflow-hidden flex flex-col cursor-pointer group"
                  onClick={() => handleOpenProject(project.id)}
                >
                  {/* Project Image */}
                  <div className="p-3 pb-0">
                    <div className="relative w-full h-40 rounded-lg overflow-hidden border-2 border-border/50 group-hover:border-primary/30 transition-colors">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <CardContent className="p-4 flex flex-col flex-1">
                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="font-semibold text-foreground text-base line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{project.subtitle}</p>
                    </div>

                    {/* Description */}
                    <p className="text-foreground/90 line-clamp-2 mt-3 text-sm">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border h-fit px-2 py-0.5">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs border h-fit px-2 py-0.5">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProjectId} onOpenChange={(open) => !open && handleCloseProject()}>
        <DialogContent 
          className={`${isMobile ? 'max-w-[95vw] max-h-[90vh] p-3' : 'max-w-3xl max-h-[85vh] p-6'} overflow-y-auto`}
        >
          <DialogTitle className="sr-only">Project Details</DialogTitle>
          {isLoadingDetail ? (
            <ProjectDetailSkeleton isMobile={isMobile} />
          ) : projectDetail ? (
            <div className={isMobile ? 'space-y-3' : 'space-y-4'}>
              {/* Project Image */}
              <div className={`relative w-full rounded-lg overflow-hidden border-2 border-border ${isMobile ? 'h-44' : 'h-64'}`}>
                <Image
                  src={projectDetail.image}
                  alt={projectDetail.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Project Info */}
              <div className={isMobile ? 'space-y-3' : 'space-y-4'}>
                <div>
                  <h2 className={`font-bold text-foreground ${isMobile ? 'text-lg' : 'text-2xl'}`}>
                    {projectDetail.title}
                  </h2>
                  <p className={`text-muted-foreground mt-1 ${isMobile ? 'text-xs' : 'text-base'}`}>
                    {projectDetail.subtitle}
                  </p>
                  <div className={`flex items-center gap-2 text-muted-foreground mt-1.5 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                    <Calendar className={isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
                    <span>{format(new Date(projectDetail.createdAt), 'MMMM dd, yyyy')}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className={`font-semibold text-foreground mb-1.5 ${isMobile ? 'text-xs' : 'text-base'}`}>
                    About This Project
                  </h3>
                  <p className={`text-foreground/90 leading-relaxed ${isMobile ? 'text-xs' : 'text-base'}`}>
                    {projectDetail.description}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className={`font-semibold text-foreground mb-1.5 ${isMobile ? 'text-xs' : 'text-base'}`}>
                    Technologies Used
                  </h3>
                  <div className={`flex flex-wrap ${isMobile ? 'gap-1' : 'gap-1.5'}`}>
                    {projectDetail.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className={`border ${isMobile ? 'text-xs px-1.5 py-0.5' : 'text-xs px-2 py-1'}`}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={`flex flex-col gap-2 ${isMobile ? 'pt-1' : 'pt-2'}`}>
                  <Button
                    variant="default"
                    size={isMobile ? 'sm' : 'default'}
                    className="w-full"
                    asChild
                  >
                    <a href={projectDetail.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live Demo
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size={isMobile ? 'sm' : 'default'}
                    className="w-full border-2"
                    asChild
                  >
                    <a href={projectDetail.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Source Code
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
