import {
  CheckCircle2,
  MapPin,
  Calendar,
  Mail,
  FileText,
  ChevronRight,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LinkedInIcon } from "@/components/ui/linkedin";
import Link from "next/link";
// Define the shape of the data for full reusability
interface AboutProps {
  data: {
    name: string;
    avatar?: string;
    verified?: boolean;
    location: string;
    roles: string[];
    achievement?: string;
    bio: string[];
  };
}

export default function About({ data }: AboutProps) {
  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 font-sans bg-background text-foreground">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start w-full">
        <Avatar className="w-32 h-32 rounded-xl border border-border shadow-sm">
          <AvatarImage
            src={data.avatar}
            alt={data.name}
            className="object-cover"
          />
          <AvatarFallback className="rounded-xl text-2xl bg-secondary">
            {data.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-4 w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                {data.name}
                {data.verified && (
                  <CheckCircle2 className="w-5 h-5 fill-blue-500 text-white" />
                )}
              </h1>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium">
                <MapPin className="w-4 h-4" /> {data.location}
              </div>
              <p className="text-m font-medium text-foreground pt-1">
                {data.roles?.join(" | ")}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="border border-gray-200 bg-white dark:bg-zinc-100 dark:text-black hover:bg-gray-100 text-black rounded-lg px-6 shadow-sm"
            >
              <Link href="https://www.linkedin.com/in/aaron-mercado-163b02369/" target="_blank">
                LinkedIn
              </Link>
            </Button>

            <Button
              variant="outline"
              className="border border-gray-200 bg-white dark:bg-zinc-100 dark:text-black hover:bg-gray-100 text-black rounded-lg px-6 shadow-sm"
            >
              Github
            </Button>

            <Button
              variant="outline"
              className="border border-gray-200 bg-white dark:bg-zinc-100 dark:text-black hover:bg-gray-100 text-black rounded-lg px-6 shadow-sm"
            >
              Facebook
            </Button>
          </div>
        </div>
      </div>

      {/* Horizontal Divider */}
      <div className="my-12 border-b border-border/60 border-gray-500" />

      {/* About Section */}
      <section className="max-w-2xl space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">About</h2>
        <div className="space-y-5 text-muted-foreground leading-relaxed text-[1.05rem]">
          {data.bio?.map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
