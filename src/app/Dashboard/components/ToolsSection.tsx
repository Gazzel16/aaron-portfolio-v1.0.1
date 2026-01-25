"use client";

import { Box } from "@mui/material";
import { ToolsItem } from "@/app/components/ToolsCard"; // make sure the path is correct

// Your tools data
const toolsData = [
  {
    technology: "Android Development",
    logo: "/images/android-logo.png",
    tools: ["Java", "Kotlin", "XML"],
  },
  {
    technology: "Web Development",
    logo: "/images/web-dev-logo.png",
    tools: ["HTML", "CSS","React", "NextJS","Tailwind", "Material UI", "JavaScript", "TypeScript"],
  },
  {
    technology: "Backend Development",
    logo: "/images/backend-dev-logo.png",
    tools: ["Firebase", "Node.js (Express)", "Python (FastAPI)", "PHP (Laravel)"],
  },
  {
    technology: "Databases Development",
    logo: "/images/database-dev-logo.png",
    tools: ["PostgreSQL", "MySQL", "Firebase RTDB", "Room Database"],
  },
  {
    technology: "Hardware / IoT Development",
    logo: "/images/hardware-dev-logo.png",
    tools: [
        "ESP32",
        "DHT22 Temp & Humid Sensor",
        "MQ2 Smoke Sensor",
        "KYS026 Flame Sensor",
        "HW-038 Water Level",
        "Water pump motor",
        "Resistor"
        ],
  },
  {
    technology: "API Management & Collaboration Tools",
    logo: "/images/documentation.png",
    tools: ["Swagger", "Postman", "Git", "GitHub", "BitBucket"],
  },
  {
    technology: "Development Tools & Other tools",
    logo: "/images/dev-tools-logo.png",
    tools: ["Android Studio","Visual Studio","Arduino IDE","DBeaver","DBgine","Docker","Fork"],
  },
];

export default function ToolsSection() {
  return (
   <Box
  sx={{
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" }, // 3 columns on md+
    gap: 3,   // spacing between items
    mt: 4,
    
    px: 2,
    justifyContent: "center",
  }}
    >
      {toolsData.map((item, index) => (
        <ToolsItem
          key={index}
          technology={item.technology}
          logo={item.logo}
          tools={item.tools}
        />
      ))}
    </Box>
  );
}
