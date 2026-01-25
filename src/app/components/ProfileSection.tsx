"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface HeroSectionProps {
  avatarUrl: string;
  name: string;
  description: string;
}

export default function HeroSection({
  avatarUrl,
  name,
  description,
}: HeroSectionProps) {
  return (
    <Box
      component="section"
      sx={{
        
        minHeight: "100vh",
        px: 2,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Avatar */}
      <Box sx={{ m: 3 }}>
        <Image
          src={avatarUrl}
          alt={name}
          width={300}
          height={300}
          priority
        />
      </Box>

      {/* Text */}
      <Box sx={{ maxWidth: 640 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "1.5rem", md: "3.5rem" },
            fontWeight: 700,
            mb: 2,
            color: "common.white",
          }}
        >
          Hi i'm, <Box component="strong" sx={{ color: "#f59e0b" }}>{name}</Box>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "grey.300",
            lineHeight: 1.7,
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
