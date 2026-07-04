"use client";
import About from "./components/About";
import Bio from "./components/Bio";
import Academic from "./components/Acedemic";
import Work from "./components/Work";
import Tech from "./components/Tech";
import Project from "./components/Project";
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
  ];
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
  ];

  const [role, setRole] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const [userName, setUserName] = useState<string>("");
  const handleDialogConfirm = (name: string) => {
    setUserName(name); // Store the name
    setIsDialogOpen(false); // Close the dialog
    console.log("Profile Setup:", { role, name });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Adjust this based on your navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <FloatingNav />

      <div>
        {/* Profile/About Section */}
        <section id="about">
          <About data={aboutData} />
        </section>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          <div id="div1">
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
                  href="/education"
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
            <section
              id="work"
              className="rounded-lg border border-border/60 border-gray-200 p-4"
            >
              <div className="mb-6 flex w-full min-w-[20rem] items-center justify-between gap-4">
                <h2 className="font-mono text-sm lowercase text-zinc-400">
                  03 — experience
                </h2>
                <Link
                  href="/work"
                  className="font-mono text-sm uppercase tracking-wide text-zinc-400 transition-colors hover:text-zinc-600"
                >
                  view all →
                </Link>
              </div>

              <div className="flex flex-col">
                {workData.map((item, index) => (
                  <Work key={index} work={item} />
                ))}
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
          </div>
        </div>
    
      </div>

      <div className="my-12 border-b border-border/60 border-gray-500" />

      <section id="projects">
        <h2 className="text-xl font-bold">Recent Projects</h2>
        <h4 className="mb-4 text-sm italic text-gray-500">
          While I contributed to several key initiatives during my internship, I
          have excluded specific project descriptions due to confidentiality
          requirements. I am, however, happy to discuss the general scope of my
          responsibilities and the technical skills I applied.
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {projectData.map((item, index) => (
            <Project key={index} proj={item} />
          ))}
        </div>
      </section>

      {/* <div className="my-12 border-b border-border/60 border-gray-500" /> */}
      {/* 
      <section>
        <h2 className="text-xl font-bold mb-4">Clients</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {happyClientData.map((item, index) => (
            <HappyClients key={index} hc={item} />
          ))}
        </div>
      </section> */}
      <div className="my-12 border-b border-border/60 border-gray-500" />
      <section id="certs">
        <h2 className="text-xl font-bold text-zinc-900 mb-6 px-4 border-l-4 border-blue-500">
          Certificates
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {certificateData.map((item, index) => (
            <Certificate key={index} cert={item} />
          ))}
        </div>
      </section>

      <div className="my-12 border-b border-border/60 border-gray-500" />

      <div className="flex items-center justify-center w-full italic">
        <p className="text-sm text-gray-500">
          © 2026 Aaron Mercado. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default DashboardV2Page;
