import Work from "@/app/(Dashboard-v2)/components/Work";
import SectionListPage from "@/components/common/SectionListPage";
import { work1, work2, work3, work4, work5, work6, work7 } from "@/lib/data";

const items = [work1, work2, work3, work4, work5, work6, work7];

export default function ExperiencePage() {
  return (
    <SectionListPage title="03 — experience">
      <div className="flex flex-col">
        {items.map((item, index) => (
          <Work key={index} work={item} variant="default" />
        ))}
      </div>
    </SectionListPage>
  );
}
