const GA_MEASUREMENT_ID = 'G-V221KK2B6V';

declare global {
  interface Window {
    dataLayer: IArguments[];
    gtag: (...args: unknown[]) => void;
  }
}

/** Ensure the official gtag stub exists (HTML snippet should already define it). */
function ensureGtag() {
  if (typeof window === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag !== 'function') {
    // Must push `arguments`, not a rest-array — GA expects the Arguments object.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
}

/**
 * Confirms the measurement ID and sends a page_view.
 * Safe to call after the HTML head snippet has already configured gtag.
 */
export function initAnalytics() {
  if (typeof window === 'undefined') {
    return;
  }

  ensureGtag();

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`,
  );

  if (!existing) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
  });
}

export function trackEvent(eventName: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  ensureGtag();
  window.gtag('event', eventName, params);
}

export function trackOutbound(label: string, url: string) {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: label,
    link_url: url,
    transport_type: 'beacon',
  });
}

export function trackNav(label: string, href: string) {
  trackEvent('click', {
    event_category: 'navigation',
    event_label: label,
    link_url: href,
  });
}

export { GA_MEASUREMENT_ID };
