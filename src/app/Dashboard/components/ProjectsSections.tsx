import { ProjectCard } from "@/app/components/ProjectCard";
import { Box } from "@mui/material";

const cardData = [
  {
    title: "Smart Pig Management",
    status: "Personal Project",
    images: [
      "/images/SmartPig0.jpg",
      "/images/SmartPig1.png",
      "/images/SmartPig2.png",
      "/images/SmartPig3.png",
      "/images/SmartPig4.png",
      "/images/SmartPig5.png",
      "/images/SmartPig6.png",
    ],
    video: "/images/SmartPigVid2.mp4",
    description:
      "A mobile and IoT-based system that enables farmers to track individual pigs using QR codes. Integrated with ESP32, DHT22, and water level sensors, the system monitors temperature and humidity, provides real-time mobile notifications when thresholds are exceeded, and allows farmers to manually activate a water sprinkler through the mobile app. The platform also includes an in-app chatbot for support. Video available — click the card to view the demo.",
    tools: ["Kotlin", "XML", "Firebase", "Python (FastAPI)", "ESP32", "DHT22"],
  },
  {
    title: "MuntiRent: Finder",
    status: "Client's Project",
    images: [
      "/images/muntirent1.png",
      "/images/muntirent2.png",
      "/images/muntirent3.png",
      "/images/muntirent4.png",
      "/images/muntirent5.png",
      "/images/muntirent6.png",
      "/images/muntirent7.png",
    ],
    description:
      "Munti Rent: Finder is a mobile app platform that allows landlords to post their properties and tenants to easily rent them. The app features an AI-powered search engine and a chatbot to help users find suitable properties and answer questions instantly.",
    tools: [
      "Kotlin",
      "XML",
      "Python (Fast API)",
      "Gemini Ai",
      "Hugging Face",
      "FAISS",
      "NumPy",
      "MySQL",
    ],
  },
  {
    title: "Smart Fire Monitoring",
    status: "Client's Project",
    images: [
      "/images/SmartAiFireMonitoring1.png",
      "/images/SmartAiFireMonitoring10.png",
      "/images/SmartAiFireMonitoring11.png",
      "/images/SmartAiFireMonitoring2.png",
      "/images/SmartAiFireMonitoring3.png",
      "/images/SmartAiFireMonitoring4.png",
      "/images/SmartAiFireMonitoring5.png",
      "/images/SmartAiFireMonitoring6.png",
      "/images/SmartAiFireMonitoring7.png",
      "/images/SmartAiFireMonitoring8.png",
      "/images/SmartAiFireMonitoring9.png",
    ],
    description:
      "Smart AI-Based Fire Monitoring – A mobile app connected to IoT sensors that monitors fire, temperature, smoke, and humidity. It sends instant notifications via FCM when hazards are detected, triggers AI voice alerts, and includes a chatbot for user interaction.",
    tools: [
      "Java",
      "Python",
      "ESP32",
      "DHT22",
      "MQ2 Smoke Snesor",
      "KYS026 Flame Sensor",
      "Firebase",
      "Gemini Ai",
      "Eleven Labs Ai",
    ],
  },
  {
    title: "Deaf Sign Language",
    status: "Client's Project",
    images: [
      "/images/deaf2.png",
      "/images/deaf3.png",
      "/images/deaf4.png",
      "/images/deaf5.png",
      "/images/deaf6.png",
      "/images/deaf7.png",
      "/images/deaf8.png",
      "/images/deaf9.png",
      "/images/deaf10.png",
      "/images/deaf11.png",
      "/images/deaf12.png",
      "/images/deaf13.png",
      "/images/deaf14.png",
      "/images/deaf15.png",
      "/images/deaf16.png",
      "/images/deaf17.png",
    ],
    description:
      "A real-time sign language practice platform where students can learn and practice using AI-powered hand gesture recognition. Teachers can upload learning materials, and students can follow along and practice interactively.",
    tools: [
      "Python (FastApi)",
      "Numpy",
      "OpenCV",
      "HTML5",
      "Bootstrap",
      "Javascript",
      "MySQL",
    ],
  },
  {
    title: "E-Learning App",
    status: "Client's Project",
    images: [
      "/images/e-learning1.png",
      "/images/e-learning2.png",
      "/images/e-learning3.png",
    ],
    description:
      "An educational app designed for children 8 years and older to learn the alphabet. Kids can practice tracing letters, improving their writing skills and letter recognition through interactive exercises. The app gamifies learning with stages, rewarding progress with stars for completed tasks. Available on the Play Store for easy access.   https://play.google.com/store/apps/details?id=com.punptayugcampus.e_learninggameapptest",
    tools: ["Java", "Xml", "Canva", "Playstore"],
  },
];

export default function ProjectsSection() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" }, // 3 columns on md+
        gap: 3, // spacing between items
        mt: 4,
        px: 2,
        justifyContent: "center",
      }}
    >
      {cardData.map((item, index) => (
        <ProjectCard
          key={index}
          title={item.title}
          status={item.status}
          images={item.images} // <-- required
          video={item.video}
          description={item.description} // <-- required
          tools={item.tools}
        />
      ))}
    </Box>
  );
}
