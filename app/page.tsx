"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import reference from "./reference-data.json";

const assets = "/assets/";
const signupUrl = "https://app.jace.ai/signup";
const demoUrl = "https://cal.com/pawel-jace-ai/jace-personal-demo";

const features = [
  { title: "AI Email Drafts", tagline: "Reply drafts in your voice, ready for your review", problem: "You’re trying to respond to an important email... but it takes forever to check attachments, remember Slack discussions, and review previous conversations.", solution: "Now you get intelligent drafts that include all the context automatically — attachments analyzed, calendar checked, Slack reviewed.", note: "Review the draft, check the details, then send.", image: "ai-email-drafts.webp", color: "pink", icon: "sparkles" },
  { title: "Smart Rules", tagline: "Your personal email assistant.", problem: "You’re managing business emails... but you constantly need to CC people, use templates, or create calendar events.", solution: "Now you can set custom rules that automatically handle CCs, apply templates, and trigger actions based on who you’re emailing.", note: "“Always CC my manager when we finalize contracts.”", image: "smart-rules.webp", color: "yellow", icon: "sliders" },
  { title: "Business Integrations", tagline: "Email in. Task done.", problem: "You receive customer requests and feedback... but you have to manually create tickets, send Slack updates, and notify your team.", solution: "Now actions happen automatically when emails arrive — tickets created, Slack notifications sent, documents saved.", note: "Complete work across all your tools without leaving email.", image: "business-integrations.webp", color: "purple", icon: "grid" },
  { title: "AI Labels", tagline: "See what matters instantly.", problem: "You get 100+ emails daily... but scanning subject lines to find urgent messages wastes valuable time.", solution: "Now AI automatically labels emails by type and priority — “urgent client,” “partnership,” “internal updates.”", note: "Focus on what’s important without reading every subject line.", image: "ai-labels.webp", color: "yellow", icon: "tag" },
  { title: "AI Chief of Staff", tagline: "Ask anything. Get it done.", problem: "You need business information or want to complete tasks... but searching through emails, docs, and tools takes forever.", solution: "Now ask your AI assistant anything about your business and get instant answers plus actions completed.", note: "Chat with Jace to fetch data, create docs, and automate tasks.", image: "ai-chief-of-staff.webp", color: "purple", icon: "chat" },
];
const steps = [
  { title: "Connect your email", text: "Securely link your email inbox to get started.", image: "connect-your-email.webp", label: "Connect your inbox", color: "pink" },
  { title: "Jace onboards itself", text: "Jace uses your email context to prepare drafts in your voice. Check the wording and details before sending.", image: "jace-onboards-itself.webp", label: "Personalize your drafts", color: "yellow" },
  { title: "Review and send", text: "Review the prepared drafts, edit as needed, and send when ready.", image: "review-and-send.webp", label: "You review and send", color: "purple" },
];
const testimonials = [
  { name: "Stacey Helbig", role: "", image: "stacey-helbig.webp", quote: "Jace has been a game-changer for our business operations. The platform is intuitive and has become an essential tool for our daily operations. I highly recommend it to any business leader looking to enhance their productivity." },
  { name: "Josh Graham", role: "Founder at instantvoiceover.ai", image: "josh-graham.webp", quote: "Jace has entirely reshaped the way I approach email. It saves me over an hour a day — and the feature list keeps growing. Additionally, I use Superwhisper to chat with the email agent, so I rarely have to touch my keyboard." },
  { name: "Darius Foroux", role: "Author of ‘Do It Today’", image: "darius-foroux.webp", quote: "I’m impressed by how good the generated replies are. It’s just like myself. And I hardly ever need to edit them. I’m saving hours a week on email." },
  { name: "Carsten Falborg", role: "Head of Product at Available.dk", image: "carsten-falborg.webp", quote: "I love how Jace adapts to my unique tone, allowing for a truly personalized experience. The custom instructions feature is powerful, letting me fine-tune how Jace responds." },
];
const security = [
  { icon: "shield", title: "SOC 2 Type I", text: "SOC 2 Type I (Oct 2025), Type II in progress. We follow CASA Tier 3 controls for handling sensitive data." },
  { icon: "lock", title: "Encryption", text: "Your emails are encrypted in transit and at rest." },
  { icon: "grid", title: "Enterprise-Grade Infrastructure", text: "Built on secure cloud infrastructure." },
  { icon: "eye", title: "Privacy First", text: "We never train AI models on your data. Your information stays yours." },
];

function Icon({ name, className = "" }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: <><path d="M5 19 19 5M5 5h14v14" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    file: <><path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10zM13 3v7h7M8 14h8M8 17h5" /></>,
    tag: <><path d="M3 3h8l10 10-8 8L3 11z" /><circle cx="7.5" cy="7.5" r=".5" /></>,
    sliders: <><path d="M4 7h16M4 17h16" /><circle cx="9" cy="7" r="3" /><circle cx="15" cy="17" r="3" /></>,
    sparkles: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5zM20 2v4M18 4h4" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    chat: <><path d="M21 11a9 9 0 0 1-9 9H3l2-5A9 9 0 1 1 21 11Z" /><path d="M8 10h8M8 14h5" /></>,
    shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z" /><path d="m8 12 3 3 5-6" /></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
  };
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.sparkles}</svg>;
}

function StartButton({ onClick, large = false, light = false, children }: { onClick: () => void; large?: boolean; light?: boolean; children?: React.ReactNode }) {
  return <button onClick={onClick} className={`button ${large ? "hero-cta" : ""} ${light ? "light" : "dark"}`}>
    {children || "Get started for free"}{large && <span className="button-arrow"><Icon name="arrow" /></span>}
  </button>;
}

function SignupDialog({ close }: { close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current;
    el?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, []);
  return <dialog ref={ref} className="signup-dialog" onCancel={close} onClick={e => { if (e.target === e.currentTarget) close(); }} aria-labelledby="signup-heading">
    <button className="icon-button dialog-close" onClick={close} aria-label="Close signup dialog"><Icon name="close" /></button>
    <div className="dialog-art"><img src={`${assets}jace-logo.svg`} alt="Jace" width="64" height="31" /></div>
    <div className="dialog-body"><span className="eyebrow">Your inbox. A little lighter.</span><h2 id="signup-heading">Meet your new<br />email assistant.</h2><p>Connect your email and let Jace take care of the busywork. You always have the final say.</p>
      <a className="provider-button" href={signupUrl}><img src={`${assets}gmail.svg`} alt="" width="24" height="24" /> Continue with Gmail <Icon name="arrow" /></a>
      <a className="provider-button" href={signupUrl}><img src={`${assets}outlook.svg`} alt="" width="24" height="24" /> Continue with Outlook <Icon name="arrow" /></a>
      <span className="dialog-fine">7-day free trial · Cancel anytime</span><p className="legal">Continue on Jace to securely connect your account.<br /><a href="https://jace.ai/terms" target="_blank" rel="noreferrer">Terms of service</a> and <a href="https://jace.ai/privacy" target="_blank" rel="noreferrer">Privacy policy</a></p>
    </div>
  </dialog>;
}

function Tagline() {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("word-visible"); observer.unobserve(entry.target); }
    }), { threshold: 1, rootMargin: "0px 0px -15% 0px" });
    ref.current?.querySelectorAll("span").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <h2 ref={ref} className="tagline">{"Let Jace draft.".split(" ").map((w, i) => <span key={w} style={{ transitionDelay: `${i * 90}ms` }}>{w} </span>)}<br />{"You review and send.".split(" ").map((w, i) => <span key={w} style={{ transitionDelay: `${270 + i * 90}ms` }}>{w} </span>)}</h2>;
}

function Mosaic() {
  return <div className="mosaic" aria-hidden="true">{["2fr 1fr 3fr 1fr 2fr", "1fr 2fr 1fr 3fr 1fr", "3fr 1fr 2fr 2fr 1fr", "1fr 3fr 1fr 2fr 2fr", "2fr 1fr 2fr 3fr 1fr", "1fr 3fr 2fr 2fr 1fr", "3fr 1fr 2fr 1fr 2fr", "2fr 3fr 1fr 2fr 1fr"].map((columns, i) => <div key={i} style={{ gridTemplateColumns: columns }}>{Array.from({ length: 5 }, (_, j) => <span key={j} />)}</div>)}</div>;
}

export default function Home() {
  const [signup, setSignup] = useState(false);
  const [yearly, setYearly] = useState(true);
  const [testimonial, setTestimonial] = useState(0);
  const [activeDemo, setActiveDemo] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showDemo, setShowDemo] = useState(false);
  const start = () => setSignup(true);
  const quote = testimonials[testimonial];

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function selectDemo(index: number) {
    setActiveDemo(index);
    setShowDemo(true);
    setTimeout(() => document.getElementById("video")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" }), 0);
  }

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="hero-background">
      <header className="site-header"><nav aria-label="Main navigation" className="nav-pill"><a href="/" aria-label="Jace home" aria-current="page"><img className="logo" src={`${assets}jace-logo.svg`} width="60" height="29" alt="Jace" /></a><div className="nav-actions"><a className="button nav-login" href="https://app.jace.ai/signin">Log in</a><button className="button dark nav-start" onClick={start}>Get started</button></div></nav></header>
      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <h1 id="hero-title">Your AI email assistant</h1>
          <p className="hero-description">Jace is an AI email agent for Gmail and Outlook. It drafts replies in your voice for you to review, sorts new mail with AI labels and runs Flows with tools like Slack, Notion and HubSpot.</p>
          <div className="hero-action"><StartButton onClick={start} large /><div className="works-with"><span>Works with</span><button onClick={start}><img src={`${assets}gmail.svg`} alt="" width="20" height="20" />Gmail</button><button onClick={start}><img src={`${assets}outlook.svg`} alt="" width="20" height="20" />Outlook</button></div></div>
          <div className="prompt-chips" aria-label="Explore Jace’s features">{[{ label: "Draft e-mails", icon: "search", demo: 0 }, { label: "Find an important file", icon: "file", demo: 4 }, { label: "Organize inbox", icon: "file", demo: 3 }, { label: "Sort by priority", icon: "tag", demo: 3 }].map((item, i) => <button key={item.label} onClick={() => selectDemo(item.demo)}><Icon name={item.icon} className={`chip-icon chip-${i}`} />{item.label}</button>)}</div>
          <div className="hero-preview"><Mosaic /><div className="hero-screenshot"><Image src={`${assets}hero-inbox.webp`} alt="Jace inbox with AI labels, email drafts, and an assistant chat alongside your messages" width={1440} height={900} priority sizes="(max-width: 1100px) 94vw, 1052px" /></div></div>
        </section>

        <div className="page-content">
          <section className="companies container"><p>We help professionals save their time</p><div className="company-logos">{["Compass", "ElevenLabs", "HubSpot", "Virgin"].map((name, i) => <img key={name} src={`${assets}company-${i}.svg`} alt={name} height="28" width={i === 3 ? 46 : 140} loading="lazy" />)}</div></section>

          <section className="how-section section-space container reveal" id="how-it-works"><div className="section-intro"><Tagline /><div className="intro-bottom"><p>Watch how Jace transforms a chaotic inbox into an organized, productive workspace.</p><StartButton onClick={start} /></div></div><div className="steps-grid">{steps.map((step, i) => <article className="step" key={step.title}><span className="step-number">0{i + 1}</span><h3>{step.title}</h3><p>{step.text}</p><div className="step-art"><Image src={assets + step.image} alt={step.label} width={832} height={572} sizes="(max-width: 700px) 92vw, 33vw" /><span className={`badge ${step.color}`}>{step.label}</span></div></article>)}</div></section>

          <section className="container" id="features"><div className="features-panel"><h2 className="features-heading reveal">Write less, achieve more</h2>{features.map((feature, i) => <article className={`feature-row ${i % 2 ? "reverse" : ""} reveal`} key={feature.title}><div className="feature-copy"><span className={`feature-icon ${feature.color}`}><Icon name={feature.icon} /></span><h3>{feature.title}</h3><p className="feature-tagline">{feature.tagline}</p><p>{feature.problem}</p><p>{feature.solution}</p><p className="feature-note">{feature.note}</p><StartButton onClick={start} /></div><div className={`feature-art ${feature.color}`}><Image src={assets + feature.image} alt={feature.title + " in Jace"} width={1232} height={1280} sizes="(max-width: 700px) 92vw, 45vw" /></div></article>)}</div></section>

          <section className="section-space container-small reveal" id="video"><div className="section-intro"><h2>See Jace in action</h2><div className="intro-bottom"><p>Watch how Jace handles an email in the example below.</p><a className="button dark" href={demoUrl} target="_blank" rel="noreferrer">Book a personal demo <Icon name="arrow" /></a></div></div><div className="demo-frame"><div className="demo-toolbar"><span className="demo-status"><span /> Explore Jace</span><span className="demo-label">Interactive product preview</span></div>{showDemo ? <><div className="demo-tabs" role="tablist" aria-label="Product preview">{features.map((f, i) => <button key={f.title} role="tab" id={`demo-tab-${i}`} aria-selected={activeDemo === i} aria-controls="demo-panel" onClick={() => setActiveDemo(i)}>{f.title}</button>)}</div><div className="demo-active" role="tabpanel" id="demo-panel" aria-labelledby={`demo-tab-${activeDemo}`}><Image src={assets + features[activeDemo].image} alt={features[activeDemo].title + " product preview"} width={1232} height={1280} sizes="90vw" /><div><h3>{features[activeDemo].tagline}</h3><p>{features[activeDemo].solution}</p><StartButton onClick={start} /></div></div></> : <button className="demo-cover" onClick={() => setShowDemo(true)} aria-label="Explore the Jace product demo"><Image src={`${assets}hero-inbox.webp`} alt="Preview of the Jace email assistant" width={1440} height={900} sizes="90vw" /><span className="play-button"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m9 5 11 7-11 7z" /></svg></span><span className="demo-caption">A calmer inbox starts here. <span>Explore the demo ↗</span></span></button>}</div></section>

          <section className="testimonials container-small reveal" aria-label="What people say about Jace"><div className="quote-photo"><Image key={quote.image} src={assets + quote.image} alt={quote.name} width={240} height={260} sizes="180px" /><span className="quote-mark" aria-hidden="true">“</span></div><div className="quote-content" aria-live="polite"><blockquote key={quote.name}>{quote.quote}</blockquote><div className="quote-bottom"><div><p className="quote-name">{quote.name}</p>{quote.role && <p className="quote-role">{quote.role}</p>}</div><div className="carousel-controls"><button className="icon-button" aria-label="Previous testimonial" onClick={() => setTestimonial((testimonial + 3) % 4)}>←</button><button className="icon-button" aria-label="Next testimonial" onClick={() => setTestimonial((testimonial + 1) % 4)}>→</button></div></div><div className="carousel-dots">{testimonials.map((t, i) => <button key={t.name} className={i === testimonial ? "active" : ""} aria-label={`Read testimonial from ${t.name}`} aria-pressed={i === testimonial} onClick={() => setTestimonial(i)} />)}</div></div></section>

          <section className="container pricing-section" id="pricing"><div className="pricing-panel"><h2 className="reveal">Start free, then scale<br />with monthly credits</h2><div className="billing-switch" role="group" aria-label="Billing period"><button aria-pressed={yearly} className={yearly ? "selected" : ""} onClick={() => setYearly(true)}>Bill yearly <span>Save $60</span></button><button aria-pressed={!yearly} className={!yearly ? "selected" : ""} onClick={() => setYearly(false)}>Bill monthly</button></div><div className="pricing-grid"><article className="plan-card pro"><span className="popular-badge"><Icon name="sparkles" /> Most popular</span><div className="plan-heading"><span className="plan-symbol purple"><Icon name="sparkles" /></span><h3>Pro Plan</h3></div><div className="price" aria-live="polite">{yearly && <del>$50</del>} ${yearly ? 40 : 50}<span>/month</span></div><p className="credit-description">20,000 credits monthly{yearly ? ", billed yearly" : ", billed monthly"}</p><p className="plan-description">For teams and power users</p><ul>{["20,000 credits monthly included", "Higher credit tiers available", "Connect up to 8 inboxes", "Unlimited calendars", "Chat with 3 years of email history", "Custom integrations and MCPs"].map(t => <li key={t}><Icon name="check" />{t}</li>)}</ul><StartButton onClick={start}>Try Pro — full power unlocked</StartButton><p className="trial-note">Your 7-day free trial included · cancel anytime</p></article><article className="plan-card"><div className="plan-heading"><span className="plan-symbol yellow"><Icon name="sparkles" /></span><h3>Plus Plan</h3></div><div className="price" aria-live="polite">{yearly && <del>$25</del>} ${yearly ? 20 : 25}<span>/month</span></div><p className="credit-description">10,000 credits monthly{yearly ? ", billed yearly" : ", billed monthly"}</p><p className="plan-description">Perfect for busy professionals</p><ul>{["10,000 credits monthly included", "Connect up to 2 inboxes", "Unlimited calendars", "Chat with 1 year of email history", "Drafts ready when you open your inbox", "Auto-label and organize every email"].map(t => <li key={t}><Icon name="check" />{t}</li>)}</ul><StartButton onClick={start}>Start your free trial</StartButton><p className="trial-note">Your 7-day free trial included · cancel anytime</p></article><article className="plan-card enterprise"><div className="plan-heading"><span className="plan-symbol pink"><Icon name="grid" /></span><h3>Enterprise Plan</h3></div><div className="enterprise-price">Get in touch</div><p className="credit-description">Most powerful model for your business</p><p className="plan-description">Advanced features for bigger teams</p><ul>{["White-glove setup", "Usage-based pricing", "Dedicated Account Manager"].map(t => <li key={t}><Icon name="check" />{t}</li>)}</ul><a className="button outline" href="https://jace.ai/contact/sales" target="_blank" rel="noreferrer">Get in touch <Icon name="arrow" /></a></article></div></div></section>

          <section className="comparison section-space container-small reveal"><h2>Replace 4 tools with one<br />intelligent assistant</h2><p>Stop paying for multiple subscriptions. Jace consolidates your email workflow into one powerful platform.</p><div className="comparison-grid"><div className="comparison-card"><span className="comparison-label">Without Jace</span><Image src={`${assets}without-jace.webp`} alt="Separate email writing, scheduling, search, and productivity tools" width={431} height={626} sizes="(max-width: 700px) 90vw, 40vw" /><div><span>In total</span><strong>$93<span>/month</span></strong></div></div><span className="versus">vs</span><div className="comparison-card with-jace"><span className="comparison-label">With Jace</span><Image src={`${assets}with-jace.webp`} alt="One Jace subscription brings your email tools together" width={455} height={673} sizes="(max-width: 700px) 90vw, 40vw" /><div><span>In total</span><strong>$25<span>/month</span></strong></div></div></div></section>

          <section className="container" id="security"><div className="security-panel reveal"><div className="security-heading"><span className="security-seal"><Icon name="shield" /></span><h2>Bank-level security for<br />your peace of mind</h2></div><div className="security-grid">{security.map(s => <article key={s.title}><Icon name={s.icon} /><h3>{s.title}</h3><p>{s.text}</p></article>)}</div><div className="security-bottom"><span className="security-lock"><Icon name="lock" /></span><h3>Secure. Private. Encrypted.</h3><p>With CASA Tier 3 compliance and industry-leading encryption, your emails stay private, secure, and protected, always.</p></div></div></section>

          <section className="details-section section-space container reveal"><div><span className="eyebrow">Less busywork. More you.</span><h2>How Jace works as<br />your AI email assistant</h2><p>Connect a Gmail, Google Workspace, Outlook.com or Microsoft 365 account. Jace syncs your mail in real time and works in your browser. Your drafts and labels also show up in Gmail or Outlook, including on your phone.</p></div><div className="details-grid">{[{ title: "Auto-drafts for emails that need a reply", text: "Jace reads earlier messages and attachments, writes in your style and saves the reply to your normal drafts folder. You review, edit and send.", icon: "sparkles" }, { title: "AI labels that sort new mail", text: "Built-in labels like Needs reply, Waiting, FYI and To Do are applied as mail arrives. Add your own label with a plain-language description.", icon: "tag" }, { title: "Flows for emails you get again and again", text: "Describe which emails to watch for and what should happen next: draft a reply, create a calendar event, search the web or use a connected tool.", icon: "sliders" }, { title: "Several inboxes in one place", text: "Gmail and Outlook accounts side by side: up to 2 inboxes on Plus and 8 on Pro. Each account keeps its own labels and settings.", icon: "grid" }].map(d => <article key={d.title}><Icon name={d.icon} /><h3>{d.title}</h3><p>{d.text}</p></article>)}</div></section>

          <section className="faq-section container section-space reveal" id="faq"><div className="faq-intro"><h2>Questions about Jace,<br />the AI email assistant</h2><p>Still have a question in mind?<br /><a href="mailto:support@jace.ai">Contact us <Icon name="arrow" /></a></p></div><div className="faq-list">{reference.faqs.map((faq, i) => <article className={`faq-item ${openFaq === i ? "open" : ""}`} key={faq.question}><h3><button id={`faq-button-${i}`} aria-expanded={openFaq === i} aria-controls={`faq-answer-${i}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>{faq.question}<Icon name="plus" /></button></h3><div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-button-${i}`} hidden={openFaq !== i}><p>{faq.answer}</p></div></article>)}</div></section>
        </div>
      </main>
    </div>

    <footer className="site-footer"><div className="container"><div className="footer-cta reveal"><h2>Ready to reclaim your time?</h2><p>Join Jace and make room for what matters.</p><StartButton onClick={start} large light /><div className="footer-trust"><Icon name="shield" /> Secure. Private. Always in your control.</div></div><div className="footer-main"><a href="/" aria-label="Jace home"><img src={`${assets}jace-logo.svg`} width="80" height="38" alt="Jace" /></a><div className="footer-links"><a href="#pricing">Pricing</a><a href="#features">Features</a><a href="#faq">FAQ</a><a href="https://jace.ai/about">Company</a><a href="https://partners.dub.co/jace">Affiliate</a><a href="https://jace.ai/docs">Learn</a><a href="https://jace.ai/changelog">Changelog</a><a href="https://jace.ai/blog">Blog</a><a href="https://jace.ai/brand">Brand</a></div><div className="social-links"><a href="https://x.com/jace_ai" aria-label="Jace on X" target="_blank" rel="noreferrer">𝕏</a><a href="https://www.linkedin.com/company/jaceai/" aria-label="Jace on LinkedIn" target="_blank" rel="noreferrer">in</a><a href="https://www.instagram.com/usejace/" aria-label="Jace on Instagram" target="_blank" rel="noreferrer">◎</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Zeta AI, Inc.</span><div><a href="https://jace.ai/terms">Terms of service</a><a href="https://jace.ai/privacy">Privacy policy</a><a href="https://jace.ai/impressum">Impressum</a><a href="#security">Security</a></div></div></div></footer>
    {signup && <SignupDialog close={() => setSignup(false)} />}
  </>;
}
