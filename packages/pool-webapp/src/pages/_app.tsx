import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import WithTheme from '@/lib/with-theme';
import GlobalStyles from '@/components/global-styles';
import TrackPageView from '@/lib/track-pageview';

import envConfig from '../config';
import registerServiceWorker from '@/utils/service-worker-registrar';
import useTranslation from '@pool/app/src/hooks/use-translation';

function renderEmptyAnalyticsSnippet() {
  return `rudderanalytics=window.rudderanalytics=[];for(var methods=["load","page","track","identify","alias","group","ready","reset","getAnonymousId","setAnonymousId"],i=0;i<methods.length;i++){var method=methods[i];rudderanalytics[method]=function(d){return function(){rudderanalytics.push([d,...arguments])}}(method)}rudderanalytics.load("${envConfig.rudderstack_write_key}","${envConfig.rudderstack_data_plane_url}",{sendAdblockPage:!0,sendAdblockPageOptions:{integrations:{All:!1,Amplitude:!0}},logLevel:"ERROR"});`;
}

function renderSmartDeferAnalyticsSnippet() {
  return `!function(){var e=function(e){var t=document.createElement("div");t.innerHTML=e;var n=t.getElementsByTagName("script");for(var o=0;o<n.length;o++)eval(n[o].text)},t=function(e){fetch(e,{credentials:"include",keepalive:!0,mode:"no-cors"})};var n=!1;var o=function(){n=!0,function(){var e=window.rudderanalytics=window.rudderanalytics||[];if(e.initialized)window.console&&console.warn&&console.warn("Analytics snippet included twice.");else{var n,t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="${envConfig.rudderstack_script_url}",(n=document.getElementsByTagName("script")[0]).parentNode.insertBefore(t,n),e.page()}}()};!function(e,n,t,o,i,c){function r(e,n){c?o(e,n||32):i.push(e,n)}function d(e,t,o,i){return t&&n.getElementById(t)||(i=n.createElement(e||"SCRIPT"),t&&(i.id=t),o&&(i.onload=o),n.head.appendChild(i)),i||{}}c=/p/.test(n.readyState),e.addEventListener("on"+t in e?t:"load",function(){for(c=1;i[0];)r(i.shift(),i.shift())}),r._=d,e.defer=r,e.deferscript=function(e,n,t,o){r(function(){d("",n,o).src=e},t)}}(this,document,"pageshow",setTimeout,[]),defer(o,2500),window.addEventListener("onpagehide" in self ? "pagehide" : "unload",function(){n||o()})}();`;
}

interface GAWindow extends Window {
  gtag: any;
}

export function reportWebVitals({
  id,
  name,
  label,
  value
}: {
  id: string;
  name: string;
  label: string;
  value: number;
}) {
  if (!(window as GAWindow & typeof globalThis).gtag) {
    return;
  }

  (window as GAWindow & typeof globalThis).gtag('event', name, {
    eventCategory:
      label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    // Google Analytics metrics must be integers, so the value is rounded.
    // For CLS the value is first multiplied by 1000 for greater precision
    // (note: increase the multiplier for greater precision if needed).
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    // The `id` value will be unique to the current page load. When sending
    // multiple values from the same page (e.g. for CLS), Google Analytics can
    // compute a total by grouping on this ID (note: requires `eventLabel` to
    // be a dimension in your report).
    event_label: id,
    // Use a non-interaction event to avoid affecting bounce rate.
    non_interaction: true
  });
}

function Pool({ Component, pageProps }: AppProps) {
  const { t } = useTranslation();

  useEffect(() => {
    // Register service worker
    if (envConfig.stage === 'prod') {
      registerServiceWorker();
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
          name="viewport"
        />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        <title>{t('app.title')}</title>
        <meta key="title" name="title" content={t('app.title').toString()} />
        <meta
          key="description"
          name="description"
          content={t('app.description').toString()}
        />
        <meta
          key="twitter:card"
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          key="twitter:title"
          name="twitter:title"
          content={t('app.title').toString()}
        />
        <meta
          key="twitter:description"
          name="twitter:description"
          content={t('app.description').toString()}
        />
        <meta
          key="og:title"
          property="og:title"
          content={t('app.title').toString()}
        />
        <meta
          key="og:description"
          property="og:description"
          content={t('app.description').toString()}
        />
        <meta
          key="og:image"
          property="og:image"
          content={t('app.image').toString()}
        />
        <meta
          key="og:site_name"
          property="og:site_name"
          content="Pool Messenger"
        />
        <meta key="og:type" property="og:type" content="website" />

        {/* Analytics */}
        <script
          dangerouslySetInnerHTML={{ __html: renderEmptyAnalyticsSnippet() }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: renderSmartDeferAnalyticsSnippet()
          }}
        />

        <link rel="apple-touch-icon" href="/icon-ios.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Pool" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="apple-mobile-web-app-status-bar-style" content="white" />
      </Head>
      <WithTheme>
        <>
          <GlobalStyles />
          <TrackPageView />
          <SafeAreaProvider
            initialMetrics={{
              frame: { x: 0, y: 0, width: 0, height: 0 },
              insets: { top: 0, left: 0, right: 0, bottom: 0 }
            }}
          >
            <Component {...pageProps} />
          </SafeAreaProvider>
        </>
      </WithTheme>
    </>
  );
}

export default Pool;
