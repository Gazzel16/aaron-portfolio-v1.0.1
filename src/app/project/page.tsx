import Project from "@/app/(Dashboard-v2)/components/Project";
import SectionListPage from "@/components/common/SectionListPage";
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
} from "@/lib/data";

const items = [
  project9,
  project8,
  project7,
  project6,
  project1,
  project2,
  project3,
  project4,
  project5,
];

export default function ProjectPage() {
  return (
    <SectionListPage title="05 — projects">
      <div className="flex flex-col">
        {items.map((item, index) => (
          <Project key={index} proj={item} />
        ))}
      </div>
    </SectionListPage>
  );
}
