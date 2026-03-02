"use client";
import About from "../Dashboard-v2/components/About";
import Academic from "./components/Acedemic";
import Work from "./components/Work";
import Tech from "./components/Tech";
import Project from "./components/Project";
import HappyClients from "./components/HappyClient";
import RoleDialog from "./components/Dialog";
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
  happyClient1Project1,
  happyClientProject2,
  happyClientProject3,
} from "@/lib/data";
import { useState } from "react";
import { Settings2 } from "lucide-react";

function DashboardV2Page() {
  // 1. Combine individual objects into a sorted array (Newest first)
  const educationData = [acedmic4, acedmic3, acedmic2, acedmic1];
  const workData = [work1, work2, work3, work4, work5];
  const techData = [tech1, tech2, tech3, tech4, tech5, tech6, tech7];
  const projectData = [project1, project2, project3, project4, project5];
  const happyClientData = [
    happyClient1Project1,
    happyClientProject2,
    happyClientProject3,
  ];

  const [role, setRole] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const [userName, setUserName] = useState<string>("");
  const handleDialogConfirm = (name: string) => {
    setUserName(name); // Store the name
    setIsDialogOpen(false); // Close the dialog
    console.log("Profile Setup:", { role, name });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      {/* WELCOME */}
      <RoleDialog
        selected={role}
        onSelect={setRole}
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        onConfirm={handleDialogConfirm}
      />
      <div className="fixed top-6 right-6 z-50 rounded-md border border-gray-800 bg-gray-700 px-4 py-2 shadow-lg">
        <p className="flex items-center gap-3 text-sm font-medium text-white">
          <Settings2 className="h-4 w-4" />
          <span>
            <span className="font-bold">Welcome {role}:</span>{" "}
            <span className="italic">{userName}</span>
          </span>
        </p>
      </div>

      {/* Profile/About Section */}
      <section>
        <About data={aboutData} />
      </section>

      <div className="my-12 border-b border-border/60 border-gray-500" />

      {/* Academic/Education Section */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-6 px-4 border-l-4 border-blue-500">
          Education
        </h2>

        <div className="flex flex-col">
          {educationData.map((item, index) => (
            <Academic key={index} acedmic={item} />
          ))}
        </div>
      </section>

      <div className="my-12 border-b border-border/60 border-gray-500" />

      {/* Work Section */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-6 px-4 border-l-4 border-blue-500">
          Work Experience
        </h2>

        <div className="flex flex-col">
          {workData.map((item, index) => (
            <Work key={index} work={item} />
          ))}
        </div>
      </section>

      <div className="my-12 border-b border-border/60 border-gray-500" />

      {/* Tech Stack Grid */}
      <section>
        <h2 className="text-xl font-bold mb-4">Technical Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {techData.map((item, index) => (
            <Tech key={index} tech={item} />
          ))}
        </div>
      </section>

      <div className="my-12 border-b border-border/60 border-gray-500" />

      <section>
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

      <div className="flex items-center justify-center w-full italic">
        <p className="text-sm text-gray-500">
          © 2026 Aaron Mercado. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default DashboardV2Page;
