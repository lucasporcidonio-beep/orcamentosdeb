// Basic GA4 and Meta Pixel integration
// Note: You need to replace 'MEASUREMENT_ID' and 'PIXEL_ID' with actual IDs later.

export const initAnalytics = () => {
    // Google Analytics
    const gaId = "G-XXXXXXXXXX"; // Replace with actual measurement ID
    const gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
        window.dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", gaId);

    // Meta Pixel
    const pixelId = "XXXXXXXXXXXXXXX"; // Replace with actual Pixel ID
    const pixelScript = document.createElement("script");
    pixelScript.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;
    document.head.appendChild(pixelScript);
};

export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
    // Log to console for development verification
    console.log(`[Analytics] Track Event: ${eventName}`, params);

    // Send to GA
    if (window.gtag) {
        window.gtag("event", eventName, params);
    }

    // Send to Meta Pixel
    if (window.fbq) {
        window.fbq("trackCustom", eventName, params);
    }
};

// Global type definitions for window
declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
        fbq: (...args: any[]) => void;
        _fbq: any;
    }
}
