"use client";

import { useMemo, useState } from "react";
import { faqGroups } from "@/data/company";
import type { Faq } from "@/types/content";
import { Accordion } from "@/components/ui/Accordion";

export function FaqBrowser({ items }: { items: Faq[] }) {
  const [group, setGroup] = useState("All");
  const filtered = useMemo(
    () => (group === "All" ? items : items.filter((item) => item.group === group)),
    [group, items],
  );

  return (
    <div>
      <div className="filter-row" role="toolbar" aria-label="Filter questions">
        {faqGroups.map((item) => (
          <button key={item} type="button" aria-pressed={group === item} onClick={() => setGroup(item)}>
            {item}
          </button>
        ))}
      </div>
      <Accordion key={group} items={filtered} />
    </div>
  );
}
