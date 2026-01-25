"use client";

import Image from "next/image";
import { Box, Typography, Chip } from "@mui/material";

interface ToolsProps {
  technology?: string;
  logo?: string;
  tools: string[];
}

export const ToolsItem = ({ technology, tools = [], logo }: ToolsProps) => {
  return (
    <Box
      sx={{
        m: 2,
        p: 2,
        bgcolor: "grey.900",
        borderRadius: 3,
        boxShadow: 6,
        width: "auto",
      }}
    >
      {/* Category Heading */}
      {technology && (
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: "grey.300",
            mb: 2,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {technology}
        </Typography>
      )}

      {/* Logo */}
      {logo && (
        <Box
          sx={{
            background: "linear-gradient(to bottom, #e5e7eb, #9ca3af, #e5e7eb)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
            p: 2,
            mb: 2,
          }}
        >
          <Image
            src={logo}
            height={100}
            width={80}
            alt={`${technology ?? "tool"} logo`}
          />
        </Box>
      )}

      {/* Tools List */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "flex-start" },
          gap: 1,
        }}
      >
        {tools.map((tool, index) => (
          <Chip
            key={index}
            label={tool}
            size="small"
            sx={{
              fontSize: "13px",
              fontWeight: 500,
              bgcolor: "grey.800",
              color: "common.white",
              border: "1px solid",
              borderColor: "grey.700",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "grey.700",
                transform: "scale(1.05)",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
