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

  const handleEmailClick = () => {
    window.location.href = "mailto:aaron.dev2898@gmail.com";
  };

  return (
    <div className="font-sans text-foreground">
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
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
              <Link
                href="https://www.linkedin.com/in/aaron-mercado-163b02369/"
                target="_blank"
              >
                LinkedIn
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border border-gray-200 bg-white dark:bg-zinc-100 dark:text-black hover:bg-gray-100 text-black rounded-lg px-6 shadow-sm"
            >
              <Link
                href="https://mail.google.com/mail/?view=cm&fs=1&to=aaron.dev2898@gmail.com"
                target="_blank"
              >
                <Mail className="w-4 h-4" />
                Email
              </Link>
            </Button>

            <Button
              variant="outline"
              className="border border-gray-200 bg-white dark:bg-zinc-100 dark:text-black hover:bg-gray-100 text-black rounded-lg px-6 shadow-sm"
            >
              <Link href="https://github.com/Gazzel16" target="_blank">
                Github
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
