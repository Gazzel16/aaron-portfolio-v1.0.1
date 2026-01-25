"use client";

import { Box, Container, Typography } from "@mui/material";
import ProfileSection from "@/app/components/ProfileSection";
import ExperienceSection from "./components/ExperienceSection";
import ToolsSection from "./components/ToolsSection";
import ProjectsSection from "./components/ProjectsSections";
import CompanyTechStack from "./components/TechStackSection";

export default function DashboardPage() {
  return (
    <Box sx={{ bgcolor: "#203354", width: "100%", py: 6 }}>
      {/* Use Container for content alignment */}
      <Container>
        {/* Profile Section */}
        <ProfileSection
          avatarUrl="/images/avatar.png"
          name="Aaron Mercado"
          description="Aspiring Software Engineer with experience in Android/Mobile,
Backend, Web, and IoT development. Strong in programming,
API integration, and cloud-based systems, seeking to apply fullstack and mobile skills in impactful software roles."
        />

        {/* Other content */}
        <Box sx={{  justifyContent: "center" }}>
          <Box sx={{textAlign: "center"}} >
            <Typography
              sx={{
                justifyContent: "center",
                display: "inline-block",  
                fontSize: "1.5rem",
                color: "#ffff",
                borderBottom: "1px solid #facc15"
              }}
            >
              Work & Education
            </Typography>
          </Box>
          <ExperienceSection />

          <Box sx={{textAlign: "center"}}>
            <Typography
              sx={{
                
                justifyContent: "center",
                display: "inline-block",   
                fontSize: "1.5rem",
                color: "#ffff",
                mt: 5,
                borderBottom: "1px solid #facc15"
              }}
            >
              Technologies Applied in Work Experience
            </Typography>
          </Box>
          <CompanyTechStack/>

          <Box sx={{textAlign: "center"}}>
            <Typography
              sx={{
                
                justifyContent: "center",
                display: "inline-block",   
                fontSize: "1.5rem",
                color: "#ffff",
                mt: 5,
                borderBottom: "1px solid #facc15"
              }}
            >
              Languages & Tools
            </Typography>
            <ToolsSection />
          </Box>

   <Box sx={{ textAlign: "center", mt: 5 }}>
  <Typography
    variant="h4"
    component="h2"
    sx={{color: "#ffffff"}}
  >
    Projects
  </Typography>
  <Typography
    variant="body1"
    sx={{
      mt: 2,
      color: "#cccccc",
      maxWidth: "600px",
      margin: "0 auto",
            display: "inline-block",
      borderBottom: "3px solid #facc15",
      pb: 1,
    }}
  >
    Internship projects are not listed here due to NDA constraints.
  </Typography>
</Box>

           <ProjectsSection />
        </Box>
      </Container>
    </Box>
  );
}
