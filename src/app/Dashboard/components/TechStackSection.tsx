"use client";

import { Box, Typography } from "@mui/material";
import ExperienceCard from "@/app/components/ExperienceCard";

interface CompanyTechStackProps {}

export default function CompanyTechStack({}: CompanyTechStackProps) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, // 2 columns on small+ screens
        gap: 2, // spacing between items
        justifyContent: "center",
        mt: 4,
      }}
    >
      {/* Work Experience Cards */}
      <Box
        sx={{
          borderRadius: 2,
          bgcolor: "#2c3e4c",
          border: "2px solid #2c3e4c",
          p: 2,
          display: "grid",
          gap: 2, // spacing between ExperienceCards inside
        }}
      >
        <ExperienceCard
          title="Android Developer"
          subtitle="Certicode | Intern | Remote"
          description="September 2025 – December 2025"
          tools={["Java", "Kotlin", "XML", "Git", "Github"]}
        />
      </Box>

      <Box
        sx={{
          borderRadius: 2,
          bgcolor: "#2c3e4c",
          border: "2px solid #2c3e4c",
          p: 2,
          display: "grid",
          gap: 2, // spacing between ExperienceCards inside
        }}
      >
        <ExperienceCard
          title="Fullstack Android Developer"
          subtitle="Freelance | Remote"
          description="October 2024 – November 2025"
          tools={[
            "Java",
            "Kotlin",
            "XML",
            "Python FASTAPI",
            "Firebase RTDB",
            "MYSQL",
            "Git",
            "Github",
          ]}
        />
      </Box>

      <Box
        sx={{
          borderRadius: 2,
          bgcolor: "#2c3e4c",
          border: "2px solid #2c3e4c",
          p: 2,
          display: "grid",
          gap: 2, // spacing between ExperienceCards inside
        }}
      >
        <ExperienceCard
          title="Fullstack Web Developer"
          subtitle="Fetti | Intern | Remote"
          description="October 2025 – December 2025"
          tools={[
            "TypeScript",
            "Tailwind",
            "NextJS",
            "EpxressJS",
            "NodeJS",
            "Prisma",
            "PG Admin",
            "Git",
            "Github",
          ]}
        />
      </Box>

      
      <Box
        sx={{
          borderRadius: 2,
          bgcolor: "#2c3e4c",
          border: "2px solid #2c3e4c",
          p: 2,
          display: "grid",
          gap: 2, // spacing between ExperienceCards inside
        }}
      >
        <ExperienceCard
          title="Fullstack Web Developer"
          subtitle="FMC Research Solution Inc. | Intern | Onsite"
          description="December 2025 (Current)"
          tools={[
            "TypeScript",
            "Material UI",
            "NextJS",
            "PHP Laravel",
            "dbgine",
            "Docker",
            "MYSQL",
            "Fork",
            "BitBucket",
            "DBeaver"
          ]}
        />
      </Box>
    </Box>
  );
}
