import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { aboutData } from "@/lib/data";

export async function generateCircularIcon(size: number) {
  const imagePath = join(
    process.cwd(),
    "public",
    aboutData.avatar.replace(/^\//, ""),
  );
  const imageData = await readFile(imagePath);
  const base64 = imageData.toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <img
          src={`data:image/jpeg;base64,${base64}`}
          alt={aboutData.name}
          width={size}
          height={size}
          style={{
            objectFit: "cover",
          }}
        />
      </div>
    ),
    {
      width: size,
      height: size,
    },
  );
}
