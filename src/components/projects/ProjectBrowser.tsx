"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Project } from "@/types/content";
import { Frame } from "@/components/ui/Frame";

function categoryOf(project: Project) {
  return project.sector.split(" · ")[0];
}

export function ProjectBrowser({ projects }: { projects: Project[] }) {
  const categories = ["All", ...Array.from(new Set(projects.map(categoryOf)))];
  const [category, setCategory] = useState("All");
  const filtered = useMemo(
    () => (category === "All" ? projects : projects.filter((project) => categoryOf(project) === category)),
    [category, projects],
  );
  const [lead, ...rest] = filtered;

  return (
    <div>
      <div className="filter-row" role="toolbar" aria-label="Filter projects">
        {categories.map((item) => (
          <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>
      {!lead ? <p>No sample studies in this sector.</p> : null}
      {lead ? (
        <article className="feature-case">
          <Link href={`/projects/${lead.slug}`} className="zoom">
            <Frame image={lead.image} sizes="(min-width: 960px) 60vw, 100vw" />
          </Link>
          <div className="feature-copy">
            <p className="kicker">{lead.sector}</p>
            <h2>
              <Link href={`/projects/${lead.slug}`}>{lead.title}</Link>
            </h2>
            <p style={{ marginTop: "0.8rem" }}>{lead.summary}</p>
          </div>
        </article>
      ) : null}
      <div className="stack" style={{ marginTop: "1.5rem" }}>
        {rest.map((project) => (
          <article key={project.slug} className="spread-row">
            <p className="spread-index">{project.mode}</p>
            <div>
              <h3>
                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
              </h3>
              <p>{project.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
