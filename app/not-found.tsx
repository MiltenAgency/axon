import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><a href="/" aria-label="Jace home"><img src="/assets/jace-logo.svg" width="80" height="38" alt="Jace" /></a><span className="eyebrow">404 · A little off course</span><h1>This email got lost.<br />Let’s get you home.</h1><p>The page you’re looking for isn’t here.</p><Link className="button dark" href="/">Back to Jace <span>↗</span></Link></main>;
}
