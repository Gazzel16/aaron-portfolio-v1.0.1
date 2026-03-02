"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Play } from "lucide-react";

interface ProjectProps {
  proj: {
    title?: string;
    status?: string;
    image?: string[];
    video?: string | string[];
    description?: string;
    stacks?: string[];
  };
}

export default function Project({ proj }: ProjectProps) {
  const { title, status, description, stacks, image = [], video = [] } = proj;

  const videoArray = Array.isArray(video) ? video : [video].filter(Boolean);
  const allMedia = [
    ...videoArray.map((src) => ({ type: "video", src })),
    ...image.map((src) => ({ type: "image", src })),
  ];

  return (
    // group h-full ensures the wrapper container takes up the grid space
    <div className="group relative h-full flex flex-col">
    
      {/* Card h-full + flex-col ensures internal elements can be positioned relatively */}
      <Card className="flex flex-col h-full border-gray-200 shadow-none bg-transparent hover:bg-zinc-50 transition-all duration-300 rounded-xl overflow-visible">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
              {title}
            </CardTitle>
            {status && (
              <Badge
                variant="secondary"
                className="text-[10px] font-medium uppercase tracking-tighter bg-zinc-100 text-zinc-600"
              >
                {status}
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-0 flex flex-col flex-1 gap-4">
          {allMedia.length > 0 && (
            <div className="relative w-full px-0 py-2">
              <Dialog>
                <Carousel
                  opts={{ align: "start", loop: true }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-1">
                    {allMedia.map((media, index) => (
                      <CarouselItem key={index} className="pl-1">
                        <DialogTrigger asChild>
                          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 cursor-zoom-in transition-transform active:scale-95">
                            {media.type === "video" ? (
                              <>
                                <video
                                  src={media.src as string}
                                  className="h-full w-full object-cover"
                                  muted
                                  playsInline
                                  autoPlay
                                  loop
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                  <Play className="w-8 h-8 text-white opacity-70" />
                                </div>
                              </>
                            ) : (
                              <img
                                src={media.src as string}
                                alt={`${title} - ${index}`}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                        </DialogTrigger>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {allMedia.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 h-9 w-9 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity border-none shadow-md" />
                      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 h-9 w-9 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity border-none shadow-md" />
                    </>
                  )}
                </Carousel>

                <DialogContent className="max-w-[90vw] md:max-w-4xl border-none bg-transparent p-0 shadow-none">
                  <DialogHeader className="sr-only">
                    <DialogTitle>{title} Media Gallery</DialogTitle>
                  </DialogHeader>
                  <Carousel
                    opts={{ align: "start", loop: true }}
                    className="w-full"
                  >
                    <CarouselContent>
                      {allMedia.map((media, index) => (
                        <CarouselItem
                          key={index}
                          className="flex items-center justify-center"
                        >
                          {media.type === "video" ? (
                            <video
                              src={media.src as string}
                              controls
                              className="max-h-[85vh] w-auto rounded-lg shadow-2xl"
                            />
                          ) : (
                            <img
                              src={media.src as string}
                              alt={title}
                              className="max-h-[85vh] w-auto object-contain rounded-lg shadow-2xl"
                            />
                          )}
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {allMedia.length > 1 && (
                      <>
                        <CarouselPrevious className="hidden md:flex -left-12 h-12 w-12 bg-white/20 text-white hover:bg-white/40 border-none" />
                        <CarouselNext className="hidden md:flex -right-12 h-12 w-12 bg-white/20 text-white hover:bg-white/40 border-none" />
                      </>
                    )}
                  </Carousel>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {/* flex-1 here is the secret: it eats up all available space, pushing the badges down */}
          <div className="flex-1">
            {description && (
              <p className="text-[13px] text-zinc-600 leading-relaxed font-normal">
                {description}
              </p>
            )}
            <div className="flex flex-wrap gap-2 pt-2">
              {" "}
              {/* Added pt-2 for top padding and gap-2 */}
              {stacks?.map((tech, index) => (
                <span
                  key={index}
                  className="text-[11px] font-medium text-blue-500 bg-blue-200 px-2 py-1 rounded-md uppercase" // Increased py to 1
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
