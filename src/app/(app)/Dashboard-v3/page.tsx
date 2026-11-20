"use client";
import { Instrument_Serif, Syne } from "next/font/google";
import { aboutData } from "@/lib/data";
import {
  tech1,
  tech2,
  tech3,
  tech4,
  tech5,
  tech6,
  tech7,
  tech8,
} from "@/lib/data";
import {
  project1,
  project2,
  project3,
  project4,
  project5,
  project6,
  project7,
  project8,
  project9,
  project10,
  project11,
  project12,
  project13,
  project14,
  project15,
  project16,
  project17,
} from "@/lib/data";
import {
  work1,
  work2,
  work3,
  work4,
  work5,
  work6,
  work7,
} from "@/lib/data";
import {
  certificate1,
  certificate2,
  certificate3,
  certificate4,
  certificate5,
} from "@/lib/data";
import { appBuilderPH } from "@/lib/data";
import Header from "./components/Header";
import IntroductionCarousel from "./components/IntroductionCarousel";
import SkillsAccordion from "./components/SkillsAccordion";
import ExperienceAccordion from "./components/ExperienceAccordion";
import ProjectsBook from "./components/ProjectsBook";
import CertificatesBook from "./components/CertificatesBook";
import ServicesAccordion from "./components/ServicesAccordion";
import ContactBook from "./components/ContactBook";
import RobotRocketAnimation from "@/components/common/RobotRocketAnimation";
import SpiderAnimation from "@/components/common/SpiderAnimation";
import StickmanCoffeeAnimation from "@/components/common/StickmanCoffeeAnimation";
import CatAndDogAnimation from "@/components/common/CatAndDogAnimation";
import BookIntro from "@/components/common/BookIntro";
import GithubContributionBook from "./components/GithubContributionBook";
import PortfolioChat from "./components/PortfolioChat";
import AskGoru from "./components/AskGoru";

const skillGroups = [
  tech1,
  tech2,
  tech3,
  tech4,
  tech5,
  tech6,
  tech7,
  tech8,
];

const experienceItems = [
  work6,
  work7,
  work5,
  work4,
  work3,
  work2,
  work1,
];

const projectItems = [
  project17,
  project16,
  project1,
  project2,
  project3,
  project4,
  project5,
  project6,
  project7,
  project8,
  project9,
  project10,
  project11,
  project12,
  project13,
  project14,
  project15,
];

const certificateItems = [
  certificate5,
  certificate4,
  certificate3,
  certificate2,
  certificate1,
];

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-book-display",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-book-sans",
});

export const introductionBullet = [
  {
    bulletList: [
      "FULL-STACK DEVELOPER",
      "DEVOPS",
      "MOBILE DEVELOPER",
      "WEB DEVELOPER",
      "INFRASTRUCTURE ENTHUSIAST",
    ],
  },
];

export const buildLog = [
  {
    Title: "FRONTEND - REACT & NEXT.JS",
    percentage: 83,
  },
  {
    Title: "BACKEND - NODE.JS & FASTAPI",
    percentage: 85,
  },
  {
    Title: "MOBILE - REACT NATIVE/EXPO & KOTLIN",
    percentage: 81,
  },
  {
    Title: "ARCHITECTURE - DOCKER & CI/CD",
    percentage: 73,
  },
];

export const services = [
    {
        Title: "Full-Stack Development",
        description:"Complete system development from server to client, including database design and deployment."
    },
    {
        Title: "Cloud & DevOps",
        description:"Cloud infrastructure setup, containerization, CI/CD pipelines, and automated deployment."
    },
    {
        Title: "Consulting",
        description:"Architecture and strategic advice for startups, students, businesses, and hobbyists."
    }
]

export default function DashboardV3() {
  return (
    <div
      className={`${instrumentSerif.variable} ${syne.variable} bg-[#e8ebe6]`}
    >
      <BookIntro
        description="A builder who turns ideas into working solutions through technology."
        oncePerSession={false}
      />

      <Header />
      <AskGoru />
      <PortfolioChat />

      <section
        id="Home"
        className="relative min-h-[100svh] overflow-x-hidden bg-[#e8ebe6] pt-[4.5rem]"
      >
        {/* Atmosphere */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(45,74,62,0.08),transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(28,36,48,0.06),transparent_45%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.05%22/%3E%3C/svg%3E')]"
        />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
          {/* Open book */}
          <div className="book-spread relative grid w-full grid-cols-1 shadow-[0_24px_80px_-24px_rgba(28,36,48,0.35)] lg:grid-cols-2">
            {/* Spine */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-6 left-1/2 z-20 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#1c2430]/20 to-transparent lg:block"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#1c2430]/[0.06] to-transparent lg:block"
            />

            {/* Left page — brand */}
            <article className="book-page-left relative flex min-h-[52svh] flex-col justify-between bg-[#f4f5f2] px-8 py-10 sm:px-12 sm:py-14 lg:min-h-[70svh] lg:rounded-l-[2px] lg:pl-14 lg:pr-16 lg:shadow-[inset_-18px_0_28px_-20px_rgba(28,36,48,0.12)]">
              <header className="flex items-start justify-between gap-4">
                <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-[#5c6b5e]">
                  Portfolio — Version III
                </p>
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a9488]">
                  Folio 01
                </span>
              </header>

              <div className="my-auto py-12 lg:py-8">
                <p className="mb-4 font-[family-name:var(--font-book-sans)] text-xs font-semibold uppercase tracking-[0.2em] text-[#2d4a3e]">
                  The volume
                </p>
                <div className="relative">
                  <h1 className="relative z-10 font-[family-name:var(--font-book-display)] text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.92] tracking-[-0.02em] text-[#1c2430]">
                    Aaron
                    <br />
                    Mercado
                  </h1>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-2 top-1/2 z-0 -translate-y-1/2 opacity-90 sm:right-0 md:-right-4 lg:right-2"
                  >
                    <div className="animate-[profile-planet-float_5s_ease-in-out_infinite]">
                      <RobotRocketAnimation compact />
                    </div>
                  </div>
                </div>
                <p className="mt-6 max-w-[28ch] font-[family-name:var(--font-book-sans)] text-base leading-relaxed text-[#4a554c] sm:text-lg">
                  A builder who turns ideas into working solutions through
                  technology.
                </p>
              </div>

              <footer className="flex items-end justify-between border-t border-[#1c2430]/10 pt-5">
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#8a9488]">
                  Manila · Remote
                </span>
                <span className="font-[family-name:var(--font-book-display)] text-2xl italic text-[#2d4a3e]/70">
                  iii
                </span>
              </footer>
            </article>

            {/* Right page — introduction */}
            <article className="book-page-right relative flex min-h-[52svh] flex-col justify-between bg-[#fafaf7] px-8 py-10 sm:px-12 sm:py-14 lg:min-h-[70svh] lg:rounded-r-[2px] lg:pl-16 lg:pr-14 lg:shadow-[inset_18px_0_28px_-20px_rgba(28,36,48,0.1)]">
              <header className="flex items-start justify-between gap-4">
                <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-[#5c6b5e]">
                  Chapter · Introduction
                </p>
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a9488]">
                  Folio 02
                </span>
              </header>

              <div className="my-auto space-y-8 py-12 lg:py-8">
                <div>
                  <div
                    aria-hidden
                    className="pointer-events-none mb-3 opacity-80"
                  >
                    <SpiderAnimation />
                  </div>
                  <h2 className="max-w-[16ch] font-[family-name:var(--font-book-display)] text-[clamp(1.65rem,3.4vw,2.35rem)] leading-[1.15] tracking-[-0.015em] text-[#1c2430]">
                    I build software that helps businesses grow and succeed.
                  </h2>
                </div>

                <IntroductionCarousel
                  bullets={introductionBullet[0].bulletList}
                />

                <div className="relative pt-2">
                  <div className="pointer-events-none absolute bottom-full right-0 z-10 mb-1 hidden sm:block">
                    <StickmanCoffeeAnimation />
                  </div>
                  <div className="pointer-events-none mb-3 sm:hidden">
                    <StickmanCoffeeAnimation />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                    <a
                      href="#Projects"
                      className="group font-[family-name:var(--font-book-sans)] text-sm font-semibold uppercase tracking-[0.14em] text-[#1c2430] transition-colors hover:text-[#2d4a3e]"
                    >
                      <span className="border-b border-[#1c2430]/30 pb-0.5 transition-colors group-hover:border-[#2d4a3e]">
                        Start a project
                      </span>
                    </a>
                    <a
                      href="#Experience"
                      className="group font-[family-name:var(--font-book-sans)] text-sm font-medium uppercase tracking-[0.14em] text-[#5c6b5e] transition-colors hover:text-[#1c2430]"
                    >
                      <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-[#1c2430]/25">
                        View experience
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              <footer className="flex items-end justify-between border-t border-[#1c2430]/10 pt-5">
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#8a9488]">
                  Turn the page
                </span>
                <a
                  href="#About"
                  className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#2d4a3e] transition-opacity hover:opacity-70"
                >
                  Next →
                </a>
              </footer>
            </article>
          </div>
        </div>
      </section>

      <section
        id="About"
        className="relative min-h-[100svh] overflow-x-hidden bg-[#e8ebe6]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(45,74,62,0.07),transparent_50%),radial-gradient(ellipse_at_10%_90%,rgba(28,36,48,0.05),transparent_45%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.05%22/%3E%3C/svg%3E')]"
        />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="book-spread relative grid w-full grid-cols-1 shadow-[0_24px_80px_-24px_rgba(28,36,48,0.35)] lg:grid-cols-2">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-6 left-1/2 z-20 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#1c2430]/20 to-transparent lg:block"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#1c2430]/[0.06] to-transparent lg:block"
            />

            {/* Left page — journey */}
            <article className="book-page-left relative flex min-h-[52svh] flex-col justify-between bg-[#f4f5f2] px-8 py-10 sm:px-12 sm:py-14 lg:min-h-[70svh] lg:rounded-l-[2px] lg:pl-14 lg:pr-16 lg:shadow-[inset_-18px_0_28px_-20px_rgba(28,36,48,0.12)]">
              <header className="flex items-start justify-between gap-4">
                <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-[#5c6b5e]">
                  No. 01 — The Maker
                </p>
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a9488]">
                  Folio 03
                </span>
              </header>

              <div className="my-auto space-y-8 py-10 lg:py-6">
                {/* Photo booth strip + pets beside */}
                <div className="flex items-end gap-4 sm:gap-5">
                  <figure className="relative w-full max-w-[200px] rotate-[-1.5deg] bg-[#fafaf7] p-3 shadow-[0_12px_40px_-16px_rgba(28,36,48,0.35)] ring-1 ring-[#1c2430]/15 sm:max-w-[220px]">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-10 left-1/2 z-10 -translate-x-1/2 opacity-80"
                    >
                      <SpiderAnimation />
                    </div>
                    <div className="aspect-[3/4] overflow-hidden bg-[#1c2430]/5">
                      <img
                        src={aboutData.avatar}
                        alt="Aaron Mercado"
                        className="h-full w-full object-cover object-top grayscale-[15%] transition-[filter,transform] duration-700 hover:scale-[1.03] hover:grayscale-0"
                      />
                    </div>
                    <figcaption className="pt-3 pb-1 text-center">
                      <span className="font-[family-name:var(--font-book-display)] text-lg tracking-[-0.02em] text-[#1c2430]">
                        Aaron Mercado
                      </span>
                    </figcaption>
                  </figure>

                  <div
                    aria-hidden
                    className="pointer-events-none mb-4 shrink-0 opacity-90"
                  >
                    <CatAndDogAnimation compact />
                  </div>
                </div>

                <div>
                  <p className="mb-3 font-[family-name:var(--font-book-sans)] text-xs font-semibold uppercase tracking-[0.2em] text-[#2d4a3e]">
                    My Journey
                  </p>
                  <p className="max-w-[28ch] font-[family-name:var(--font-book-display)] text-[clamp(1.35rem,2.8vw,1.75rem)] leading-[1.25] tracking-[-0.015em] text-[#1c2430]">
                    2+ years building software — mostly freelancing, with recent
                    corporate experience delivering full-stack applications.
                  </p>
                </div>
              </div>

              <footer className="flex items-end justify-between border-t border-[#1c2430]/10 pt-5">
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#8a9488]">
                  Manila · Remote / Local
                </span>
                <span className="font-[family-name:var(--font-book-display)] text-2xl italic text-[#2d4a3e]/70">
                  01
                </span>
              </footer>
            </article>

            {/* Right page — beliefs + build log */}
            <article className="book-page-right relative flex min-h-[52svh] flex-col justify-between bg-[#fafaf7] px-8 py-10 sm:px-12 sm:py-14 lg:min-h-[70svh] lg:rounded-r-[2px] lg:pl-16 lg:pr-14 lg:shadow-[inset_18px_0_28px_-20px_rgba(28,36,48,0.1)]">
              <header className="flex items-start justify-between gap-4">
                <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-[#5c6b5e]">
                  Chapter · Beliefs
                </p>
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a9488]">
                  Folio 04
                </span>
              </header>

              <div className="my-auto space-y-10 py-10 lg:py-6">
                <p className="font-[family-name:var(--font-book-sans)] text-[15px] leading-[1.7] text-[#4a554c] sm:text-base">
                  I&apos;m a full stack developer who builds and ships production
                  systems end to end, from database design and APIs to
                  deployment. I specialize in React, Next.js, TypeScript,
                  Node.js, and Python (FastAPI), with experience in cloud
                  infrastructure like DigitalOcean, Vercel, Supabase, and
                  Firebase, plus Discord alerts for commits and deployments.
                  Outside my day job, I mentor student capstone teams and enjoy
                  scoping software solutions for clients&apos; business
                  problems.
                </p>

                <div>
                  <p className="mb-5 font-[family-name:var(--font-book-sans)] text-xs font-semibold uppercase tracking-[0.2em] text-[#2d4a3e]">
                    Build Log — selected work
                  </p>
                  <ul className="space-y-4">
                    {buildLog.map((log, index) => (
                      <li key={index} className="space-y-2">
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.14em] text-[#4a554c]">
                            {log.Title}
                          </span>
                          <span className="shrink-0 font-[family-name:var(--font-book-display)] text-sm italic text-[#2d4a3e]">
                            {log.percentage}%
                          </span>
                        </div>
                        <div className="h-px w-full bg-[#1c2430]/10">
                          <div
                            className="h-px bg-[#2d4a3e]/70 transition-[width] duration-700"
                            style={{ width: `${log.percentage}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>

                  <GithubContributionBook />
                </div>
              </div>

              <footer className="flex items-end justify-between border-t border-[#1c2430]/10 pt-5">
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#8a9488]">
                  Turn the page
                </span>
                <a
                  href="#Experience"
                  className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#2d4a3e] transition-opacity hover:opacity-70"
                >
                  Next →
                </a>
              </footer>
            </article>
          </div>
        </div>
      </section>

      <section
        id="Experience"
        className="relative min-h-[100svh] overflow-x-hidden bg-[#e8ebe6]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_15%,rgba(45,74,62,0.07),transparent_50%),radial-gradient(ellipse_at_20%_85%,rgba(28,36,48,0.05),transparent_45%)]"
        />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="book-spread relative w-full shadow-[0_24px_80px_-24px_rgba(28,36,48,0.35)]">
            <article className="book-page-left relative flex min-h-[60svh] flex-col justify-between bg-[#f4f5f2] px-8 py-10 sm:px-12 sm:py-14 lg:min-h-[70svh] lg:px-16">
              <header className="flex items-start justify-between gap-4">
                <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-[#5c6b5e]">
                  No. 02 — The Experience
                </p>
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a9488]">
                  Folio 06
                </span>
              </header>

              <div className="my-auto space-y-8 py-10 lg:py-8">
                <div>
                  <p className="mb-3 font-[family-name:var(--font-book-sans)] text-xs font-semibold uppercase tracking-[0.2em] text-[#2d4a3e]">
                    Work log
                  </p>
                  <h2 className="font-[family-name:var(--font-book-display)] text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-[#1c2430]">
                    Roles, teams, and what I shipped.
                  </h2>
                </div>

                <ExperienceAccordion items={experienceItems} />
              </div>

              <footer className="flex items-end justify-between border-t border-[#1c2430]/10 pt-5">
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#8a9488]">
                  Turn the page
                </span>
                <a
                  href="#Projects"
                  className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#2d4a3e] transition-opacity hover:opacity-70"
                >
                  Next →
                </a>
              </footer>
            </article>
          </div>
        </div>
      </section>

      <section
        id="Projects"
        className="relative min-h-[100svh] overflow-x-hidden bg-[#e8ebe6]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(45,74,62,0.07),transparent_50%),radial-gradient(ellipse_at_85%_80%,rgba(28,36,48,0.05),transparent_45%)]"
        />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="book-spread relative w-full shadow-[0_24px_80px_-24px_rgba(28,36,48,0.35)]">
            <article className="book-page-right relative flex min-h-[60svh] flex-col justify-between bg-[#fafaf7] px-8 py-10 sm:px-12 sm:py-14 lg:min-h-[70svh] lg:px-16">
              <header className="flex items-start justify-between gap-4">
                <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-[#5c6b5e]">
                  No. 03 — The Projects
                </p>
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a9488]">
                  Folio 07
                </span>
              </header>

              <div className="my-auto space-y-8 py-10 lg:py-8">
                <div>
                  <p className="mb-3 font-[family-name:var(--font-book-sans)] text-xs font-semibold uppercase tracking-[0.2em] text-[#2d4a3e]">
                    Selected work
                  </p>
                  <h2 className="font-[family-name:var(--font-book-display)] text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-[#1c2430]">
                    Products, prototypes, and shipped systems.
                  </h2>
                </div>

                <ProjectsBook projects={projectItems} />
              </div>

              <footer className="flex items-end justify-between border-t border-[#1c2430]/10 pt-5">
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#8a9488]">
                  Turn the page
                </span>
                <a
                  href="#Certificates"
                  className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#2d4a3e] transition-opacity hover:opacity-70"
                >
                  Next →
                </a>
              </footer>
            </article>
          </div>
        </div>
      </section>

      <section
        id="Certificates"
        className="relative min-h-[100svh] overflow-x-hidden bg-[#e8ebe6]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(45,74,62,0.07),transparent_50%),radial-gradient(ellipse_at_20%_80%,rgba(28,36,48,0.05),transparent_45%)]"
        />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="book-spread relative w-full shadow-[0_24px_80px_-24px_rgba(28,36,48,0.35)]">
            <article className="book-page-left relative flex min-h-[60svh] flex-col justify-between bg-[#f4f5f2] px-8 py-10 sm:px-12 sm:py-14 lg:min-h-[70svh] lg:px-16">
              <header className="flex items-start justify-between gap-4">
                <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-[#5c6b5e]">
                  No. 04 — The Certificates
                </p>
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a9488]">
                  Folio 08
                </span>
              </header>

              <div className="my-auto space-y-8 py-10 lg:py-8">
                <div>
                  <p className="mb-3 font-[family-name:var(--font-book-sans)] text-xs font-semibold uppercase tracking-[0.2em] text-[#2d4a3e]">
                    Credentials
                  </p>
                  <h2 className="font-[family-name:var(--font-book-display)] text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-[#1c2430]">
                    Proof of work, filed in the margins.
                  </h2>
                </div>

                <CertificatesBook certificates={certificateItems} />
              </div>

              <footer className="flex items-end justify-between border-t border-[#1c2430]/10 pt-5">
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#8a9488]">
                  Turn the page
                </span>
                <a
                  href="#Skills"
                  className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#2d4a3e] transition-opacity hover:opacity-70"
                >
                  Next →
                </a>
              </footer>
            </article>
          </div>
        </div>
      </section>

      <section
        id="Skills"
        className="relative min-h-[100svh] overflow-x-hidden bg-[#e8ebe6]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(45,74,62,0.07),transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(28,36,48,0.05),transparent_45%)]"
        />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="book-spread relative w-full shadow-[0_24px_80px_-24px_rgba(28,36,48,0.35)]">
            <article className="book-page-right relative flex min-h-[60svh] flex-col justify-between bg-[#fafaf7] px-8 py-10 sm:px-12 sm:py-14 lg:min-h-[70svh] lg:px-16">
              <header className="flex items-start justify-between gap-4">
                <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-[#5c6b5e]">
                  No. 05 — The Collections
                </p>
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a9488]">
                  Folio 09
                </span>
              </header>

              <div className="my-auto space-y-8 py-10 lg:py-8">
                <div>
                  <p className="mb-3 font-[family-name:var(--font-book-sans)] text-xs font-semibold uppercase tracking-[0.2em] text-[#2d4a3e]">
                    Tech stack
                  </p>
                  <h2 className=" font-[family-name:var(--font-book-display)] text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-[#1c2430]">
                    Tools I reach for when building.
                  </h2>
                </div>

                <SkillsAccordion groups={skillGroups} />
              </div>

              <footer className="flex items-end justify-between border-t border-[#1c2430]/10 pt-5">
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#8a9488]">
                  Turn the page
                </span>
                <a
                  href="#Services"
                  className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#2d4a3e] transition-opacity hover:opacity-70"
                >
                  Next →
                </a>
              </footer>
            </article>
          </div>
        </div>
      </section>

      <section
        id="Services"
        className="relative min-h-[100svh] overflow-x-hidden bg-[#e8ebe6]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_65%_20%,rgba(45,74,62,0.07),transparent_50%),radial-gradient(ellipse_at_25%_85%,rgba(28,36,48,0.05),transparent_45%)]"
        />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="book-spread relative w-full shadow-[0_24px_80px_-24px_rgba(28,36,48,0.35)]">
            <article className="book-page-left relative flex min-h-[60svh] flex-col justify-between bg-[#f4f5f2] px-8 py-10 sm:px-12 sm:py-14 lg:min-h-[70svh] lg:px-16">
              <header className="flex items-start justify-between gap-4">
                <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-[#5c6b5e]">
                  No. 06 — The Services
                </p>
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a9488]">
                  Folio 10
                </span>
              </header>

              <div className="my-auto space-y-8 py-10 lg:py-8">
                <div>
                  <p className="mb-3 font-[family-name:var(--font-book-sans)] text-xs font-semibold uppercase tracking-[0.2em] text-[#2d4a3e]">
                    What I do
                  </p>
                  <h2 className="font-[family-name:var(--font-book-display)] text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-[#1c2430]">
                    Disciplines, filed and ready.
                  </h2>
                  <p className="mt-4 max-w-[36ch] font-[family-name:var(--font-book-sans)] text-sm leading-relaxed text-[#5c6b5e]">
                    Click a row to expand.
                  </p>
                </div>

                <ServicesAccordion items={services} />
              </div>

              <footer className="flex items-end justify-between border-t border-[#1c2430]/10 pt-5">
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#8a9488]">
                  Turn the page
                </span>
                <a
                  href="#Contact"
                  className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#2d4a3e] transition-opacity hover:opacity-70"
                >
                  Next →
                </a>
              </footer>
            </article>
          </div>
        </div>
      </section>

      <section
        id="Contact"
        className="relative min-h-[100svh] overflow-x-hidden bg-[#e8ebe6]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_15%,rgba(45,74,62,0.07),transparent_50%),radial-gradient(ellipse_at_80%_85%,rgba(28,36,48,0.05),transparent_45%)]"
        />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <ContactBook />
        </div>
      </section>
    </div>
  );
}
