export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export const existsGaId = GA_TRACKING_ID !== '';

// PV測定
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (path) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: path,
  });
};

// 発火
// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value = '' }) => {
  if (!existsGaId) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  });
};
