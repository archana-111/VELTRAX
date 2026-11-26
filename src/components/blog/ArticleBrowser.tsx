"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { articleCategories } from "@/data/articles";
import type { Article } from "@/types/content";
import { Frame } from "@/components/ui/Frame";

const pageSize = 4;

export function ArticleBrowser({ articles }: { articles: Article[] }) {
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const filtered = useMemo(
    () => (category === "All" ? articles : articles.filter((article) => article.category === category)),
    [articles, category],
  );
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * pageSize, current * pageSize);

  return (
    <div>
      <div className="filter-row" role="toolbar" aria-label="Filter insights">
        {articleCategories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => {
              setCategory(item);
              setPage(1);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      {visible.length === 0 ? <p>No sample articles in this category.</p> : null}
      <div className="stack">
        {visible.map((article) => (
          <article key={article.slug} className="spread-row spread-row--article">
            <Frame image={article.image} className="spread-frame" sizes="180px" />
            <div>
              <p className="muted">{article.category} · {article.date} · {article.readMinutes} min</p>
              <h2>
                <Link href={`/blog/${article.slug}`}>{article.title}</Link>
              </h2>
              <p>{article.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
      {pages > 1 ? (
        <div className="pager" aria-label="Pagination">
          {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
            <button key={number} type="button" aria-current={number === current ? "page" : undefined} onClick={() => setPage(number)}>
              {number}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
