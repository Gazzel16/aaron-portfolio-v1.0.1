import Certificate from "@/app/(Dashboard-v2)/components/certificates";
import SectionListPage from "@/components/common/SectionListPage";
import {
  certificate1,
  certificate2,
  certificate3,
  certificate4,
  certificate5,
} from "@/lib/data";

const items = [
  certificate1,
  certificate2,
  certificate3,
  certificate4,
  certificate5,
];

export default function CertificatePage() {
  return (
    <SectionListPage title="06 — certificates">
      <div className="flex flex-col">
        {items.map((item, index) => (
          <Certificate key={index} cert={item} />
        ))}
      </div>
    </SectionListPage>
  );
}
