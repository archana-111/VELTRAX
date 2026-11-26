"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { careerDepartments } from "@/data/company";
import type { Career } from "@/types/content";

export function CareerList({ roles }: { roles: Career[] }) {
  const [department, setDepartment] = useState("All");
  const filtered = useMemo(
    () => (department === "All" ? roles : roles.filter((role) => role.department === department)),
    [department, roles],
  );

  return (
    <div>
      <div className="filter-row" role="toolbar" aria-label="Filter roles">
        {careerDepartments.map((item) => (
          <button key={item} type="button" aria-pressed={department === item} onClick={() => setDepartment(item)}>
            {item}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? <p>No sample roles in this department.</p> : null}
      {filtered.map((role) => (
        <article key={role.id} className="job">
          <p className="muted">{role.department} · {role.location} · {role.type}</p>
          <h3>{role.title}</h3>
          <p>{role.summary}</p>
          <ul>
            {role.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link className="btn btn-line" href={`/contact?topic=Careers`}>
            Discuss this sample role
          </Link>
        </article>
      ))}
    </div>
  );
}
