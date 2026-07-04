import Tech from "@/app/(Dashboard-v2)/components/Tech";
import SectionListPage from "@/components/common/SectionListPage";
import { tech1, tech2, tech3, tech4, tech5, tech6, tech7 } from "@/lib/data";

const items = [tech1, tech2, tech3, tech4, tech5, tech6, tech7];

export default function StacksPage() {
  return (
    <SectionListPage title="04 — stacks">
      <div className="flex flex-col gap-6">
        {items.map((item, index) => (
          <Tech key={index} tech={item} />
        ))}
      </div>
    </SectionListPage>
  );
}
