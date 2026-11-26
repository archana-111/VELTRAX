import Link from "next/link";
import { addressLines, site } from "@/data/site";
import { footerNav } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <Link href="/" className="footer-mark">
          VELTRAX
        </Link>
      </div>
      <div className="shell footer-grid">
        <div className="footer-brand">
          <p>
            A demonstration logistics company for this template. Replace the address, the lanes, and the photographs before you publish.
          </p>
          <p className="stack-gap">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <br />
            <a href={site.phoneHref}>{site.phone}</a>
          </p>
          <p className="stack-gap">
            {addressLines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
        <div>
          <h2>Services</h2>
          <ul>
            {footerNav.services.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Company</h2>
          <ul>
            {footerNav.company.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Desk</h2>
          <ul>
            {footerNav.tools.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Homepages</h2>
          <ul>
            {footerNav.homes.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="shell footer-base">
        <span>
          © {new Date().getFullYear()} {site.legalName}. Sample content.
        </span>
        <span>
          {site.hours}. Version {site.version}.
        </span>
      </div>
    </footer>
  );
}
