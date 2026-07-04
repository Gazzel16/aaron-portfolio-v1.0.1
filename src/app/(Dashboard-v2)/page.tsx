"use client";
import About from "./components/About";
import Bio from "./components/Bio";
import Academic from "./components/Acedemic";
import Work from "./components/Work";
import Tech from "./components/Tech";
import ProjectList from "./components/ProjectList";
import Certificate from "./components/certificates";
// Import your data objects
import {
  aboutData,
  acedmic1,
  acedmic2,
  acedmic3,
  acedmic4,
  work1,
  work2,
  work3,
  work4,
  work5,
  work6,
  tech1,
  tech2,
  tech3,
  tech4,
  tech5,
  tech6,
  tech7,
  project1,
  project2,
  project3,
  project4,
  project5,
  project6,
  project7,
  project8,
  project9,
  happyClient1Project1,
  happyClientProject2,
  happyClientProject3,
  certificate1,
  certificate2,
  certificate3,
  certificate4,
  certificate5,
  work7,
} from "@/lib/data";
import { useState } from "react";
import Link from "next/link";
import FloatingNav from "./components/FloatingNav";
import GlassGradientBackground from "@/components/common/GlassGradientBackground";

function DashboardV2Page() {
  const isFeatured = (item: object) =>
    "isFeatured" in item &&
    (item as { isFeatured?: boolean }).isFeatured === true;

  const educationData = [acedmic4, acedmic3, acedmic2, acedmic1].filter(
    isFeatured,
  );
  const workData = [work1, work2, work3, work4, work5, work6, work7].filter(
    isFeatured,
  );
  const techData = [tech1, tech2, tech3, tech4, tech5, tech6, tech7].filter(
    isFeatured,
  );
  const projectData = [
    project9,
    project8,
    project7,
    project6,
    project1,
    project2,
    project3,
    project4,
    project5,
  ].filter(isFeatured);
  const happyClientData = [
    happyClient1Project1,
    happyClientProject2,
    happyClientProject3,
  ];
  const certificateData = [
    certificate1,
    certificate2,
    certificate3,
    certificate4,
    certificate5,
  ].filter(isFeatured);

  const [role, setRole] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const [userName, setUserName] = useState<string>("");
  const handleDialogConfirm = (name: string) => {
    setUserName(name); // Store the name
    setIsDialogOpen(false); // Close the dialog
    console.log("Profile Setup:", { role, name });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* <FloatingNav /> */}

    

      <div>
        {/* Profile/About Section */}
        <section id="about">
          <About data={aboutData} />
        </section>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          <div id="div1">

          <section
            id="motto"
            className="relative mb-2 overflow-hidden rounded-lg"
          >
            <GlassGradientBackground variant="dark" />

            <div className="relative z-10 flex min-h-36 flex-col justify-center rounded-lg border border-white/10 bg-zinc-950/40 px-5 py-6 shadow-lg backdrop-blur-xl ring-1 ring-white/5">
              <div className="mb-4 flex w-full min-w-[20rem] items-center justify-between gap-4">
                <h2 className="font-mono text-sm lowercase text-zinc-400">
                  00 — my motto
                </h2>
              </div>

              <blockquote className="border-l-2 border-white/10 py-1 pl-5">
                <p className="text-base italic leading-relaxed text-zinc-300">
                  &ldquo;The only way to do great work is to love what you do.&rdquo;
                </p>
                <footer className="mt-3 font-mono text-xs uppercase tracking-wide text-zinc-400">
                  — Steve Jobs
                </footer>
              </blockquote>
            </div>
          </section>

            <section
              id="bio"
              className="h-full rounded-lg border border-border/60 border-gray-200 p-4"
            >
              <div className="mb-6 flex w-full min-w-[20rem] items-center justify-between gap-4">
                <h2 className="font-mono text-sm lowercase text-zinc-400">
                  01 — about
                </h2>
              </div>

              <Bio paragraphs={aboutData.bio} />
            </section>

            <section
              id="projects"
              className="rounded-lg border border-border/60 border-gray-200 p-4 mt-2"
            >
              
              
              <div className="mb-6 flex w-full min-w-[20rem] items-center justify-between gap-4">
                <h2 className="font-mono text-sm lowercase text-zinc-400">
                  05 — projects
                </h2>
                <Link
                  href="/project"
                  className="font-mono text-sm uppercase tracking-wide text-zinc-400 transition-colors hover:text-zinc-600"
                >
                  view all →
                </Link>
              </div>

              {/* <h4 className="mb-4 text-sm italic text-gray-500">
          While I contributed to several key initiatives during my internship, I
          have excluded specific project descriptions due to confidentiality
          requirements. I am, however, happy to discuss the general scope of my
          responsibilities and the technical skills I applied.
        </h4> */}
              <div className="mt-4 items-stretch">
                <ProjectList items={projectData} />
              </div>
            </section>
          </div>

          <div id="div2" className="flex flex-col gap-6">
            {/* Academic/Education Section */}
            <section
              id="education"
              className="rounded-lg border border-border/60 border-gray-200 p-4"
            >
              <div className="mb-6 flex w-full min-w-[20rem] items-center justify-between gap-4">
                <h2 className="font-mono text-sm lowercase text-zinc-400">
                  02 — education
                </h2>
                <Link
                  href="/academic"
                  className="font-mono text-sm uppercase tracking-wide text-zinc-400 transition-colors hover:text-zinc-600"
                >
                  view all →
                </Link>
              </div>

              <div className="flex flex-col">
                {educationData.map((item, index) => (
                  <Academic key={index} acedmic={item} />
                ))}
              </div>
            </section>

            {/* Work Section */}
            <section id="work" className="relative overflow-hidden rounded-lg">
              <GlassGradientBackground variant="dark" />

              <div className="relative z-10 rounded-lg border border-white/10 bg-zinc-950/40 p-4 shadow-lg backdrop-blur-xl ring-1 ring-white/5">
                <div className="mb-6 flex w-full min-w-[20rem] items-center justify-between gap-4">
                  <h2 className="font-mono text-sm lowercase text-zinc-400">
                    03 — experience
                  </h2>
                  <Link
                    href="/experience"
                    className="font-mono text-sm uppercase tracking-wide text-zinc-400 transition-colors hover:text-zinc-200"
                  >
                    view all →
                  </Link>
                </div>

                <div className="flex flex-col">
                  {workData.map((item, index) => (
                    <Work key={index} work={item} variant="dark" />
                  ))}
                </div>
              </div>
            </section>

            {/* Tech Stack */}
            <section
              id="stacks"
              className="rounded-lg border border-border/60 border-gray-200 p-4"
            >
              <div className="mb-6 flex w-full min-w-[20rem] items-center justify-between gap-4">
                <h2 className="font-mono text-sm lowercase text-zinc-400">
                  04 — stacks
                </h2>
                <Link
                  href="/stacks"
                  className="font-mono text-sm uppercase tracking-wide text-zinc-400 transition-colors hover:text-zinc-600"
                >
                  view all →
                </Link>
              </div>

              <div className="flex flex-col gap-6">
                {techData.map((item, index) => (
                  <Tech key={index} tech={item} />
                ))}
              </div>
            </section>

            <section
              id="certs"
              className="rounded-lg border border-border/60 border-gray-200 p-4"
            >
              <div className="mb-6 flex w-full min-w-[20rem] items-center justify-between gap-4">
                <h2 className="font-mono text-sm lowercase text-zinc-400">
                  06 — certificates
                </h2>
                <Link
                  href="/certificate"
                  className="font-mono text-sm uppercase tracking-wide text-zinc-400 transition-colors hover:text-zinc-600"
                >
                  view all →
                </Link>
              </div>
              <div className="mt-4 items-stretch">
                {certificateData.map((item, index) => (
                  <Certificate key={index} cert={item} />
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>

      <div className="my-12 border-b border-border/60 border-gray-200" />

      <div className="flex items-center justify-center w-full italic">
        <p className="text-sm text-gray-500">
          © 2026 Aaron Mercado. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default DashboardV2Page;
