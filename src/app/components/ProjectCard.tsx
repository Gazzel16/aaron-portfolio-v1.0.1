"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Dialog,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CardProps {
  title: string;
  status: string;
  images: string[];
  video?: string;
  description: string;
  tools: string[];
}

export const ProjectCard = ({
  title,
  status,
  images,
  video,
  description,
  tools,
}: CardProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {/* CARD */}
      <Card
        onClick={() => setIsOpen(true)}
        sx={{   
          bgcolor: "grey.900",
          color: "common.white",
          borderRadius: 3,
          cursor: "pointer",
          transition: "box-shadow 0.3s",
          "&:hover": {
            boxShadow: 10,
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 1,
            borderBottom: "1px solid",
            borderColor: "grey.800",
          }}
        >
          <Typography variant="h6" fontWeight={600} mb={1}>
            {title}
          </Typography>

          <Typography
            sx={{
              bgcolor: "warning.main", // yellow background like your Chip
              color: "common.white",
              fontWeight: 500,
              fontSize: "0.875rem",
              px: 1.5, // horizontal padding
              py: 0.5, // vertical padding
              borderRadius: 1, // rounded corners like a Chip
              display: "inline-block", // shrink to content width
              mb: 1, // optional spacing below
            }}
          >
            {status}
          </Typography>
        </Box>

        {/* Image Carousel */}
        <Box
          sx={{
            position: "relative",
            height: 260,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              height: "100%",
              transform: `translateX(-${activeIndex * 100}%)`,
              transition: "transform 0.7s ease-in-out",
            }}
          >
            {images.map((img, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  minWidth: "100%",
                  height: "100%",
                }}
              >
                <Image
                  src={img}
                  alt={`${title} ${index}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
            ))}
          </Box>

          {/* Dots */}
          <Box
            sx={{
              position: "absolute",
              bottom: 12,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 1,
            }}
          >
            {images.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: index === activeIndex ? "warning.main" : "grey.900",
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Description & Tools */}
        <CardContent sx={{ p: 2 }}>
          <Typography variant="body2" color="grey.300" mb={2}>
            {description}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {tools.map((tool, index) => (
              <Chip
                key={index}
                label={tool}
                variant="outlined"
                sx={{
                  color: "grey.200",
                  borderColor: "grey.700",
                  "&:hover": {
                    bgcolor: "grey.800",
                  },
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* DIALOG (MODAL) */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <Box
          sx={{
            bgcolor: "grey.900",
            color: "common.white",
            p: 3,
            position: "relative",
          }}
        >
          <IconButton
            onClick={() => setIsOpen(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "common.white",
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" mb={3}>
            {title} – Images
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: 2,
            }}
          >
            {images.map((img, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  height: 260,
                }}
              >
                <Image
                  src={img}
                  alt={`${title} full ${index}`}
                  fill
                  style={{ objectFit: "cover", borderRadius: 8 }}
                />
              </Box>
            ))}
          </Box>

          {video && (
  <Box mb={3} mt={3}>
    <video
      src={video}
      controls
      autoPlay
      style={{ width: "100%", borderRadius: 12 }}
    />
  </Box>
)}
        </Box>
      </Dialog>
    </>
  );
};
