import { CheckCircle2, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import CatAndDogAnimation from "@/components/common/CatAndDogAnimation";
import RobotRocketAnimation from "@/components/common/RobotRocketAnimation";
import SpiderAnimation from "@/components/common/SpiderAnimation";
import StickmanCoffeeAnimation from "@/components/common/StickmanCoffeeAnimation";

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
    <div className="mb-2 font-sans text-foreground">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-6 lg:gap-10">
        <div className="hidden h-40 w-48 shrink-0 items-center justify-center md:flex md:justify-self-end lg:w-56">
          <RobotRocketAnimation />
        </div>

        <div className="flex w-full flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="relative shrink-0">
            <div className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2">
              <SpiderAnimation />
            </div>
            <Avatar className="h-32 w-32 shrink-0 rounded-xl border border-border shadow-sm">
              <AvatarImage
                src={data.avatar}
                alt={data.name}
                className="object-cover"
              />
              <AvatarFallback className="rounded-xl bg-secondary text-2xl">
                {data.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-1 flex-col space-y-4">
            <div className="space-y-1">
            <h1 className="flex gap-2 text-3xl font-bold tracking-tight">
              {data.name}
              {data.verified && (
                <CheckCircle2 className="h-5 w-5 fill-blue-500 text-white" />
              )}
            </h1>
            <div className="flex gap-1.5 text-sm font-medium text-muted-foreground">
              <MapPin className="h-4 w-4" /> {data.location}
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute bottom-full right-5 z-10 translate-y-2">
                <StickmanCoffeeAnimation />
              </div>
              <p className="text-m font-medium text-foreground">
                {data.roles?.join(" | ")}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="rounded-lg border border-gray-200 bg-white px-6 text-black shadow-sm hover:bg-gray-100 dark:bg-zinc-100 dark:text-black"
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
              className="rounded-lg border border-gray-200 bg-white px-6 text-black shadow-sm hover:bg-gray-100 dark:bg-zinc-100 dark:text-black"
            >
              <Link
                href="https://mail.google.com/mail/?view=cm&fs=1&to=aaron.dev2898@gmail.com"
                target="_blank"
              >
                <Mail className="h-4 w-4" />
                Email
              </Link>
            </Button>

            <Button
              variant="outline"
              className="rounded-lg border border-gray-200 bg-white px-6 text-black shadow-sm hover:bg-gray-100 dark:bg-zinc-100 dark:text-black"
            >
              <Link href="https://github.com/Gazzel16" target="_blank">
                Github
              </Link>
            </Button>
          </div>
          </div>
        </div>

        <div className="hidden h-40 w-48 shrink-0 items-center justify-center md:flex md:justify-self-start lg:w-56">
          <CatAndDogAnimation />
        </div>
      </div>

      <div className="flex justify-center gap-6 py-2 md:hidden">
        <RobotRocketAnimation compact />
        <CatAndDogAnimation compact />
      </div>
    </div>
  );
}
