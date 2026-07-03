"use client"

interface AcademicProps {
  acedmic: {
    title?: string;
    school?: string;
    course?: string; // Changed from boolean to string to match your data
  };
}

export default function Academic({ acedmic }: AcademicProps) {
  // Destructure for cleaner code
  const { title, school, course } = acedmic;

  return (
    <div className="group relative flex flex-col gap-1 p-4 rounded-xl hover:bg-zinc-50 transition-all duration-300">
      {/* Title (Elementary, Highschool, etc.) */}
      <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
        {title}
      </h3>

      {/* Course - Only renders if the string exists */}
      {course && (
        <p className="text-base font-medium text-blue-600 leading-tight">
          {course}
        </p>
      )}

      {/* School and Years */}
      <p className="text-sm text-zinc-500 font-normal">
        {school}
      </p>

      {/* Subtle decorative dot for a "Timeline" feel */}
      <div className="absolute left-[-17px] top-6 h-2 w-2 rounded-full bg-zinc-300 group-hover:bg-blue-500 transition-colors" />
    </div>
  )
}