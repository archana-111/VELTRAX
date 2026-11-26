"use client";

import { useState } from "react";
import type { Faq } from "@/types/content";

export function Accordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div>
      {items.map((item) => {
        const expanded = open === item.id;
        return (
          <div className="faq-item" key={item.id}>
            <h3 className="faq-heading">
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`panel-${item.id}`}
                id={`question-${item.id}`}
                onClick={() => setOpen(expanded ? null : item.id)}
              >
                {item.question}
                <span className="plus" aria-hidden="true" />
              </button>
            </h3>
            <div
              id={`panel-${item.id}`}
              role="region"
              aria-labelledby={`question-${item.id}`}
              hidden={!expanded}
              className="faq-panel"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
