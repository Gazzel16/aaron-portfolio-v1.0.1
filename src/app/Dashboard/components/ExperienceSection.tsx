"use client";

import { Box, Typography } from "@mui/material";
import ExperienceCard from "@/app/components/ExperienceCard";

interface ExperienceSectionProps {}

export default function ExperienceSection({}: ExperienceSectionProps) {
  return (
    <Box
      sx={{

        width: "100%",
        display: "flex",
        gap: 2,
        justifyContent: "center",
        flexWrap: "wrap", // makes it responsive
      }}
    >
      {/* Education Box */}
      <Box
        sx={{
          
          margin: 2,
          borderRadius: 2,
          bgcolor: "#2c3e4c",
          border: "2px solid #2c3e4c",
          p: 2,
        }}
      >
        <Typography
          sx={{
            
            color: "#ffffff",
            fontSize: "1.5rem",
            mb: 1,
            borderBottom: "3px solid #facc15",
          }}
        >
          Education
        </Typography>

        <ExperienceCard
          title="Highschool"
          description="Mary Mother of God Parochial School | 2016-2019"
        />
        <ExperienceCard
          title="Senior Highschool"
          subtitle="Information Computer Technology"
          description="Muntinlupa National Highschool | 2020-2022"
        />
        <ExperienceCard
          title="College"
          subtitle="Bachelor of Science Information Technology"
          description="Pamantasan ng Lungsod ng Muntinlupa | 2022-2026"
        />
      </Box>

      {/* Work Experience Box */}
      <Box
        sx={{
          margin: 2,
          borderRadius: 2,
          bgcolor: "#2c3e4c",
          border: "2px solid #2c3e4c",
          p: 2,
        }}
      >
        <Typography
          sx={{
            color: "#ffffff",
            fontSize: "1.5rem",
            mb: 1,
            borderBottom: "3px solid #facc15",
          }}
        >
          Work Experience
        </Typography>

        <ExperienceCard
          title="Service Crew"
          subtitle="Mcdonalds"
          description="August 2024 - March 2025"
        />
        <ExperienceCard
          title="Fullstack Android Developer"
          subtitle="Freelance | Remote"
          description="October 2024 – November 2025"
        />
        <ExperienceCard
          title="Android Developer"
          subtitle="Certicode | Intern | Remote"
          description="September 2025 – December 2025"
        />
        <ExperienceCard
          title="Fullstack Web Developer"
          subtitle="Fetti | Intern | Remote"
          description="October 2025 – December 2025"
        />
        <ExperienceCard
          title="Fullstack Web Developer"
          subtitle="FMC Research Solution Inc. | Intern | Onsite"
          description="December 2025 (Current)"
        />
      </Box>
    </Box>
  );
}
