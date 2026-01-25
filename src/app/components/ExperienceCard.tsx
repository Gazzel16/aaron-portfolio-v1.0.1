"use client";
import { Box, Typography, Chip } from "@mui/material";

export interface ExperienceProps {
  title?: string;
  subtitle?: string;
  description?: string;
  tools?: string[]
}

export default function ExperienceCard({
  title,
  subtitle,
  description,
  tools = []
}: ExperienceProps) {
  return (
    <Box>
      <Typography
      variant="subtitle1"
      fontWeight={500}
      gutterBottom 
      sx={{color: "#ffffff   ", fontSize: "1.2rem", mb: 0, mt: 2}}
      >
        {title}
      </Typography>

      <Typography
      variant="subtitle1"
      fontWeight={100}
      gutterBottom 
      sx={{color: "#ffffff ", fontSize: "0.8rem", mb: 0, mt: 0}}
      >
        {subtitle}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ whiteSpace: "pre-line", color: "#d3d3d3" }}
      >
        {description}
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
        {tools.map((tool, index) => (
          <Chip
            key={index}
            label={tool}
            size="small"
            sx={{
              fontSize: "0.75rem",
              fontWeight: 500,
              bgcolor: "#444",       // dark background
              color: "#fff",         // white text
              border: "1px solid #555",
              "&:hover": { bgcolor: "#555" },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
