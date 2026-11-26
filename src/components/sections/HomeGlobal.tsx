import Link from "next/link";
import { articles } from "@/data/articles";
import { faqs, processSteps, sampleMetrics } from "@/data/company";
import { images } from "@/data/images";
import { industries } from "@/data/industries";
import { projects } from "@/data/projects";
import { Accordion } from "@/components/ui/Accordion";
import { Frame } from "@/components/ui/Frame";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { CountUp } from "@/components/ui/CountUp";
import { GlobalHero } from "@/components/sections/GlobalHero";
import { ServiceLedger } from "@/components/sections/ServiceLedger";
import { NetworkMap } from "@/components/sections/NetworkMap";
import { HomeCtaBlock } from "@/components/sections/HomeCtaBlock";

export function HomeGlobal() {
  const study = projects[0];
  const restStudies = projects.slice(1);
  const [lead, ...notes] = articles.slice(0, 3);

  return (
    <>
      <GlobalHero />

      <section
        className="band home-position"
        id="position"
        data-motion="position"
        aria-labelledby="position-title"
      >
        <div className="shell home-split home-position-grid">
          <Reveal className="home-split-copy home-position-copy">
            <p className="kicker">Position</p>
            <h2 id="position-title">A forwarder is a record other people can run.</h2>
            <p className="lede">
              VELTRAX is a sample company. The work it describes is ordinary and exacting: choose the
              mode, name the handoff, and keep the warehouse, the border, and the truck on the same
              page.
            </p>
            <ul className="home-metrics" aria-label="Sample template figures">
              {sampleMetrics.map((metric) => (
                <li key={metric.label}>
                  <span className="home-metrics-value">
                    <CountUp value={metric.value} />
                    {metric.suffix ? <em>{metric.suffix}</em> : null}
                  </span>
                  <span className="home-metrics-label">{metric.label}</span>
                </li>
              ))}
            </ul>
            <Link className="text-link" href="/about">
              About the sample
            </Link>
          </Reveal>
          <Reveal as="figure" className="home-split-media home-position-media" delay={90}>
            <Frame image={images.operations} sizes="(min-width: 900px) 42vw, 100vw" />
            <figcaption>Desk and dock · demonstration photograph</figcaption>
          </Reveal>
        </div>
      </section>

      <section
        className="band band-sand home-sequence"
        data-motion="sequence"
        aria-labelledby="sequence-title"
      >
        <div className="shell home-sequence-layout">
          <Reveal as="header" className="home-intro home-sequence-intro">
            <p className="kicker">Operating sequence</p>
            <h2 id="sequence-title">Five moves, in order.</h2>
            <p>A sample booking path. Not a speed claim — the shape of the work.</p>
            <p>
              Each step names what has to be true before the next one starts: the brief, the mode,
              the hold on space, the milestones in motion, and the close.
            </p>
            <p>
              The template shows the order operators can run without inventing a second process when
              a sailing slips or a document is late.
            </p>
          </Reveal>
          <Reveal as="figure" className="home-sequence-media" delay={90}>
            <Frame image={images.containers} sizes="(min-width: 900px) 48vw, 100vw" />
            <figcaption>Corridor · demonstration photograph</figcaption>
          </Reveal>
          <RevealStagger as="ol" className="home-steps home-sequence-steps">
            {processSteps.map((step) => (
              <li key={step.index}>
                <b>{step.index}</b>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </li>
            ))}
          </RevealStagger>
        </div>
      </section>

      <ServiceLedger />

      <section className="band band-tight" data-motion="network" aria-labelledby="network-title">
        <Reveal className="shell">
          <header className="home-intro">
            <p className="kicker">Corridor schematic</p>
            <h2 id="network-title">Sample lanes, not a live map.</h2>
            <p>A stylized world diagram of demonstration corridors between labeled cities.</p>
          </header>
          <NetworkMap />
        </Reveal>
      </section>

      <section className="band" data-motion="industries" aria-labelledby="industries-title">
        <Reveal className="shell">
          <header className="home-intro home-intro--row">
            <div>
              <p className="kicker">Industries</p>
              <h2 id="industries-title">The same record, different rooms.</h2>
            </div>
            <Link className="text-link" href="/industries">
              All industries
            </Link>
          </header>
          <RevealStagger className="home-industry-grid">
            {industries.slice(0, 3).map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="home-industry-tile"
              >
                <Frame image={industry.image} sizes="(min-width: 900px) 28vw, 100vw" />
                <span>
                  <em>{industry.index}</em>
                  <strong>{industry.name}</strong>
                </span>
              </Link>
            ))}
          </RevealStagger>
          <ul className="home-index">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link href={`/industries/${industry.slug}`}>
                  <em>{industry.index}</em>
                  <strong>{industry.name}</strong>
                  <span>{industry.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="home-feature band-navy" data-motion="feature" aria-labelledby="study-title">
        <div className="shell home-feature-grid">
          <Reveal as="figure">
            <Frame image={study.image} sizes="(min-width: 900px) 50vw, 100vw" />
          </Reveal>
          <Reveal delay={100}>
            <p className="kicker">Sample study</p>
            <h2 id="study-title">{study.title}</h2>
            <p>{study.summary}</p>
            <dl className="home-meta">
              <div>
                <dt>Sector</dt>
                <dd>{study.sector}</dd>
              </div>
              <div>
                <dt>Mode</dt>
                <dd>{study.mode}</dd>
              </div>
            </dl>
            <Link className="text-link text-link-light" href={`/projects/${study.slug}`}>
              Read the study
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="band" data-motion="projects" aria-labelledby="more-studies">
        <Reveal className="shell">
          <header className="home-intro home-intro--row">
            <div>
              <p className="kicker">Projects</p>
              <h2 id="more-studies">Other sample movements.</h2>
            </div>
            <Link className="text-link" href="/projects">
              All studies
            </Link>
          </header>
          <RevealStagger className="home-cards">
            {restStudies.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="home-card">
                <Frame image={project.image} sizes="(min-width: 800px) 30vw, 100vw" />
                <div>
                  <span>{project.sector}</span>
                  <strong>{project.title}</strong>
                  <em>{project.mode}</em>
                </div>
              </Link>
            ))}
          </RevealStagger>
        </Reveal>
      </section>

      <section
        className="band band-sand home-insights"
        data-motion="insights"
        aria-labelledby="insights-title"
      >
        <div className="shell home-split home-split--flip">
          <Reveal as="figure" className="home-split-media">
            <Frame image={lead.image} sizes="(min-width: 900px) 40vw, 100vw" />
            <figcaption>{lead.category}</figcaption>
          </Reveal>
          <Reveal className="home-split-copy" delay={90}>
            <p className="kicker">Insights</p>
            <h2 id="insights-title">Notes from the desk.</h2>
            <article className="home-lead-essay">
              <h3>
                <Link href={`/blog/${lead.slug}`}>{lead.title}</Link>
              </h3>
              <p>{lead.excerpt}</p>
            </article>
            <ul className="home-essay-list">
              {notes.map((article) => (
                <li key={article.slug}>
                  <Link href={`/blog/${article.slug}`}>
                    <span>{article.category}</span>
                    <strong>{article.title}</strong>
                  </Link>
                </li>
              ))}
            </ul>
            <Link className="text-link" href="/blog">
              All insights
            </Link>
          </Reveal>
        </div>
      </section>

      <section
        className="band home-questions"
        id="questions"
        data-motion="questions"
        aria-labelledby="questions-title"
      >
        <div className="shell home-split">
          <Reveal as="figure" className="home-split-media">
            <Frame image={images.customs} sizes="(min-width: 900px) 38vw, 100vw" />
            <figcaption>Documentation bay · demonstration photograph</figcaption>
          </Reveal>
          <Reveal className="home-split-copy" delay={90}>
            <p className="kicker">Questions</p>
            <h2 id="questions-title">Before the form is connected.</h2>
            <Accordion items={faqs.slice(0, 4)} />
            <p className="stack-gap-md">
              <Link className="text-link" href="/faq">
                All questions
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <HomeCtaBlock />
    </>
  );
}
