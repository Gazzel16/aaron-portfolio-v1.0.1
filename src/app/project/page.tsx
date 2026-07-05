import SectionListPage from "@/components/common/SectionListPage";
import ProjectPageContent from "@/app/project/ProjectPageContent";
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
} from "@/lib/data";

const items = [
  project13,
  project11,
  project12,
  project10,
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
      <ProjectPageContent items={items} />
    </SectionListPage>
  );
}
