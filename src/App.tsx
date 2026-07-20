import {
  ArrowRight,
  ArrowUp,
  BrainCircuit,
  CheckCircle2,
  HeartHandshake,
  LineChart,
  LockKeyhole,
  Mail,
  Network,
  Newspaper,
  Play,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
  type LucideIcon,
} from 'lucide-react';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import config from '../config.json';
import { trackNav, trackOutbound } from './scripts/gtag';

const PAGES = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'products', label: 'Products' },
  { id: 'mission', label: 'Mission' },
  { id: 'contact', label: 'Contact' },
];

const icons: Record<string, LucideIcon> = {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  HeartHandshake,
  LineChart,
  LockKeyhole,
  Network,
  Newspaper,
  Play,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
};

function resolveHref(href?: string, hrefKey?: string) {
  if (href) {
    return href;
  }

  if (hrefKey && hrefKey in config.links) {
    return config.links[hrefKey as keyof typeof config.links];
  }

  return '#';
}

function useSectionNav(pages: { id: string; label: string }[]) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const getEls = () =>
      pages
        .map((page) => document.getElementById(page.id))
        .filter((el): el is HTMLElement => Boolean(el));

    let raf = 0;
    const onScroll = () => {
      if (raf) {
        return;
      }
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const list = getEls();
        if (!list.length) {
          return;
        }
        const doc = document.documentElement;
        if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
          setActive(list.length - 1);
          return;
        }
        const mid = window.innerHeight * 0.45;
        let best = 0;
        for (let i = 0; i < list.length; i += 1) {
          const rect = list[i].getBoundingClientRect();
          if (rect.top <= mid) {
            best = i;
          }
        }
        setActive(best);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
    };
  }, [pages]);

  const goTo = (index: number) => {
    const el = document.getElementById(pages[index]?.id);
    if (!el) {
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return { active, goTo };
}

function ScrollIndicator({
  pages,
  active,
  onSelect,
}: {
  pages: { id: string; label: string }[];
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <nav className="scroll-dots" aria-label="Section navigation">
      {pages.map((page, index) => (
        <button
          key={page.id}
          type="button"
          className={`scroll-dot ${index === active ? 'is-active' : ''}`}
          onClick={() => onSelect(index)}
          aria-label={page.label}
          aria-current={index === active ? 'true' : undefined}
        >
          <span className="dot-label">{page.label}</span>
        </button>
      ))}
    </nav>
  );
}

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand-mark" href="#top" aria-label={`${config.brand.name} home`}>
          <span className="brand-icon">
            <img src={config.brand.logo} alt="" />
          </span>
          <span className="wordmark">
            <span className="wordmark-name">{config.brand.wordmark[0]}</span>
            <span className="wordmark-sub">{config.brand.wordmark[1]}</span>
          </span>
        </a>
        <nav className="header-nav" aria-label="Primary navigation">
          {config.nav.map((item) => {
            const href = resolveHref(item.href, item.hrefKey);
            return (
              <a key={item.label} href={href}>
                {item.label}
              </a>
            );
          })}
        </nav>
      <a
        className="header-cta"
        href="#products"
        onClick={() => trackNav('Get Started', '#products')}
      >
        Get Started
        <ArrowRight size={15} />
      </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section-shell page" id="top">
      <div className="hero-copy reveal-on-scroll">
        <p className="eyebrow">{config.hero.eyebrow}</p>
        <h1>
          <span className="brand-line">{config.brand.name}</span>
          {config.hero.headline}
        </h1>
        <p className="hero-lede">{config.hero.lede}</p>
        <div className="cta-row">
          {config.hero.ctas.map((cta) => {
            const href = resolveHref(cta.href, cta.hrefKey);
            const isExternal = Boolean(cta.external);

            return (
              <a
                key={cta.label}
                className={`button ${cta.style}`}
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
                onClick={() =>
                  isExternal
                    ? trackOutbound(cta.label, href)
                    : trackNav(cta.label, href)
                }
              >
                {cta.label === 'Watch Demo' ? <Play size={17} /> : null}
                {cta.label}
                {cta.style === 'primary' ? <ArrowRight size={18} /> : null}
              </a>
            );
          })}
        </div>
      </div>

      <div className="hero-art reveal-on-scroll" aria-hidden="true">
        <div className="network-orb">
          <div className="orb-core">{config.brand.shortName}</div>
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hero-dashboard glass-panel">
          <div className="dashboard-head">
            <span>{config.hero.dashboard.label}</span>
            <strong>{config.hero.dashboard.score}</strong>
          </div>
          <div className="signal-grid">
            {config.hero.dashboard.signals.map((signal) => (
              <div key={signal.label}>
                <small>{signal.label}</small>
                <strong>{signal.value}</strong>
              </div>
            ))}
          </div>
          <div className="sparkline" />
          <div className="ticker-list">
            {config.hero.dashboard.tickers.map((ticker) => (
              <div key={ticker.label} className="ticker-row">
                <span>{ticker.label}</span>
                <b>{ticker.value}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about section-shell page" id="about">
      <div className="section-intro reveal-on-scroll">
        <p className="eyebrow">{config.about.eyebrow}</p>
        <h2>{config.about.title}</h2>
        <p>{config.about.body}</p>
      </div>
      <div className="focus-grid">
        {config.about.focus.map((item, index) => {
          const Icon = icons[item.icon] ?? Sparkles;
          return (
            <article
              className={`focus-card glass-panel reveal-on-scroll delay-${index + 1}`}
              key={item.title}
            >
              <Icon />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function MediaFrame({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  ratio?: 'standard' | 'wide' | 'review';
  className?: string;
}) {
  return (
    <figure className={`shot ${className}`.trim()}>
      <div className="shot__chrome" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="shot__stage">
        <img className="shot__img" src={src} alt={alt} loading="lazy" />
      </div>
    </figure>
  );
}

function BlueprintHighlights() {
  const highlights = config.blueprint.highlights;

  return (
    <div className="highlight-stack" aria-label="Blueprint product highlights">
      <div className="highlight-stack__intro">
        <p className="eyebrow">{highlights.eyebrow}</p>
        <h4>{highlights.title}</h4>
      </div>
      <div className="highlight-stack__grid">
        {highlights.items.map((item, index) => (
          <article
            className="why-card glass-panel"
            style={{ '--delay': `${index * 50}ms` } as CSSProperties}
            key={item.title}
          >
            <h4>{item.title}</h4>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProductBlueprint() {
  return (
    <section className="product-segment blueprint-segment" id="blueprint">
      <div className="segment-shell">
        <div className="segment-badge">
          <HeartHandshake size={16} />
          {config.blueprint.eyebrow}
        </div>
        <div className="product-block">
          <div className="product-copy reveal-on-scroll">
            <h3>{config.blueprint.title}</h3>
            {config.blueprint.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="split-list">
              <div>
                <h4>{config.blueprint.retailers.title}</h4>
                {config.blueprint.retailers.points.map((point) => (
                  <span key={point}>
                    <CheckCircle2 size={16} />
                    {point}
                  </span>
                ))}
              </div>
              <div>
                <h4>{config.blueprint.consumers.title}</h4>
                {config.blueprint.consumers.points.map((point) => (
                  <span key={point}>
                    <CheckCircle2 size={16} />
                    {point}
                  </span>
                ))}
              </div>
            </div>
            <div className="cta-row compact">
              <a
                className="button primary"
                href={config.links.demo}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackOutbound(config.blueprint.demoLabel, config.links.demo)}
              >
                {config.blueprint.demoLabel}
              </a>
              {config.blueprint.social.map((item) => {
                const href = resolveHref(undefined, item.hrefKey);
                const isExternal = Boolean(item.external) || href.startsWith('http');
                return (
                  <a
                    key={item.label}
                    className="button secondary"
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noreferrer' : undefined}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="product-visual reveal-on-scroll">
            <BlueprintHighlights />
          </div>
        </div>
      </div>
    </section>
  );
}

function DecisionPipeline() {
  const stages = config.trading.pipeline.stages;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((value) => (value + 1) % stages.length);
    }, 1400);
    return () => window.clearInterval(id);
  }, [stages.length]);

  return (
    <div className="pipeline-panel reveal-on-scroll" aria-label={config.trading.pipeline.title}>
      <div className="pipeline-head">
        <div>
          <p className="pipeline-kicker">
            <Sparkles size={14} />
            {config.trading.pipeline.title}
          </p>
          <p className="pipeline-sub">{config.trading.pipeline.subtitle}</p>
        </div>
        <div className="pipeline-live" aria-hidden="true">
          <span className="live-ring" />
          <span className="live-dot" />
          LIVE
        </div>
      </div>

      <div className="pipeline-track">
        <div className="pipeline-spine" aria-hidden="true">
          <span
            className="pipeline-pulse"
            style={{ '--step': active, '--steps': stages.length - 1 } as CSSProperties}
          />
        </div>

        {stages.map((stage, index) => {
          const Icon = icons[stage.icon] ?? Sparkles;
          const isActive = index === active;
          const isPast = index < active;
          return (
            <article
              key={stage.id}
              className={`pipeline-stage tone-${stage.tone} ${isActive ? 'is-active' : ''} ${isPast ? 'is-past' : ''}`}
            >
              <span className="stage-node" aria-hidden="true" />
              <div className="stage-icon">
                <Icon size={18} />
              </div>
              <div className="stage-copy">
                <h4>{stage.title}</h4>
                <p>{stage.subtitle}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function ProductTrading() {
  const stackIcons: Record<string, LucideIcon> = {
    technical: LineChart,
    news: Newspaper,
    forecast: Sparkles,
    committee: Users,
    fusion: Network,
    safety: ShieldCheck,
  };

  return (
    <section className="product-segment trading-segment" id="trading">
      <div className="segment-shell">
        <div className="segment-badge">
          <BrainCircuit size={16} />
          {config.trading.eyebrow}
        </div>

        <div className="product-block trading-intro glass-panel">
          <div className="product-copy reveal-on-scroll">
            <h3>{config.trading.title}</h3>
            <p className="trading-lede">{config.trading.lede}</p>
            <p>{config.trading.paperFirst}</p>
            <p>{config.trading.committee}</p>
            <div className="trading-pillars" aria-label="Product principles">
              {config.trading.pillars.map((pillar) => (
                <span key={pillar}>{pillar}</span>
              ))}
            </div>
            <div className="cta-row compact">
              <a
                className="button primary"
                href={config.links.tradingApp}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackOutbound(config.trading.ctaLabel, config.links.tradingApp)
                }
              >
                {config.trading.ctaLabel}
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
          <div className="trading-hero-card reveal-on-scroll">
            <MediaFrame
              src={config.trading.heroImage}
              alt={config.trading.heroImageAlt}
            />
          </div>
        </div>

        <div className="audience-panel reveal-on-scroll">
          <p className="eyebrow">{config.trading.audience.eyebrow}</p>
          <div className="audience-grid">
            <div>
              <h4>{config.trading.audience.idealTitle}</h4>
              {config.trading.audience.ideal.map((item) => (
                <span key={item}>
                  <CheckCircle2 size={16} />
                  {item}
                </span>
              ))}
            </div>
            <div>
              <h4>{config.trading.audience.notTitle}</h4>
              {config.trading.audience.notFor.map((item) => (
                <span key={item}>
                  <CheckCircle2 size={16} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="why-grid">
          {config.trading.why.map((item, index) => (
            <article
              className="why-card glass-panel reveal-on-scroll"
              style={{ '--delay': `${index * 60}ms` } as CSSProperties}
              key={item.title}
            >
              <h4>{item.title}</h4>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>

        <div className="stack-section reveal-on-scroll">
          <div className="section-intro narrow left">
            <p className="eyebrow">{config.trading.stackIntro.eyebrow}</p>
            <h3>{config.trading.stackIntro.title}</h3>
            <p>{config.trading.stackIntro.body}</p>
          </div>
          <DecisionPipeline />
        </div>

        <div className="data-stack">
          {config.trading.dataStack.map((item, index) => {
            const Icon = stackIcons[item.id] ?? Sparkles;
            return (
              <article
                className="data-card glass-panel reveal-on-scroll"
                style={{ '--delay': `${index * 80}ms` } as CSSProperties}
                key={item.name}
              >
                <div className="data-icon">
                  <Icon size={20} />
                </div>
                <p className="data-role">{item.role}</p>
                <h4>{item.name}</h4>
                <p>{item.copy}</p>
              </article>
            );
          })}
        </div>

        <div className="feature-grid">
          {config.trading.features.map((feature, index) => {
            const Icon = icons[feature.icon] ?? Sparkles;
            return (
              <article
                className="feature-card glass-panel reveal-on-scroll"
                style={{ '--delay': `${index * 50}ms` } as CSSProperties}
                key={feature.title}
              >
                <Icon size={22} />
                <h4>{feature.title}</h4>
                <p>{feature.copy}</p>
              </article>
            );
          })}
        </div>

        <div className="gallery-section reveal-on-scroll">
          <div className="section-intro narrow">
            <p className="eyebrow">{config.trading.gallery.eyebrow}</p>
            <h3>{config.trading.gallery.title}</h3>
            <p>{config.trading.gallery.body}</p>
          </div>
          <div className="gallery-grid">
            {config.trading.gallery.items.map((item) => (
              <article className="gallery-card" key={item.title}>
                <MediaFrame
                  src={item.image}
                  alt={`${config.brand.name} ${item.title}`}
                />
                <div className="gallery-card__copy">
                  <h4>{item.title}</h4>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="review-flow reveal-on-scroll">
          <div className="section-intro narrow">
            <p className="eyebrow">{config.trading.reviewFlow.eyebrow}</p>
            <h3>{config.trading.reviewFlow.title}</h3>
            <p>{config.trading.reviewFlow.body}</p>
          </div>
          <div className="review-flow-steps">
            {config.trading.reviewFlow.steps.map((step) => (
              <article className="review-flow-card" key={step.title}>
                <MediaFrame
                  src={step.image}
                  alt={`${config.brand.name} ${step.title}`}
                />
                <div className="review-flow-copy">
                  <p className="review-step-label">{step.label}</p>
                  <h4>{step.title}</h4>
                  <p>{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section className="products page" id="products">
      <div className="section-shell">
        <div className="section-intro reveal-on-scroll">
          <p className="eyebrow">{config.products.eyebrow}</p>
          <h2>{config.products.title}</h2>
          <p>{config.products.body}</p>
          <div className="product-jump">
            <a className="jump" href="#blueprint">
              Blueprint Loyalty
            </a>
            <a className="jump" href="#trading">
              Trading Intelligence
            </a>
          </div>
        </div>
      </div>
      <ProductBlueprint />
      <ProductTrading />
    </section>
  );
}

function Mission() {
  return (
    <section className="mission section-shell page" id="mission">
      <div className="mission-card glass-panel reveal-on-scroll">
        <p className="eyebrow">{config.mission.eyebrow}</p>
        <h2>{config.mission.title}</h2>
        <p>{config.mission.body}</p>
        <strong>{config.mission.statement}</strong>
      </div>
      <div className="mission-orbits" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const ctaHref = resolveHref(undefined, config.footer.ctaHrefKey);

  return (
    <footer className="site-footer page" id="contact">
      <div className="footer-shell">
        <div className="footer-panel">
          <div className="footer-cta-block">
            <p className="eyebrow">{config.footer.eyebrow}</p>
            <h2>{config.footer.title}</h2>
            <a
              className="footer-cta"
              href={ctaHref}
              onClick={() => trackOutbound(config.footer.ctaLabel, ctaHref)}
            >
              <Mail size={18} />
              {config.footer.ctaLabel}
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="footer-columns">
            {config.footer.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3>{column.title}</h3>
                {column.links.map((item) => {
                  const href = resolveHref(item.href, item.hrefKey);
                  const isExternal = Boolean(item.external) || href.startsWith('http');
                  return (
                    <a
                      key={item.label}
                      href={href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noreferrer' : undefined}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <a className="brand-mark" href="#top" aria-label={`${config.brand.name} home`}>
            <span className="brand-icon">
              <img src={config.brand.logo} alt="" />
            </span>
            <span className="wordmark">
              <span className="wordmark-name">{config.brand.wordmark[0]}</span>
              <span className="wordmark-sub">{config.brand.wordmark[1]}</span>
            </span>
          </a>
          <p className="footer-note">{config.footer.note}</p>
          <div className="footer-meta">
            <span>© {year} {config.brand.name}</span>
            <a className="footer-top-link" href="#top">
              Back to top
              <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  useReveal();
  const { active, goTo } = useSectionNav(PAGES);

  return (
    <>
      <div className="page-glow" />
      <div className="page-glow secondary" />
      <Header />
      <ScrollIndicator pages={PAGES} active={active} onSelect={goTo} />
      <main>
        <Hero />
        <About />
        <Products />
        <Mission />
      </main>
      <Footer />
    </>
  );
}

export default App;
