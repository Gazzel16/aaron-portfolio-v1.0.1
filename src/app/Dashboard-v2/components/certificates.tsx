"use client";
import { Award, Calendar, Search } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; 

interface CertificateProps {
  cert: {
    title: string;
    role: string;
    date: string;
    image?: string;
  };
}

export default function Certificate({ cert }: CertificateProps) {
  return (
    <div className="group relative rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:shadow-md hover:border-blue-500/50">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative h-24 w-full sm:w-32 shrink-0 overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50 shadow-sm cursor-zoom-in group/img">
              {cert.image ? (
                <>
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/img:scale-110"
                    sizes="128px"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                    <Search className="text-white h-6 w-6" />
                  </div>
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center text-blue-500 font-bold">
                  <Award className="h-10 w-10" />
                </div>
              )}
            </div>
          </DialogTrigger>
          
          <DialogContent className="max-w-3xl border-none bg-transparent p-0 shadow-none outline-none">
            {/* Accessibility: Header with hidden titles */}
            <DialogHeader className="sr-only">
              <DialogTitle>{cert.title}</DialogTitle>
              <DialogDescription>
                Certificate for {cert.role} issued on {cert.date}
              </DialogDescription>
            </DialogHeader>

            <div className="relative aspect-[1.414/1] w-full overflow-hidden rounded-lg">
               {cert.image && (
                 <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-contain"
                    quality={100}
                 />
               )}
            </div>
            
            <div className="bg-white/95 backdrop-blur-sm p-4 rounded-b-lg -mt-2">
                <h3 className="text-lg font-bold text-zinc-900">{cert.title}</h3>
                <p className="text-sm text-zinc-600">{cert.role}</p>
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">
              {cert.title}
            </h3>
            <p className="text-sm font-semibold text-blue-600/80 uppercase tracking-wider">
              {cert.role}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-center sm:justify-start gap-2 text-xs font-medium text-zinc-500">
            <Calendar className="h-3.5 w-3.5" />
            <span>{cert.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}