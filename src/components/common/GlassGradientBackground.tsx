import { cn } from "@/lib/utils";

type GlassGradientVariant = "light" | "dark";

interface GlassGradientBackgroundProps {
  variant?: GlassGradientVariant;
  className?: string;
}

const variantStyles: Record<
  GlassGradientVariant,
  { base: string; orbs: string[]; halfCircle: string }
> = {
  light: {
    base: "bg-gradient-to-br from-zinc-100 via-white to-zinc-200",
    orbs: [
      "absolute -right-10 -top-10 h-44 w-44 rounded-full bg-zinc-900/15 blur-3xl",
      "absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white blur-2xl",
      "absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-400/10 blur-2xl",
    ],
    halfCircle:
      "absolute -bottom-[15rem] -right-[15rem] h-[30rem] w-[30rem] rounded-full bg-white/80 blur-xl",
  },
  dark: {
    base: "bg-gradient-to-br from-zinc-950 via-zinc-900 to-black",
    orbs: [
      "absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-3xl",
      "absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-zinc-800/60 blur-2xl",
      "absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl",
    ],
    halfCircle:
      "absolute -bottom-[15rem] -right-[15rem] h-[30rem] w-[30rem] rounded-full bg-white/25 blur-2xl",
  },
};

export default function GlassGradientBackground({
  variant = "dark",
  className,
}: GlassGradientBackgroundProps) {
  const styles = variantStyles[variant];

  return (
    <div aria-hidden className={cn("absolute inset-0", className)}>
      <div className={cn("absolute inset-0", styles.base)} />
      {styles.orbs.map((orbClass, index) => (
        <div key={index} className={orbClass} />
      ))}
      <div className={styles.halfCircle} />
    </div>
  );
}
