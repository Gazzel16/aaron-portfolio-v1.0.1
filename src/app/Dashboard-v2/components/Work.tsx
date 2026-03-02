"use client"

interface WorkProps {
  work: {
    title?: string;
    company?: string;
    date?: string; 
  };
}

export default function Work({ work }: WorkProps) {

  const { title, company, date } = work;

  return (
    <div className="group relative flex flex-col gap-1 p-4 rounded-xl hover:bg-zinc-50 transition-all duration-300">

      <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
        {title}
      </h3>

    
      {company && (
        <p className="text-base font-medium text-blue-600 leading-tight">
          {company}
        </p>
      )}

      <p className="text-sm text-zinc-500 font-normal">
        {date}
      </p>

 
      <div className="absolute left-[-17px] top-6 h-2 w-2 rounded-full bg-zinc-300 group-hover:bg-blue-500 transition-colors" />
    </div>
  )
}