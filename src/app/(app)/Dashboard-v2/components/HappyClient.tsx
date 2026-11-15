"use client"

import React, { useCallback, useState } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

interface HappyClientsProps {
  hc: {
    image?: string[]
    description?: string
  }
}

export default function HappyClients({ hc }: HappyClientsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  // Sync index when sliding
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrentIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return
    emblaApi.on("select", onSelect)
  }, [emblaApi, onSelect])

  const openDialog = (index: number) => {
    setCurrentIndex(index)
    emblaApi?.scrollTo(index)
    setIsDialogOpen(true)
  }

  if (!hc?.image?.length) return null

  return (
    <section className="w-full">
      <div className="max-w-xl mx-auto px-4">
        
        <div className="relative group">
          {/* Main Carousel */}
          <div className="overflow-hidden rounded-2xl border bg-white shadow-sm" ref={emblaRef}>
            <div className="flex">
              {hc.image.map((src, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0">
                  <div 
                    onClick={() => openDialog(index)}
                    className="relative h-[150px] w-full bg-slate-50 cursor-zoom-in group/img"
                  >
                    <Image
                      src={src}
                      alt="Client testimonial"
                      fill
                      className="object-contain p-4"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/img:opacity-100 transition flex items-center justify-center">
                       <ZoomIn className="bg-white p-2 rounded-full shadow-md" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <button onClick={scrollPrev} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md z-10">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={scrollNext} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md z-10">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Description Below */}
        {hc.description && (
          <p className="mt-4 text-center text-sm italic text-slate-500">{hc.description}</p>
        )}
      </div>

      {/* --- Fullscreen Dialog Carousel --- */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
          <button 
            onClick={() => setIsDialogOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-slate-300 z-[110]"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Dialog Prev */}
          <button 
            onClick={scrollPrev}
            className="absolute left-4 md:left-10 p-3 text-white hover:bg-white/10 rounded-full transition"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <div className="relative w-full max-w-4xl h-[80vh] flex items-center justify-center">
            <img 
              src={hc.image[currentIndex]} 
              className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
              alt="Zoomed view"
            />
          </div>

          {/* Dialog Next */}
          <button 
            onClick={scrollNext}
            className="absolute right-4 md:right-10 p-3 text-white hover:bg-white/10 rounded-full transition"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-10 text-white/60 font-mono">
            {currentIndex + 1} / {hc.image.length}
          </div>
        </div>
      )}
    </section>
  )
}