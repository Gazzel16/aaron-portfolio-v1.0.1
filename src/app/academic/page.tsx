import Academic from "@/app/(Dashboard-v2)/components/Acedemic";
import SectionListPage from "@/components/common/SectionListPage";
import { acedmic1, acedmic2, acedmic3, acedmic4 } from "@/lib/data";

const items = [acedmic4, acedmic3, acedmic2, acedmic1];

export default function AcademicPage() {
  return (
    <SectionListPage title="02 — education">
      <div className="flex flex-col">
        {items.map((item, index) => (
          <Academic key={index} acedmic={item} />
        ))}
      </div>
    </SectionListPage>
  );
}
